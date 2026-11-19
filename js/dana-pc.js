/* Platform comparisons (platform-comparisons.html), Dana 19 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-pc.css
   (+ the app frame and pills from css/dana-rp.css). The film's story as a live table in Bunya colours: the Shahs' current fund
   against two platforms, every fee priced from each PDS; Alex recommends Platform A, saving $3,720 a year. */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vid = shot.querySelector('video');
  if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('pc-hidden'); }
  var COLS = [['Current', 'Their funds today', 'cur'], ['Platform A', 'Alternative', 'a'], ['Platform B', 'Alternative', 'b']];
  /* label, values, numbers (for the bars), kind: f = fee, t = total, o = other */
  var ROWS = [
    ['Administration', ['$2,150', '$1,680', '$2,100'], [2150, 1680, 2100], 'f'], ['Investment', ['$7,120', '$4,150', '$4,560'], [7120, 4150, 4560], 'f'],
    ['Other fees and costs', ['$570', '$290', '$390'], [570, 290, 390], 'f'],
    ['Fees a year', ['$9,840', '$6,120', '$7,050'], [9840, 6120, 7050], 't'],
    ['Investment options', ['62', '480', '310'], null, 'o'], ['Insurance inside', ['yes:Yes', 'yes:Yes', 'no:No'], null, 'o'], ['SMSF reporting', ['Separate', 'yes:Included', 'Separate'], null, 'o']
  ];
  var DOC = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>';
  var TICK = '<i class="pc-ok"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg></i>', NO = '<i class="pc-no"><svg viewBox="0 0 24 24"><path d="M7 12h10"/></svg></i>';
  function cell(v) { if (/^yes:/.test(v)) return TICK + v.slice(4); if (/^no:/.test(v)) return NO + v.slice(3); return v; }
  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  var head = '<div class="pc-r pc-h"><span class="pc-l pc-hl"><b>Priced from each PDS</b><small>A$ a year, for Priya and Arjun</small></span>' + COLS.map(function (c, k) {
    return '<span class="pc-c c' + k + '"><i class="pc-band">Recommended by Alex</i><span class="pc-tile t-' + c[2] + '">' + (k ? c[0].slice(-1) : '<svg viewBox="0 0 24 24"><path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/></svg>') + '</span>' +
      '<b>' + c[0] + '</b><small>' + c[1] + '</small><em class="pc-pds">' + DOC + 'PDS</em></span>';
  }).join('') + '</div>';
  var body = ROWS.map(function (r, i) {
    var max = r[2] ? Math.max.apply(null, r[2]) : 0;
    return '<div class="pc-r pc-' + r[3] + '" data-i="' + i + '"><span class="pc-l">' + r[0] + '</span>' + r[1].map(function (v, k) {
      var extra = '';
      if (r[3] === 'f') extra = '<span class="pc-bar"><i style="--w:' + Math.round(r[2][k] / max * 100) + '%"></i></span>';
      if (r[3] === 't') extra = k ? '<span class="pc-diff">Saves $' + (r[2][0] - r[2][k]).toLocaleString('en-AU') + '</span>' : '<span class="pc-diff now">Today</span>';
      return '<span class="pc-c c' + k + '"><b>' + cell(v) + '</b>' + extra + '</span>';
    }).join('') + '</div>';
  }).join('');
  var scene = document.createElement('div');
  scene.className = 'pc-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: the Shahs’ current fund compared with two platforms, every fee priced from each product disclosure statement. Current fees $9,840 a year, Platform A $6,120, Platform B $7,050. Alex recommends Platform A, saving $3,720 a year.');
  scene.innerHTML =
    '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 3 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><div class="pc-top"><div><span class="rf-crumb">Advice Engine · Shah Family</span><h4>Platform comparison</h4><span class="rf-sub">Their current fund against two alternatives</span></div>' +
      '<div class="pc-who"><span class="rf-av c5">PS</span><span class="rf-av c3">AS</span><span>Priya and Arjun</span></div></div>' +
    '<div class="rf-card pc-table">' + head + body + '</div>' +
    '<div class="pc-save"><span class="pc-save-i"><svg viewBox="0 0 24 24"><path d="M3 7l6 6 4-4 8 8M21 11v6h-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      '<span><b>Platform A saves <em>$3,720</em> a year</b><small>Against their current fees of $9,840</small></span></div></div></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Platform comparisons · Shah Family';
  var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';

  var st = -1, tm = null, playing = !reduce, vis = false;
  /* 0 empty · 1–3 fee rows · 4 totals · 5 other rows · 6 Alex recommends A */
  function paint(s) {
    st = s; scene.dataset.s = s;
    [].forEach.call(scene.querySelectorAll('.pc-r[data-i]'), function (r) { var i = +r.dataset.i; r.classList.toggle('in', i < s || (i >= 4 && s >= 5)); });
  }
  function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 6 ? 0 : st + 1); tm = setTimeout(tick, st === 6 ? 4600 : st === 0 ? 800 : 1200); }
  var pb = scene.querySelector('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else clearTimeout(tm); });
  if (reduce) { paint(6); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 900); else clearTimeout(tm); }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();
