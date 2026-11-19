/* Insurance needs and quotes (insurance-needs.html), Dana 19 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-ins.css
   (+ the app frame, pills and toast from css/dana-rp.css). The film's story, clean and in Bunya colours (no glowing yellow):
   Arjun's need is laid out against his current cover, the $700k life gap is found, and three quotes are compared. */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vid = shot.querySelector('video');
  if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('in-hidden'); }
  /* type, current cover, need, label */
  var C = [['Life', 500, 1200, '$500k', '$1.2m'], ['TPD', 500, 900, '$500k', '$900k'], ['Income protection', 0, 9.8, '$0', '$9,800 a month'], ['Trauma', 0, 200, '$0', '$200k']];
  var Q = [['A', 'Insurer A', '$312', 'inside super'], ['B', 'Insurer B', '$298', 'inside super'], ['C', 'Insurer C', '$341', 'outside super']];
  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  var scene = document.createElement('div');
  scene.className = 'in-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: Arjun Shah’s insurance needs against his current cover. Life $500k of $1.2m needed, a $700k gap; TPD $500k of $900k; no income protection or trauma cover. Three quotes are compared, and Insurer B has the lowest premium at $298 a month inside super.');
  scene.innerHTML =
    '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 3 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><div class="in-top"><div><span class="rf-crumb">Advice Engine · Shah Family</span><h4>Insurance needs analysis</h4><span class="rf-sub">What they need, against what they have</span></div>' +
      '<span class="in-cta" data-cta>Compare quotes <i>→</i></span></div>' +
    '<div class="rf-card in-needs"><div class="in-who"><span class="rf-av c3">AS</span><b>Arjun</b><small>Need and current cover</small>' +
      '<span class="in-key"><i class="c"></i>Cover<i class="g"></i>Gap</span><span class="rf-pill soft">From the fact find</span></div>' +
      C.map(function (c, k) {
        var pct = c[2] ? Math.round(c[1] / c[2] * 100) : 0;
        return '<div class="in-row" data-k="' + k + '"><span class="in-t">' + c[0] + '</span><span class="in-bar"><i style="--w:' + pct + '%"></i>' + (k === 0 ? '<em class="in-gap">Gap <b>$700k</b></em>' : '') + '</span>' +
          '<span class="in-v"><b>' + c[3] + '</b> of ' + c[4] + '</span></div>';
      }).join('') + '</div>' +
    '<div class="rf-card in-quotes"><div class="rf-ch"><b>Quotes compared · 3 insurers</b><small>Arjun · life cover</small></div><div class="in-q">' +
      Q.map(function (q, k) { return '<div class="in-qc' + (k === 1 ? ' best' : '') + '">' + (k === 1 ? '<span class="in-best">Lowest premium</span>' : '') + '<span class="in-ql">' + q[0] + '</span><span><b>' + q[1] + '</b><small><strong>' + q[2] + '</strong> a month · ' + q[3] + '</small></span></div>'; }).join('') +
    '</div></div></div></div>' +
    '<div class="rf-toast in-toast" aria-hidden="true"><span class="rf-ol"><svg viewBox="0 0 24 24"><path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z" fill="none" stroke="currentColor" stroke-width="2"/></svg></span><span><small>Bunya · Shah Family · now</small><b>Gap found: $700k of life cover</b></span></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Insurance needs · Shah Family';
  var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';

  var st = -1, tm = null, playing = !reduce, vis = false;
  /* 0 empty · 1 needs laid out · 2 cover filled · 3 gap found · 4 quotes · 5 lowest picked */
  function paint(s) { st = s; scene.dataset.s = s; }
  function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 5 ? 0 : st + 1); tm = setTimeout(tick, st === 5 ? 4200 : st === 3 ? 2400 : 1500); }
  var pb = scene.querySelector('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else clearTimeout(tm); });
  if (reduce) { paint(5); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 900); else clearTimeout(tm); }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();

/* hero headline: "Quotes compared." on its own line under "Cover worked out." (Dana, 19 Nov 2026) */
(function () {
  var h = document.querySelector('.pp-hero h1');
  if (!h) return;
  [].forEach.call(h.childNodes, function (n) {
    if (n.nodeType === 3 && /Cover worked out\.\s+Quotes compared\./.test(n.textContent)) {
      var s = document.createElement('span');
      s.innerHTML = 'Cover worked out.<br>Quotes compared.';
      h.replaceChild(s, n);
    }
  });
})();
