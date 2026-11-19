/* Broadcast HQ (broadcast-hq.html), Dana 20 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-bh.css
   (+ the app frame, rows, pills and toast from css/dana-rp.css). The top film, rebuilt large so it fills its card:
   one idea ("Super or mortgage?") becomes four channel versions in the firm's brand (Aynub, the made-up practice used
   across the site), a privacy check finds no client details, Blog and LinkedIn are approved for Tuesday, Facebook is
   held back, and the newsletter waits for review. */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vid = shot.querySelector('video');
  if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('bh-hidden'); }
  function svg(p) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; }
  var TICK = '<path d="M6 12.5l4 4 8-9"/>', MAIL = '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M4 7l8 6 8-6"/>',
    SHIELD = '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/><path d="M9 12l2 2 4-4"/>';
  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    '<path d="M4 10v4h3l5 4V6L7 10z"/><path d="M16 9a4 4 0 0 1 0 6"/>', '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  var POINTS = ['Concessional caps and how they work', 'Paying down the loan gives a sure return', 'Super is locked away until preservation', 'Your adviser can model both'];
  var MARK = '<img class="bh-mk" src="assets/aynub/aynub-mark.svg" alt="">';
  /* [key, tile, name, kind, preview html] */
  var CH = [
    ['blog', 'B', 'Blog', 'Article', '<span class="bh-ph"><img src="assets/broadcast/bh-hills.jpg" alt=""></span><b class="bh-tt">Extra super or extra mortgage repayments?</b><small>Four questions that help you decide</small>'],
    ['li', 'in', 'LinkedIn', 'Short post', '<span class="bh-by">' + MARK + '<b>Aynub Financial</b></span><p>Extra super, or extra off the mortgage? Four questions to ask before you choose.</p>'],
    ['fb', 'f', 'Facebook', 'Friendly post', '<span class="bh-by">' + MARK + '<b>Aynub Financial</b></span><p>Super or mortgage? A friendly way to think it through.</p>'],
    ['nl', '', 'Newsletter', 'Email section', '<span class="bh-nlh">Aynub Financial · November news</span><b class="bh-tt">Super or mortgage?</b><small>Read the four questions</small>']
  ];
  var scene = document.createElement('div');
  scene.className = 'bh-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: one idea, super or mortgage, becomes four versions in the firm’s brand: a blog article, a LinkedIn post, a Facebook post and a newsletter section. A privacy check finds no client names, ages or dollar figures. The blog and LinkedIn are approved for Tuesday, Facebook is held back, and the newsletter is ready for review.');
  scene.innerHTML =
    '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 4 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><div class="bh-head"><span><span class="rf-crumb">Broadcast HQ · <span data-crumb>New idea</span></span><h4>Super or mortgage?</h4><span class="rf-sub">One idea · four channel versions · each approved on its own</span></span>' +
      '<span class="bh-priv">' + svg(SHIELD) + '<span><small>Privacy check</small><b>No client names, ages or dollar figures</b></span></span></div>' +
    '<div class="bh-grid"><div class="rf-card bh-idea"><div class="rf-ch"><b>The idea</b><span class="rf-me">AR</span></div>' +
      '<p class="bh-it">Extra super contributions or extra mortgage repayments: the trade-off most people in their forties are weighing, and four questions that help decide.</p>' +
      '<span class="bh-k">Key points</span><ol class="bh-pts">' + POINTS.map(function (p, k) { return '<li><em>' + (k + 1) + '</em>' + p + '</li>'; }).join('') + '</ol>' +
      '<span class="bh-go"><span data-go>Make four versions</span><i>' + svg('<path d="M5 12h14M13 6l6 6-6 6"/>') + '</i></span></div>' +
    '<div class="bh-chs">' + CH.map(function (c, k) {
      return '<div class="rf-card bh-ch" data-c="' + c[0] + '" style="--d:' + (k * .14) + 's"><div class="bh-chh"><span class="bh-ti bh-' + c[0] + '">' + (c[1] || svg(MAIL)) + '</span><b>' + c[2] + '</b><small>' + c[3] + '</small></div>' +
        '<div class="bh-pv"><span class="bh-wait">Waiting for the idea</span><div class="bh-body">' + c[4] + '</div></div>' +
        '<div class="bh-st"><span class="bh-pill" data-p>Ready for review</span><span class="bh-who"><span class="rf-me">AR</span><small data-w></small></span></div></div>';
    }).join('') + '</div></div></div></div>' +
    '<div class="rf-toast bh-toast" aria-hidden="true"><span class="rf-ol bh-teams">T</span><span><small>Teams · Marketing · now</small><b>Blog and LinkedIn approved, scheduled for Tuesday</b></span></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Broadcast HQ · Super or mortgage?';
  var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';

  /* 0 the idea · 1 drafting · 2 four versions ready · 3 privacy check passed · 4 blog approved · 5 LinkedIn approved, Facebook held back · 6 Teams told */
  var STATUS = {
    blog: [4, 'Approved', 'Tuesday'], li: [5, 'Approved', 'Tuesday'], fb: [5, 'Held back', 'Not this week'], nl: [99, '', '']
  };
  var st = -1, tm = null, playing = !reduce, vis = false;
  function paint(s) {
    st = s; scene.dataset.s = s;
    scene.querySelector('[data-crumb]').textContent = s === 0 ? 'New idea' : s === 1 ? 'Drafting' : 'Ready to approve';
    scene.querySelector('[data-go]').textContent = s === 0 ? 'Make four versions' : s === 1 ? 'Making four versions…' : 'Four versions made';
    [].forEach.call(scene.querySelectorAll('.bh-ch'), function (c) {
      var k = STATUS[c.dataset.c], done = s >= k[0];
      c.dataset.st = s < 2 ? '' : done ? (k[1] === 'Held back' ? 'held' : 'ok') : 'review';
      c.querySelector('[data-p]').textContent = done ? k[1] : 'Ready for review';
      c.querySelector('[data-w]').textContent = done ? k[2] : '';
    });
  }
  function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 6 ? 0 : st + 1); tm = setTimeout(tick, st === 6 ? 4200 : st === 1 ? 1900 : 1500); }
  var pb = scene.querySelector('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else clearTimeout(tm); });
  if (reduce) { paint(6); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 1200); else clearTimeout(tm); }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();
