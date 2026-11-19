/* Portfolio (portfolio.html), Dana 19 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-pf.css
   (+ the app frame, rows, pills and toast from css/dana-rp.css). The film's story, large and in Bunya colours:
   the Shah family's four holdings are brought together one by one, each with its source, the total builds to $1.505m,
   and the ring shows how it's held. */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vid = shot.querySelector('video');
  if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('pf-hidden'); }
  var H = [
    ['Industry super fund · Priya', 'Balanced option', 612, '#013B43', 'Fund statement'],
    ['Shah Super Fund · SMSF', 'Shares, cash and a term deposit', 568, '#0A7D79', 'SMSF accounts'],
    ['Shah Family Trust', 'Australian shares', 240, '#11B8B1', 'Trust statement'],
    ['Cash', 'Offset and savings', 85, '#7EDAD6', 'Bank statements']
  ];
  var TOTAL = H.reduce(function (a, h) { return a + h[2]; }, 0);
  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  var R = 70, C = 2 * Math.PI * R, off = 0, arcs = '';
  H.forEach(function (h, k) {
    var len = h[2] / TOTAL * C;
    arcs += '<circle class="pf-arc" data-k="' + k + '" cx="90" cy="90" r="' + R + '" fill="none" stroke="' + h[3] + '" stroke-width="22" stroke-dasharray="' + Math.max(len - 3, 1) + ' ' + C + '" stroke-dashoffset="' + (-off) + '" transform="rotate(-90 90 90)"/>';
    off += len;
  });
  var scene = document.createElement('div');
  scene.className = 'pf-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: the Shah family’s portfolio. Four holdings are brought together, each with its source: an industry super fund, their SMSF, the family trust and cash, $1.505m in total.');
  scene.innerHTML =
    '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 3 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><span class="rf-crumb">Advice Engine · Shah Family</span><h4>Portfolio</h4><span class="rf-sub">$1.505m across super, the SMSF and the trust</span>' +
    '<div class="pf-grid"><div class="rf-card pf-hold"><div class="rf-ch"><b>Holdings</b><span class="rf-pill ok">Brought in by Bunya</span></div>' +
      H.map(function (h, k) {
        return '<div class="rf-row pf-row" data-k="' + k + '"><span class="pf-sw" style="background:' + h[3] + '"></span><span class="rf-nm"><b>' + h[0] + '</b><small>' + h[1] + ' · <em>' + h[4] + '</em></small></span><span class="pf-amt">$' + h[2] + 'k</span></div>';
      }).join('') +
      '<div class="pf-total"><small>Total</small><b data-total>$0</b></div></div>' +
    '<div class="rf-card pf-mix"><div class="rf-ch"><b>How it’s held</b><small>By holding</small></div>' +
      '<div class="pf-ring"><svg viewBox="0 0 180 180"><circle cx="90" cy="90" r="' + R + '" fill="none" stroke="#EEF4F4" stroke-width="22"/>' + arcs + '</svg><span><b data-n>0</b><small>holdings</small></span></div>' +
      '<div class="pf-leg">' + H.map(function (h) { return '<span><i style="background:' + h[3] + '"></i>' + h[0].split(' · ')[0] + '</span>'; }).join('') + '</div></div></div></div></div>' +
    '<div class="rf-toast pf-toast" aria-hidden="true"><span class="rf-ol"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span><small>Bunya · Shah Family · now</small><b>4 holdings brought together: $1.505m</b></span></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Portfolio · Shah Family';
  var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';

  var totalEl = scene.querySelector('[data-total]'), nEl = scene.querySelector('[data-n]');
  var st = -1, tm = null, ct = null, playing = !reduce, vis = false, shown = 0;
  function money(k) { return k >= 1000 ? '$' + (k / 1000).toFixed(3).replace(/0+$/, '').replace(/\.$/, '') + 'm' : '$' + k + 'k'; }
  function countTo(target) {
    clearInterval(ct);
    if (reduce) { shown = target; totalEl.textContent = money(target); return; }
    var from = shown, steps = 16, i = 0;
    ct = setInterval(function () { i++; shown = Math.round(from + (target - from) * i / steps); totalEl.textContent = money(shown); if (i >= steps) clearInterval(ct); }, 35);
  }
  /* 0 empty · 1–4 holdings arrive · 5 complete */
  function paint(s) {
    st = s; scene.dataset.s = s;
    [].forEach.call(scene.querySelectorAll('.pf-row'), function (r) { r.classList.toggle('in', +r.dataset.k < s); });
    [].forEach.call(scene.querySelectorAll('.pf-arc'), function (a) { a.classList.toggle('in', +a.dataset.k < s); });
    var n = Math.min(s, 4); nEl.textContent = n;
    if (s === 0) { clearInterval(ct); shown = 0; totalEl.textContent = '$0'; } else countTo(H.slice(0, n).reduce(function (a, h) { return a + h[2]; }, 0));
  }
  function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 5 ? 0 : st + 1); tm = setTimeout(tick, st === 5 ? 4400 : st === 0 ? 800 : 1400); }
  var pb = scene.querySelector('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else clearTimeout(tm); });
  if (reduce) { paint(5); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 900); else clearTimeout(tm); }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();
