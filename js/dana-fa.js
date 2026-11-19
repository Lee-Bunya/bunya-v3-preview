/* File Audit (file-audit.html), Dana 20 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-fa.css
   (+ the app frame, rows, pills and toast from css/dana-rp.css). The film's story, large and in Bunya colours, so the
   screen fills its card: the Shah family's SOA is checked against the licensee's standards, one check finds the date
   missing on page 31, it's fixed on the page, and the file is ready for Alex. The SOA page is in the Aynub template,
   like the SOA generator page. */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vid = shot.querySelector('video');
  if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('fa-hidden'); }
  function svg(p) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; }
  var SHIELD = '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/><path d="M9 12l2 2 4-4"/>';
  var DOC = '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>';
  /* [check, detail once passed, running total of the 24 checks] */
  var CHECKS = [
    ['Best interests duty steps', 'All six recorded', 4],
    ['Fact find complete and checked', 'Signed off by Alex', 9],
    ['Fees disclosed and consented', 'Fee consent on file', 13],
    ['Product replacement compared', 'Platform A against current', 17],
    ['Every figure matches the fact find', '$1.505m, $186,000 and 31 more', 23],
    ['Authority to proceed', 'Date added on page 31', 24]
  ];
  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', DOC,
    '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  var SIG1 = '<svg viewBox="0 0 120 34" aria-hidden="true"><path d="M4 24c6-14 10-16 12-6s5 10 9-2 7-10 8 0 4 9 10-2c3-6 6-6 7 1s5 7 11-3 9-6 12 1 7 5 13-1 10-5 16 1"/></svg>';
  var SIG2 = '<svg viewBox="0 0 120 34" aria-hidden="true"><path d="M5 22c4-10 9-14 12-8s2 12 8 4 8-14 12-6 3 10 9 2 7-9 10-2 4 8 10 0 8-8 12-1 6 6 14-2 9-4 13 1"/></svg>';
  var scene = document.createElement('div');
  scene.className = 'fa-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: File Audit checking the Shah family’s Statement of Advice against the licensee’s standards. Five checks pass, the authority to proceed is flagged because the date is missing on page 31, the date is added on the page, and all 24 checks pass, ready for the adviser.');
  scene.innerHTML =
    '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 3 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><span class="rf-crumb">Advice Engine · Shah Family</span><h4>File Audit</h4><span class="rf-sub">Checked against your licensee’s standards before it goes out</span>' +
    '<div class="fa-grid"><div class="rf-card fa-checks"><div class="rf-ch"><b>Checks <span class="fa-ready">Ready for Alex</span></b><small><b class="fa-n" data-n>0</b> of 24 passed</small></div>' +
      '<span class="fa-prog"><i data-prog></i></span>' +
      CHECKS.map(function (c, k) {
        return '<div class="rf-row fa-row" data-k="' + k + '"><span class="fa-tick"></span><span class="rf-nm"><b>' + c[0] + '</b><small data-d>' + (k === 5 ? 'Date missing on page 31' : c[1]) + '</small></span>' +
          (k === 5 ? '<span class="fa-fix" data-fix>Fix</span>' : '') + '</div>';
      }).join('') + '</div>' +
    '<div class="fa-side"><div class="rf-card fa-doc"><div class="rf-ch"><b>Statement of Advice</b><small>Page 31 of 34</small></div>' +
      '<div class="fa-page"><div class="fa-ph"><img src="assets/aynub/aynub-lockup-financial-on-light.png" alt=""><em>Page 31</em></div>' +
        '<small class="fa-k">Statement of Advice</small><b class="fa-t">Authority to proceed</b>' +
        '<span class="fa-ln"></span><span class="fa-ln s"></span>' +
        '<div class="fa-sigs"><span>' + SIG1 + '<small>Priya Shah</small></span><span>' + SIG2 + '<small>Arjun Shah</small></span></div>' +
        '<span class="fa-dl">Date</span><span class="fa-date"><span data-date></span><i>' + svg('<path d="M6 12.5l4 4 8-9"/>') + '</i></span></div></div>' +
      '<div class="rf-card fa-std"><span class="fa-si">' + svg(SHIELD) + '</span><span class="rf-nm"><b>Licensee standards</b><small>Version 4.2 · March 2026</small></span>' +
        '<span class="fa-rep">' + svg(DOC) + 'Audit report kept with the file</span></div></div></div></div></div>' +
    '<div class="rf-toast fa-toast" aria-hidden="true"><span class="rf-ol">' + svg(SHIELD) + '</span><span><small>Bunya · File Audit · now</small><b>24 of 24 checks passed</b></span></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'File Audit · Shah Family';
  var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';

  var num = scene.querySelector('[data-n]'), prog = scene.querySelector('[data-prog]'), date = scene.querySelector('[data-date]'), last = scene.querySelector('.fa-row[data-k="5"] [data-d]'), fix = scene.querySelector('[data-fix]');
  var st = -1, tm = null, cnt = null, playing = !reduce, vis = false;
  function countTo(n) {
    clearInterval(cnt);
    var from = +num.textContent;
    if (reduce || from >= n) { num.textContent = n; return; }
    cnt = setInterval(function () { from++; num.textContent = from; if (from >= n) clearInterval(cnt); }, 60);
  }
  /* 0 nothing yet · 1–5 those checks pass · 6 authority to proceed flagged · 7 date added on page 31 · 8 all passed, ready */
  function paint(s) {
    st = s; scene.dataset.s = s;
    [].forEach.call(scene.querySelectorAll('.fa-row'), function (r) {
      var k = +r.dataset.k;
      r.classList.toggle('done', k < s && k < 5 || (k === 5 && s >= 7));
      r.classList.toggle('now', k === s && s < 5);
      r.classList.toggle('flag', k === 5 && s === 6);
    });
    var n = s === 0 ? 0 : s >= 7 ? 24 : CHECKS[Math.min(s, 5) - 1][2];
    if (s === 0) { clearInterval(cnt); num.textContent = '0'; } else countTo(n);
    prog.style.width = (n / 24 * 100) + '%';
    last.textContent = s >= 7 ? 'Date added on page 31' : 'Date missing on page 31';
    fix.textContent = s >= 7 ? 'Fixed' : 'Fix';
    date.textContent = s >= 7 ? '7 November 2026' : s === 6 ? 'Missing' : '';
  }
  function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 8 ? 0 : st + 1); tm = setTimeout(tick, st === 8 ? 4200 : st === 6 ? 2600 : st === 0 ? 800 : 1200); }
  var pb = scene.querySelector('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else clearTimeout(tm); });
  if (reduce) { paint(8); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 900); else clearTimeout(tm); }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();
