/* Concept 4: scroll drives each word through enter → strike → "Prepared." → exit; the end card lands last. */
(function () {
  var sec = document.getElementById('kt'); if (!sec) return;
  var words = [].slice.call(sec.querySelectorAll('.kt-word')), open = sec.querySelector('.kt-open'), end = sec.querySelector('.kt-end');
  var count = sec.querySelector('.kt-count'), countB = count.querySelector('b'), n = words.length;
  var clamp = function (v) { return Math.max(0, Math.min(1, v)); };
  var ease = function (t) { t = clamp(t); return t * t * (3 - 2 * t); };

  // The scroll is split into: an opening beat, one beat per word, and the end card.
  var OPEN = 0.07, END = 0.12, BEAT = (1 - OPEN - END) / n;

  function frame() {
    var r = sec.getBoundingClientRect(), vh = innerHeight;
    var p = clamp(-r.top / (r.height - vh));
    open.classList.toggle('off', p > OPEN * 0.6);
    var active = -1;
    words.forEach(function (w, i) {
      var s = (p - OPEN - i * BEAT) / BEAT;            // 0 → 1 across this word's beat
      var st = w.style;
      st.setProperty('--e', ease(s / 0.18).toFixed(3));
      st.setProperty('--s', ease((s - 0.22) / 0.22).toFixed(3));
      st.setProperty('--f', ease((s - 0.46) / 0.2).toFixed(3));
      st.setProperty('--x', ease((s - 0.8) / 0.2).toFixed(3));
      if (s > 0 && s < 1) active = i;
    });
    var atEnd = p > 1 - END;
    end.classList.toggle('on', atEnd);
    count.style.opacity = active >= 0 && !atEnd ? 1 : 0;
    if (active >= 0) countB.textContent = (active < 9 ? '0' : '') + (active + 1);
  }
  var ticking = false;
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; frame(); }); } }, { passive: true });
  addEventListener('resize', frame);
  frame();

  // Dark menu bar over the dark stage.
  var body = document.body, dark = null;
  function checkDark() {
    var on = sec.getBoundingClientRect().bottom > 56;
    if (on === dark) return; dark = on; body.classList.toggle('hw-darknav', on);
    var logo = document.querySelector('#site-nav .logo-img');
    if (logo) logo.src = on ? 'assets/84374dbcdaa8.svg' : 'assets/71cabd5c4963.png'; else dark = null;
  }
  addEventListener('scroll', checkDark, { passive: true });
  setTimeout(checkDark, 0); setTimeout(checkDark, 400);
})();
