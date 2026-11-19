/* Fact find (fact-find.html), Dana 19 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-ff.css
   (+ the app frame, rows and pills from css/dana-rp.css). The film's story, large and in Bunya colours: the Shah family's
   answers fill in, each with its source; Arjun's salary doesn't match across sources and is flagged; Alex checks it and
   locks the fact find. */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vid = shot.querySelector('video');
  if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('ff-hidden'); }
  var IC = {
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.6-3.6 3.4-5.5 7-5.5s6.4 1.9 7 5.5"/>',
    bank: '<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
    cash: '<rect x="3" y="6" width="18" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.5"/>',
    shield: '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    portal: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M3.5 9h17"/>'
  };
  function svg(k) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + IC[k] + '</svg>'; }
  var ROWS = [
    ['user', 'Retirement ages', 'Priya 60, Arjun 63', 'mic', 'From the meeting · 10:14'],
    ['bank', 'Super, combined', '$1.18m across 2 funds', 'doc', 'From 2 statements'],
    ['cash', 'Household income', '$186,000 a year', 'doc', 'From their tax return'],
    ['shield', 'Life cover', '$500,000 · Arjun', 'portal', 'From the client portal']
  ];
  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  var scene = document.createElement('div');
  scene.className = 'ff-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: the Shah family’s fact find filling in from the discovery meeting, two super statements, their tax return and the client portal, each answer with its source. Arjun’s salary differs between his tax return and the meeting, so it is flagged; the adviser checks it and locks the fact find.');
  scene.innerHTML =
    '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 3 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><span class="rf-crumb">Advice Engine · Shah Family</span><h4>Fact find</h4><span class="rf-sub">From the discovery meeting, 4 documents and the client portal</span>' +
    '<div class="ff-grid"><div class="rf-card ff-know"><div class="rf-ch"><b>What we know</b><span class="rf-pill ok">Filled by Bunya</span></div>' +
      ROWS.map(function (r, k) {
        return '<div class="rf-row ff-row" data-k="' + k + '"><span class="ff-ic">' + svg(r[0]) + '</span><span class="rf-nm"><small>' + r[1] + '</small><b>' + r[2] + '</b></span>' +
          '<span class="ff-src">' + svg(r[3]) + r[4] + '</span></div>';
      }).join('') + '</div>' +
    '<div class="rf-card ff-check"><div class="rf-ch"><b>Before Alex locks it</b><small data-left>1 to check</small></div>' +
      '<div class="ff-flag"><span class="ff-flag-h"><b>Arjun’s salary</b><span class="ff-tag" data-tag>Doesn’t match</span></span>' +
        '<span class="ff-cmp"><span><small>Tax return</small><b>$142,000</b></span><span><small>Meeting</small><b>$150,000</b></span></span>' +
        '<span class="ff-res">Confirmed with Arjun: <b>$150,000</b> from July</span></div>' +
      '<div class="ff-lock" data-lock><span class="ff-lock-i">' + svg('shield') + '</span><span data-lockt>Lock the fact find</span></div></div></div></div></div>' +
    '<div class="rf-toast ff-toast" aria-hidden="true"><span class="rf-ol">' + svg('shield') + '</span><span><small>Locked by Alex · now</small><b>Ready for insurance and modelling</b></span></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Fact find · Shah Family';
  var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';

  var st = -1, tm = null, playing = !reduce, vis = false;
  /* 0 empty · 1–4 answers fill · 5 mismatch flagged · 6 confirmed · 7 locked */
  function paint(s) {
    st = s; scene.dataset.s = s;
    [].forEach.call(scene.querySelectorAll('.ff-row'), function (r) { r.classList.toggle('in', +r.dataset.k < s); });
    scene.querySelector('[data-tag]').textContent = s >= 6 ? 'Confirmed' : 'Doesn’t match';
    scene.querySelector('[data-left]').textContent = s >= 6 ? 'All checked' : '1 to check';
    scene.querySelector('[data-lockt]').textContent = s >= 7 ? 'Fact find locked' : 'Lock the fact find';
  }
  function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 7 ? 0 : st + 1); tm = setTimeout(tick, st === 7 ? 4200 : st === 5 ? 2600 : st === 0 ? 800 : 1300); }
  var pb = scene.querySelector('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else clearTimeout(tm); });
  if (reduce) { paint(7); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 900); else clearTimeout(tm); }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();
