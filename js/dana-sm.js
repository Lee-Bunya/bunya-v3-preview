/* Strategy and modelling (strategy-modelling.html), Dana 19 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-sm.css
   (+ the app frame, rows, pills and toast from css/dana-rp.css). The film's story as a live chart in Bunya colours:
   "Can they retire at 60 and 63?" The current strategy runs out at 84, the proposed one lasts past 92, three scenarios sit
   side by side, and Alex chooses (the page is clear the strategy stays with the adviser, so nothing is labelled "recommended"). */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vid = shot.querySelector('video');
  if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('sm-hidden'); }
  /* chart: ages 60–95 across 40–560, $0–$2m from 260 down to 20 */
  function X(a) { return 40 + (a - 60) / 35 * 520; }
  function Y(m) { return 260 - m / 2 * 240; }
  var CUR = [[60, 1.55], [62, 1.6], [66, 1.45], [70, 1.22], [74, .95], [78, .64], [81, .38], [84, 0]];
  var PRO = [[60, 1.55], [62, 1.75], [66, 1.7], [70, 1.58], [75, 1.38], [80, 1.14], [85, .88], [90, .64], [95, .42]];
  /* smooth curve through the points (Catmull-Rom to Bezier) */
  function path(pts) {
    var P = pts.map(function (p) { return [X(p[0]), Y(p[1])]; }), d = 'M' + P[0][0] + ' ' + P[0][1];
    for (var i = 0; i < P.length - 1; i++) {
      var p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
      d += ' C' + (p1[0] + (p2[0] - p0[0]) / 6) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6) + ' ' + (p2[0] - (p3[0] - p1[0]) / 6) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6) + ' ' + p2[0] + ' ' + p2[1];
    }
    return d;
  }
  var cur = path(CUR), pro = path(PRO);
  var area = pro + ' L' + X(95) + ' ' + Y(0) + ' L' + X(84) + ' ' + Y(0) + ' ' + path(CUR.slice().reverse()).replace(/^M/, 'L') + ' Z';
  var grid = '';
  [0, 1, 2].forEach(function (m) { grid += '<line x1="40" x2="560" y1="' + Y(m) + '" y2="' + Y(m) + '" class="sm-gl"/><text x="32" y="' + (Y(m) + 4) + '" text-anchor="end">' + (m ? '$' + m + 'm' : '$0') + '</text>'; });
  [60, 65, 70, 75, 80, 85, 90, 95].forEach(function (a) { grid += '<text x="' + X(a) + '" y="282" text-anchor="middle">' + a + '</text>'; });
  var SC = [['A', 'Current strategy', 'As things are today', 'Money lasts to 84'], ['B', 'Proposed', 'Salary sacrifice and recontribution', 'Money lasts past 92'], ['C', 'Downsize at 65', 'Sell the home and buy smaller', 'Money lasts to 95']];
  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  var scene = document.createElement('div');
  scene.className = 'sm-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: can the Shahs retire at 60 and 63? On the current strategy their money runs out at 84. The proposed strategy, with salary sacrifice and recontribution, lasts past 92. Downsizing at 65 lasts to 95. The adviser chooses the strategy.');
  scene.innerHTML =
    '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 3 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><span class="rf-crumb">Advice Engine · Shah Family</span><h4>Strategy and modelling</h4><span class="rf-sub">Can they retire at 60 and 63?</span>' +
    '<div class="sm-grid"><div class="rf-card sm-chart"><div class="rf-ch"><b>Their money in retirement</b><small>Today’s dollars</small></div>' +
      '<div class="sm-key"><span><i class="d"></i>Current strategy</span><span class="p"><i class="t"></i>Proposed strategy</span></div>' +
      '<svg viewBox="0 0 580 292" class="sm-svg">' + grid +
        '<line x1="' + X(60) + '" x2="' + X(60) + '" y1="20" y2="260" class="sm-ret"/><text x="' + (X(60) + 8) + '" y="30" class="sm-rl">Both retire</text>' +
        '<defs><clipPath id="smc1"><rect class="sm-w1" x="0" y="0" width="580" height="292"/></clipPath><clipPath id="smc2"><rect class="sm-w2" x="0" y="0" width="580" height="292"/></clipPath></defs>' +
        '<path d="' + area + '" class="sm-area" clip-path="url(#smc2)"/>' +
        '<path d="' + cur + '" class="sm-cur" clip-path="url(#smc1)"/>' +
        '<path d="' + pro + '" class="sm-pro" clip-path="url(#smc2)"/>' +
        '<g class="sm-m1"><circle cx="' + X(84) + '" cy="' + Y(0) + '" r="6"/><rect x="' + (X(84) - 70) + '" y="' + (Y(0) - 40) + '" width="122" height="26" rx="13"/><text x="' + (X(84) - 9) + '" y="' + (Y(0) - 22) + '" text-anchor="middle">Runs out at 84</text></g>' +
        '<g class="sm-m2"><line x1="' + X(92) + '" x2="' + X(92) + '" y1="' + Y(1.25) + '" y2="' + Y(.56) + '"/><circle cx="' + X(92) + '" cy="' + Y(.56) + '" r="6"/><rect x="' + (X(92) - 64) + '" y="' + (Y(1.25) - 26) + '" width="128" height="28" rx="14"/><text x="' + X(92) + '" y="' + (Y(1.25) - 7) + '" text-anchor="middle">✓ Lasts past 92</text></g>' +
      '</svg></div>' +
    '<div class="rf-card sm-sc"><div class="rf-ch"><b>Scenarios</b><small>3 modelled</small></div>' +
      SC.map(function (c, k) { return '<div class="sm-row" data-k="' + k + '"><span class="sm-l">' + c[0] + '</span><span class="rf-nm"><b>' + c[1] + '</b><small>' + c[2] + '</small><em>' + c[3] + '</em></span>' + (k === 1 ? '<span class="sm-pick">Chosen by Alex</span>' : '') + '</div>'; }).join('') +
      '<div class="sm-status"><span><small>Status</small><b data-status>Modelling</b></span><span class="rf-me">AR</span></div></div></div></div></div>' +
    '<div class="rf-toast sm-toast" aria-hidden="true"><span class="rf-ol"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span><small>Bunya · Advice Engine · now</small><b>Proposed strategy lasts past 92</b></span></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Strategy and modelling · Shah Family';
  var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';

  var st = -1, tm = null, playing = !reduce, vis = false;
  /* 0 axes · 1 current draws, runs out · 2 proposed draws · 3 lasts past 92 + scenarios · 4 Alex chooses */
  function paint(s) { st = s; scene.dataset.s = s; scene.querySelector('[data-status]').textContent = s >= 4 ? 'Strategy set by Alex' : s >= 3 ? 'Ready for Alex to decide' : 'Modelling'; }
  function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 4 ? 0 : st + 1); tm = setTimeout(tick, st === 4 ? 4600 : st === 0 ? 900 : 2200); }
  var pb = scene.querySelector('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else clearTimeout(tm); });
  if (reduce) { paint(4); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 900); else clearTimeout(tm); }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();
