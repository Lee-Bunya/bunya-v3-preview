/* Revenue Import (revenue-import.html), Dana 20 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-ri.css
   (+ the app frame, rows, pills and toast from css/dana-rp.css). The top film, rebuilt large so it fills its card:
   the October Xplan export is dropped in, each row is matched to its client by Xplan ID (one is linked by hand),
   the total climbs to $48,210, and all 42 rows are matched. */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vid = shot.querySelector('video');
  if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('ri-hidden'); }
  function svg(p) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; }
  var FILE = '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M8.5 13h7M8.5 16.5h5"/>',
    UP = '<path d="M12 16V5M7 10l5-5 5 5M5 19h14"/>', TICK = '<path d="M6 12.5l4 4 8-9"/>', LINK = '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>';
  /* [initials, client, Xplan ID, amount, colour, linked by hand] */
  var ROWS = [['HF', 'Harper Family', 'XP-104231', 1240, 'c1'], ['NH', 'Nguyen Household', 'XP-104871', 860, 'c5'], ['OF', 'Okafor Family', 'XP-105182', 2115, 'c4'],
    ['CF', 'Calder Family', 'XP-105398', 640, 'c3'], ['MF', 'Morgan Family', 'XP-106664', 1480, 'c1'], ['LH', 'Lin Household', 'XP-106971', 920, 'c5', 1]];
  var TOTALS = [0, 7420, 14980, 23310, 30860, 39240, 48210];   /* the running October total as rows come in (42 rows in all) */
  var COUNTS = [0, 7, 14, 21, 28, 35, 42];
  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', FILE,
    '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  function money(n) { return '$' + n.toLocaleString('en-AU'); }
  var scene = document.createElement('div');
  scene.className = 'ri-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: the October revenue export from Xplan is dropped into Bunya. Each row is matched to its client by Xplan ID, one is linked by hand, and all 42 rows are matched, $48,210 in total.');
  scene.innerHTML =
    '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 2 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><span class="rf-crumb">Revenue Import · October</span><h4>Revenue, matched</h4><span class="rf-sub">From your Xplan export, matched to each client</span>' +
    '<div class="ri-grid"><div class="rf-card ri-tbl"><div class="rf-ch"><b>October revenue <span class="ri-file">' + svg(FILE) + 'revenue-october.csv</span></b><small><b data-c>0</b> of 42 rows</small></div>' +
      '<span class="ri-prog"><i data-p></i></span>' +
      '<div class="ri-drop">' + svg(UP) + '<span>Drop your revenue export</span></div>' +
      '<div class="ri-rows">' + ROWS.map(function (r, k) {
        return '<div class="rf-row ri-row" data-k="' + k + '"><span class="rf-av ' + r[4] + '">' + r[0] + '</span><span class="rf-nm"><b>' + r[1] + '</b></span><span class="ri-id">' + r[2] + '</span>' +
          '<span class="ri-amt">' + money(r[3]) + '</span><span class="ri-tag' + (r[5] ? ' ln' : '') + '">' + svg(r[5] ? LINK : TICK) + (r[5] ? 'Linked by Alex' : 'Matched by Xplan ID') + '</span></div>';
      }).join('') + '</div></div>' +
    '<div class="ri-side"><div class="rf-card ri-sum"><small class="ri-k">October total</small><b class="ri-total" data-t>$0</b>' +
        '<div class="ri-ring"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="50"/><circle class="ri-arc" cx="60" cy="60" r="50" pathLength="100"/></svg><span><b data-c2>0</b><small>of 42 matched</small></span></div></div>' +
      '<div class="rf-card ri-how"><div class="ri-hr"><span class="ri-dot"></span><span>Matched by Xplan ID</span><b data-m>0</b></div><div class="ri-hr"><span class="ri-dot ln"></span><span>Linked by Alex</span><b data-l>0</b></div>' +
        '<div class="ri-src">' + svg(FILE) + '<span><b>Xplan export</b><small>revenue-october.csv · 42 rows</small></span></div></div></div></div></div></div>' +
    '<div class="ri-fly" aria-hidden="true">' + svg(FILE) + '<span><b>revenue-october.csv</b><small>Xplan export · 42 rows</small></span></div>' +
    '<div class="rf-toast ri-toast" aria-hidden="true"><span class="rf-ol">' + svg(TICK) + '</span><span><small>Bunya · Revenue Import · now</small><b>October revenue in: 42 rows matched</b></span></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Revenue Import · October';
  var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';

  function q(s) { return scene.querySelector(s); }
  var tEl = q('[data-t]'), shown = 0, cnt = null;
  function countTo(n) {
    clearInterval(cnt);
    if (reduce || n <= shown) { shown = n; tEl.textContent = money(n); return; }
    var from = shown, step = Math.max(1, Math.round((n - from) / 18));
    cnt = setInterval(function () { from = Math.min(n, from + step); shown = from; tEl.textContent = money(from); if (from >= n) clearInterval(cnt); }, 40);
  }
  var st = -1, tm = null, playing = !reduce, vis = false;
  /* 0 empty · 1 export dropped · 2–7 rows match (the last is linked by hand) · 8 all matched */
  function paint(s) {
    st = s; scene.dataset.s = s;
    var n = s <= 1 ? 0 : Math.min(s - 1, 6);
    [].forEach.call(scene.querySelectorAll('.ri-row'), function (r) { r.classList.toggle('in', +r.dataset.k < n); });
    var c = COUNTS[n];
    q('[data-c]').textContent = c; q('[data-c2]').textContent = c;
    q('[data-p]').style.width = (c / 42 * 100) + '%';
    q('.ri-arc').style.strokeDasharray = (c / 42 * 100) + ' 100';
    q('[data-m]').textContent = Math.max(0, c - (n >= 6 ? 1 : 0)); q('[data-l]').textContent = n >= 6 ? 1 : 0;
    if (s === 0) { clearInterval(cnt); shown = 0; tEl.textContent = '$0'; } else countTo(TOTALS[n]);
  }
  function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 8 ? 0 : st + 1); tm = setTimeout(tick, st === 8 ? 4200 : st === 1 ? 1500 : st === 0 ? 1200 : 950); }
  var pb = q('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else clearTimeout(tm); });
  if (reduce) { paint(8); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 1000); else clearTimeout(tm); }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();
