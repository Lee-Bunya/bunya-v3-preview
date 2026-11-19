/* Support (care.html), Dana 19 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-care.css.
   The opening "Looked after, every month" film rebuilt as a large live screen in Bunya colours (same story as the film):
   this month's release lands (11 → 12 releases), Microsoft's changes are checked one by one, and the team answers a question. */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vid = shot.querySelector('video');
  if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('cr-hidden'); }

  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  var MS = [['Power Platform update', 'Flows and forms'], ['Teams meeting change', 'Recording settings'], ['Outlook add-in update', 'Email filing']];
  /* release history as a status-page style strip: one segment per month, Dec to Nov */
  var MON = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
  var dots = MON.map(function (m) { return '<span><i></i><em>' + m.charAt(0) + '</em></span>'; }).join('');
  var scene = document.createElement('div');
  scene.className = 'cr-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: the Bunya Care screen. This month’s release arrives, Microsoft’s changes are checked one by one before they reach your team, and the Bunya team answers a question.');
  scene.innerHTML =
    '<div class="rf-app cr-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 0 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><span class="rf-crumb">Bunya Care · Your practice</span><h4>Looked after, every month</h4><span class="rf-sub">Releases, Microsoft changes and help from our team</span>' +
    '<div class="cr-grid"><div class="rf-card cr-rel"><div class="rf-ch"><b>Releases</b><small>A release every month</small></div>' +
      '<div class="cr-count"><b data-n>11</b><span>releases in the<br>last 12 months</span></div><div class="cr-strip"><div class="cr-dots">' + dots + '</div><div class="cr-strip-k"><span>Dec 2025</span><span>Nov 2026</span></div></div>' +
      '<div class="cr-new"><span class="cr-new-h"><b>This month’s release</b><span class="rf-pill ok" data-rel>On its way</span></span>' +
        '<span class="cr-item"><i></i>Review packs: fee summary on page one</span><span class="cr-item"><i></i>Faster client search</span><span class="cr-item"><i></i>Two new report filters</span></div></div>' +
    '<div class="cr-side"><div class="rf-card cr-ms"><div class="rf-ch"><b>Microsoft changes</b><small>3 this month</small></div>' +
      MS.map(function (m, k) { return '<div class="rf-row" data-ms="' + k + '"><span class="cr-chk"></span><span class="rf-nm"><b>' + m[0] + '</b><small>' + m[1] + '</small></span><span class="rf-pill wait">Checking</span></div>'; }).join('') + '</div>' +
      '<div class="rf-card cr-help"><div class="rf-ch"><b>Help from our team</b><small>When you need it</small></div>' +
        '<div class="cr-msg me"><span>Can we add a step to our review process?</span></div>' +
        '<div class="cr-msg them"><span class="cr-av"></span><span><b>Bunya team</b>Yes. We’ll scope it and send the quote to your portal.</span></div>' +
        '<div class="cr-typing"><i></i><i></i><i></i></div></div></div></div></div></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Support · Bunya Care';
  var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';

  var st = -1, tm = null, playing = !reduce, vis = false;
  function paint(s) {
    st = s; scene.dataset.s = s;
    var shipped = s >= 1;
    scene.querySelector('[data-n]').textContent = shipped ? '12' : '11';
    var rel = scene.querySelector('[data-rel]'); rel.textContent = shipped ? 'Shipped' : 'On its way'; rel.className = 'rf-pill ' + (shipped ? 'ok' : 'soft');
    [].forEach.call(scene.querySelectorAll('[data-ms]'), function (r) {
      var k = +r.dataset.ms, ok = s >= 2 + k, p = r.querySelector('.rf-pill');
      r.classList.toggle('ok', ok); p.textContent = ok ? 'Tested' : 'Checking'; p.className = 'rf-pill ' + (ok ? 'ok' : 'wait');
    });
  }
  function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 6 ? 0 : st + 1); tm = setTimeout(tick, st === 6 ? 4200 : 2200); }
  var pb = scene.querySelector('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else clearTimeout(tm); });
  if (reduce) { paint(6); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 1400); else clearTimeout(tm); }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();
