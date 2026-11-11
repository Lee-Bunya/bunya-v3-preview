/* The Bunya style (18 Oct 2026): the small behaviours shared by home-bunya-style.html and bunya-style.html.
   - .bs-ask types a few requests into the prompt box, one after another, and lights the matching chip.
   - .bs-float cards settle in (after their data-delay, in ms) once their panel is on screen.
   - .bs-sig plays the signature once it is seen: draft → ready → checked → approved (the gold diamond lands).
     A [data-replay] button plays it again.
   - .bs-dark video plays only while it is on screen. With reduced motion, everything shows in its end state. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function seen(el, fn, t) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); fn(); } }); }, { threshold: t || 0.3 });
    io.observe(el);
  }

  // Floating cards
  [].forEach.call(document.querySelectorAll('[data-floats]'), function (stage) {
    var fl = stage.querySelectorAll('.bs-float');
    seen(stage, function () {
      [].forEach.call(fl, function (f) { setTimeout(function () { f.classList.add('in'); }, reduce ? 0 : +(f.dataset.delay || 0)); });
    }, 0.2);
  });

  // The signature
  function play(sig) {
    (sig._t || []).forEach(clearTimeout);
    if (reduce) { sig.dataset.state = 'approved'; return; }
    sig.dataset.state = 'idle';
    void sig.offsetWidth;
    var steps = [['draft', 60], ['ready', 1500], ['checked', 2500], ['approved', 3500]];
    sig._t = steps.map(function (s) { return setTimeout(function () { sig.dataset.state = s[0]; }, s[1]); });
  }
  [].forEach.call(document.querySelectorAll('.bs-sig'), function (sig) { seen(sig, function () { play(sig); }, 0.5); });
  [].forEach.call(document.querySelectorAll('[data-replay]'), function (b) {
    b.addEventListener('click', function () { var s = document.getElementById(b.dataset.replay); if (s) play(s); });
  });

  // The prompt box
  [].forEach.call(document.querySelectorAll('.bs-ask'), function (ask) {
    var out = ask.querySelector('.bs-ask-text'), chips = ask.querySelectorAll('.bs-ask-chips span');
    var prompts = JSON.parse(ask.dataset.prompts || '[]'), i = 0;
    if (!prompts.length) return;
    function light(k) { [].forEach.call(chips, function (c, j) { c.classList.toggle('on', j === k); }); }
    function show(txt) { out.innerHTML = ''; out.appendChild(document.createTextNode(txt)); var c = document.createElement('span'); c.className = 'caret'; out.appendChild(c); }
    if (reduce) { show(prompts[0].text); light(prompts[0].chip); return; }
    function type() {
      var p = prompts[i % prompts.length], n = 0;
      light(p.chip);
      (function step() {
        show(p.text.slice(0, n));
        if (n++ < p.text.length) { setTimeout(step, 26 + Math.random() * 34); return; }
        setTimeout(function () {
          (function back() {
            n -= 2; show(p.text.slice(0, Math.max(0, n)));
            if (n > 0) { setTimeout(back, 12); return; }
            i++; setTimeout(type, 380);
          })();
        }, 2600);
      })();
    }
    setTimeout(type, 700);
  });

  // The dark stage film
  [].forEach.call(document.querySelectorAll('.bs-dark video'), function (v) {
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); return; }
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); }); }).observe(v);
  });
})();
