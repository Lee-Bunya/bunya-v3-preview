/* Advice Engine overview (advice-engine.html), Dana 19 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-ae.css
   (+ the app frame and pills from css/dana-rp.css). The opening SOA generator film, rebuilt crisp and in Bunya colours:
   the five SOA sections are drafted one by one for the Shah family, the page count climbs, and it's ready for Alex to check. */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vid = shot.querySelector('video');
  if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('ae-hidden'); }
  var SECS = [['Scope of advice', 'Retirement, super, SMSF and insurance', 4], ['Your situation', 'From the checked fact find', 11],
    ['Our recommendations', '5 recommendations', 22], ['Why we recommend them', 'Each linked to its reasons', 29], ['Fees and risks', 'Disclosed in full', 34]];
  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  var scene = document.createElement('div');
  scene.className = 'ae-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: the SOA generator drafting a Statement of Advice for the Shah family in the firm’s template. Five sections are drafted one by one, the document grows to 34 pages, and it is ready for the adviser to check.');
  scene.innerHTML =
    '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 3 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><span class="rf-crumb">Advice Engine · Shah Family</span><h4>SOA generator</h4><span class="rf-sub">Drafting in your template</span>' +
    '<div class="ae-grid"><div class="rf-card ae-list"><div class="rf-ch"><b>Statement of Advice</b><small>Draft 1</small></div>' +
      SECS.map(function (x, k) { return '<div class="rf-row ae-sec" data-k="' + k + '"><span class="ae-tick"></span><span class="rf-nm"><b>' + x[0] + '</b><small>' + x[1] + '</small></span></div>'; }).join('') +
      '<div class="ae-status"><span><small>Status</small><b data-status>Drafting</b></span><span class="rf-me">AR</span></div></div>' +
    '<div class="ae-doc"><span class="ae-count"><b data-pages>0</b> pages</span>' +
      '<div class="ae-stack"><i></i><i></i><div class="ae-page"><div class="ae-ph"><u></u>Your practice<em>Draft 1</em></div>' +
        '<div class="ae-pt"><small>Statement of Advice</small><b>Retirement, super<br>and insurance</b><span>Prepared for Priya and Arjun Shah<br>by Alex Reid</span></div>' +
        '<div class="ae-toc">' + SECS.map(function (x, k) { return '<span data-t="' + k + '"><em>' + (k + 1) + '</em>' + x[0] + '<i></i><strong>' + (k ? SECS[k - 1][2] + 1 : 2) + '</strong></span>'; }).join('') + '</div>' +
        '<div class="ae-pf">yourpractice.com.au · Statement of Advice · Priya and Arjun Shah</div></div></div></div></div></div></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Advice Engine · SOA generator';
  var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';

  var pages = scene.querySelector('[data-pages]'), status = scene.querySelector('[data-status]');
  var st = -1, tm = null, cnt = null, playing = !reduce, vis = false;
  function countTo(n) {
    clearInterval(cnt);
    var from = +pages.textContent;
    if (reduce || from >= n) { pages.textContent = n; return; }
    cnt = setInterval(function () { from++; pages.textContent = from; if (from >= n) clearInterval(cnt); }, 45);
  }
  /* s 0 = nothing yet; 1..5 = that many sections drafted; 6 = ready to check */
  function paint(s) {
    st = s; scene.dataset.s = s;
    [].forEach.call(scene.querySelectorAll('.ae-sec'), function (r) { var k = +r.dataset.k; r.classList.toggle('done', k < s); r.classList.toggle('now', k === s && s < 5); });
    [].forEach.call(scene.querySelectorAll('[data-t]'), function (t) { t.classList.toggle('in', +t.dataset.t < s); });
    if (s === 0) { clearInterval(cnt); pages.textContent = '0'; } else countTo(SECS[Math.min(s, 5) - 1][2]);
    status.textContent = s >= 6 ? 'Ready for Alex to check' : 'Drafting';
  }
  function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 6 ? 0 : st + 1); tm = setTimeout(tick, st === 6 ? 4200 : st === 0 ? 900 : 1500); }
  var pb = scene.querySelector('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else clearTimeout(tm); });
  if (reduce) { paint(6); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 900); else clearTimeout(tm); }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();

/* Revenue Import feature card: follow the film. Full view while the Xplan export flies in, zoom in on the screen
   as it lands and the revenue rows fill, then ease back out for the "matched" notification (Dana, 19 Nov 2026). */
(function () {
  'use strict';
  var v = document.querySelector('.pp-feat#rev .pp-film video');
  if (!v || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  /* [from second, scale, origin x %, origin y %] */
  var SHOTS = [[0, 1, 50, 50], [2.6, 1.72, 86, 60], [12.4, 1, 50, 50]];   /* the screen sits at x 37–92%, y 26–84% of the film */
  var last = -1, raf = 0;
  v.style.setProperty('transition', 'transform 1.1s cubic-bezier(.45,0,.2,1), transform-origin 1.1s cubic-bezier(.45,0,.2,1)', 'important');
  function set(i) {
    var s = SHOTS[i];
    v.style.setProperty('transform-origin', s[2] + '% ' + s[3] + '%', 'important');
    v.style.setProperty('transform', 'scale(' + s[1] + ')', 'important');
  }
  function frame() {
    var t = v.currentTime, i = 0;
    for (var k = 0; k < SHOTS.length; k++) if (t >= SHOTS[k][0]) i = k;
    if (i !== last) { last = i; set(i); }
    raf = requestAnimationFrame(frame);
  }
  set(0);
  v.addEventListener('play', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); });
  v.addEventListener('pause', function () { cancelAnimationFrame(raf); });
})();
