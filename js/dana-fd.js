/* Field Notes (field-notes.html), Dana 20 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-fd.css
   (+ the app frame, rows, pills and toast from css/dana-rp.css). Lee's still of the finished home visit becomes a live
   screen that fills its card: the Walsh family's home visit ends, the recording and transcript are stored, the file note
   fills in section by section, two actions are proposed, and Alex approves it. Every line is from Lee's screens. */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var still = shot.querySelector(':scope > img');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function svg(p) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; }
  var IC = {
    pen: '<path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    rec: '<rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="M16 10.5l5-3v9l-5-3z"/>',
    shield: '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/><path d="M9 12l2 2 4-4"/>',
    tick: '<path d="M6 12.5l4 4 8-9"/>',
    folder: '<path d="M3 7.5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'
  };
  var NOTE = [
    ['Purpose', 'Update the estate plan now that Pat has retired from the business.'],
    ['Discussed', 'Wills last updated in 2019. Two adult children, one working in the business.'],
    ['Goals', 'Pass the business on fairly, and keep enough to live on.'],
    ['Agreed next steps', 'Request the current wills. Book a meeting with their solicitor.']
  ];
  var ACT = [['JS', 'Request the current wills', 'Jess Stone', 'c4'], ['CS', 'Book the solicitor meeting', 'Client services', 'c3']];
  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>',
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  var bars = ''; for (var i = 0; i < 64; i++) { var h = 20 + Math.round(72 * Math.abs(Math.sin(i * 1.3) * Math.cos(i * .37))); bars += '<i style="height:' + h + '%"></i>'; }
  var scene = document.createElement('div');
  scene.className = 'fd-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: a home visit with Ann and Pat Walsh ends after 48 minutes, recorded in Command Centre with their consent. The recording and transcript are stored in SharePoint, the file note fills in, two actions are proposed, and the adviser approves it.');
  scene.innerHTML =
    '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 1 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><div class="fd-head"><span><span class="rf-crumb">Clients · Walsh Family · Home visit</span><h4 data-h>Home visit ended. Your file note is ready.</h4>' +
      '<span class="rf-sub">Recorded at their home in Command Centre · 48 minutes · with consent</span></span><span class="fd-appr" data-appr>Review and approve</span></div>' +
    '<div class="fd-grid"><div class="rf-card fd-note"><div class="rf-ch"><b><span class="fd-ic">' + svg(IC.pen) + '</span>File note<small data-ns>Draft · in your firm’s format</small></b><span class="rf-pill ok" data-np>Prepared by Bunya</span></div>' +
      NOTE.map(function (n, k) { return '<div class="fd-sec" data-k="' + k + '"><small>' + n[0] + '</small><p>' + n[1] + '</p></div>'; }).join('') +
      '<div class="fd-foot"><span><b>4 sections</b>, each linked to the moment it was said</span><span class="fd-sp">' + svg(IC.folder) + 'Walsh Family · SharePoint</span></div></div>' +
    '<div class="fd-side"><div class="rf-card fd-rec"><div class="fd-rh"><span class="fd-ic">' + svg(IC.rec) + '</span><span class="rf-nm"><b>Recording and transcript</b><small data-rs>Saving from Command Centre</small></span><span class="rf-pill soft" data-rp>Saving</span></div>' +
        '<div class="fd-wave">' + bars + '</div><div class="fd-time"><span>0:00</span><span>48:00</span></div></div>' +
      '<div class="rf-card fd-row"><span class="fd-ic">' + svg(IC.shield) + '</span><span class="rf-nm"><b>Consent</b><small>Given by Ann and Pat before recording</small></span><span class="rf-pill ok">Recorded</span></div>' +
      '<div class="rf-card fd-acts"><div class="rf-ch"><b><span class="fd-ic">' + svg(IC.tick) + '</span>Actions</b><small data-as>Proposing…</small></div>' +
        ACT.map(function (a, k) { return '<div class="rf-row fd-act" data-a="' + k + '"><span class="rf-av ' + a[3] + '">' + a[0] + '</span><span class="rf-nm"><b>' + a[1] + '</b><small>' + a[2] + '</small></span></div>'; }).join('') + '</div></div></div></div></div>' +
    '<div class="rf-toast fd-toast" aria-hidden="true"><span class="rf-ol">' + svg(IC.folder) + '</span><span><small>Approved by Alex · now</small><b>Filed to the Walsh family</b></span></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  if (still) still.classList.add('fd-hidden');
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Field Notes · Walsh Family';

  function q(s) { return scene.querySelector(s); }
  var st = -1, tm = null, playing = !reduce, vis = false;
  /* 0 visit just ended · 1 recording stored · 2–5 file note sections fill · 6 actions proposed · 7 approved and filed */
  function paint(s) {
    st = s; scene.dataset.s = s;
    [].forEach.call(scene.querySelectorAll('.fd-sec'), function (e) { e.classList.toggle('in', +e.dataset.k < s - 1); });
    [].forEach.call(scene.querySelectorAll('.fd-act'), function (e) { e.classList.toggle('in', s >= 6); });
    q('[data-rs]').textContent = s >= 1 ? 'Stored in SharePoint' : 'Saving from Command Centre';
    var rp = q('[data-rp]'); rp.className = 'rf-pill ' + (s >= 1 ? 'ok' : 'soft'); rp.textContent = s >= 1 ? 'Filed' : 'Saving';
    q('[data-as]').textContent = s >= 6 ? '2 proposed' : 'Proposing…';
    q('[data-ns]').textContent = s >= 7 ? 'Approved by Alex' : 'Draft · in your firm’s format';
    var np = q('[data-np]'); np.textContent = s >= 7 ? 'Approved' : 'Prepared by Bunya';
    q('[data-appr]').textContent = s >= 7 ? 'Approved' : 'Review and approve';
    q('[data-h]').textContent = s >= 7 ? 'Home visit filed to the Walsh family.' : 'Home visit ended. Your file note is ready.';
  }
  function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 7 ? 0 : st + 1); tm = setTimeout(tick, st === 7 ? 4200 : st === 6 ? 1900 : 1300); }
  var pb = q('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else clearTimeout(tm); });
  if (reduce) { paint(7); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 1000); else clearTimeout(tm); }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();

/* Up close, "Record", live (Dana, 20 Nov 2026): Lee's flat screenshot becomes a scene with depth. Ann and Pat at home,
   the phone recording in front of them (timer running, voice moving), and once Alex stops it, the after-the-visit
   steps tick off. Same words as Lee's screen. The other two tabs keep Lee's screenshots. */
(function () {
  'use strict';
  var sc = document.querySelector('#close .hb-view .sc');
  if (!sc) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function svg(p) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; }
  var TICK = '<path d="M6 12.5l4 4 8-9"/>', SHIELD = '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/><path d="M9 12l2 2 4-4"/>',
    PPL = '<circle cx="9" cy="8" r="3.2"/><path d="M3 19c.5-3.2 2.9-5 6-5s5.5 1.8 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14c2.5.2 4 1.8 4.5 4.5"/>';
  var AFTER = ['Recording and transcript, stored in SharePoint', 'File note drafted for Alex to check', 'Actions proposed, with owners'];
  var bars = ''; for (var i = 0; i < 26; i++) { var h = 26 + Math.round(70 * Math.abs(Math.sin(i * 1.9) * Math.cos(i * .5))); bars += '<i style="height:' + h + '%;animation-delay:' + (-(i % 7) * .13) + 's"></i>'; }
  var live = document.createElement('div');
  live.className = 'fr-live';
  live.setAttribute('role', 'img');
  live.setAttribute('aria-label', 'Illustrative: a home visit with Ann and Pat Walsh being recorded on the adviser’s phone in Command Centre, with their consent. It will be filed to the Walsh family’s client record, and after the visit the recording and transcript are stored in SharePoint, the file note is drafted for the adviser to check and actions are proposed with owners.');
  live.innerHTML =
    '<div class="fr-stage" aria-hidden="true">' +
      '<svg class="fr-orbit" viewBox="0 0 800 800" aria-hidden="true">' +
        '<g class="fr-o1"><circle class="fr-r r1" cx="400" cy="400" r="380"/><circle class="fr-n" cx="20" cy="400" r="7" fill="#013B43"/><circle class="fr-n" cx="669" cy="131" r="6" fill="#11B8B1"/></g>' +
        '<g class="fr-o2"><circle class="fr-r r2" cx="400" cy="400" r="318"/><circle class="fr-n" cx="400" cy="82" r="5.5" fill="#11B8B1"/></g>' +
        '<g class="fr-o3"><circle class="fr-r r3" cx="400" cy="400" r="262"/><circle class="fr-n" cx="138" cy="400" r="6.5" fill="#F4B528"/></g>' +
        '<g class="fr-o4"><circle class="fr-r r4" cx="400" cy="400" r="206"/><circle class="fr-r r5" cx="400" cy="400" r="150"/></g>' +
      '</svg>' +
      '<div class="fr-photo"><img src="assets/field/fd-home.jpg" alt=""><span class="fr-cap"><i></i>Their kitchen table · Walsh Family</span></div>' +
      '<div class="fr-phone"><div class="fr-scr">' +
        '<div class="fr-app"><span class="fr-lg"></span><b>Command Centre</b></div>' +
        '<small class="fr-who">Walsh Family · home visit</small><b class="fr-h" data-h>Recording</b>' +
        '<div class="fr-time" data-t>32:10</div><div class="fr-wave">' + bars + '</div>' +
        '<span class="fr-pill"><i></i><span data-p>Recording with consent</span></span>' +
        '<div class="fr-ctl"><span></span><span class="fr-stop"><u></u></span><span></span></div></div></div>' +
      '<div class="fr-cards">' +
        '<div class="fr-card"><span class="fr-ic">' + svg(SHIELD) + '</span><span class="fr-nm"><b>Consent first</b><small>Ann and Pat agreed before recording started</small></span><span class="fr-ok">Given</span></div>' +
        '<div class="fr-card"><span class="fr-ic">' + svg(PPL) + '</span><span class="fr-nm"><b>Will be filed to</b><small>Walsh Family · client record</small></span></div>' +
        '<div class="fr-card fr-after"><small class="fr-k">After the visit</small>' + AFTER.map(function (a, k) { return '<span class="fr-step" data-k="' + k + '"><i>' + svg(TICK) + '</i>' + a + '</span>'; }).join('') + '</div>' +
      '</div></div>';
  sc.appendChild(live);
  sc.classList.add('fr-on');
  function fit() { var w = sc.clientWidth; if (w) live.style.setProperty('--k', w / 1280); }
  fit();
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(sc); else addEventListener('resize', fit);

  var tEl = live.querySelector('[data-t]'), secs = 1930, st = 0, tm = null, clock = null, vis = false, on = true;
  function fmt(n) { return Math.floor(n / 60) + ':' + ('0' + n % 60).slice(-2); }
  /* 0 recording · 1 stopped and saved · 2–4 after-the-visit steps tick */
  function paint(s) {
    st = s; live.dataset.s = s;
    live.querySelector('[data-h]').textContent = s === 0 ? 'Recording' : 'Saved';
    live.querySelector('[data-p]').textContent = s === 0 ? 'Recording with consent' : 'Saved with consent';
    [].forEach.call(live.querySelectorAll('.fr-step'), function (e) { e.classList.toggle('in', +e.dataset.k < s - 1); });
    clearInterval(clock);
    if (s === 0 && !reduce) clock = setInterval(function () { secs++; tEl.textContent = fmt(secs); }, 1000);
  }
  function tick() { clearTimeout(tm); if (!vis || !on || reduce) return; var n = st >= 4 ? 0 : st + 1; if (n === 0) { secs = 1930; tEl.textContent = fmt(secs); } paint(n); tm = setTimeout(tick, n === 0 ? 5200 : n === 4 ? 3600 : 1100); }
  function sync() {
    var sel = document.querySelector('#close [data-shot][aria-selected="true"]');
    on = !sel || sel.dataset.shot === '0';
    sc.classList.toggle('fr-on', on);
    clearTimeout(tm); clearInterval(clock);
    if (on) { fit(); if (!reduce && vis) { secs = 1930; tEl.textContent = fmt(secs); paint(0); tm = setTimeout(tick, 5200); } }
  }
  [].forEach.call(document.querySelectorAll('#close [data-shot]'), function (b) { b.addEventListener('click', function () { setTimeout(sync, 0); }); });
  if (reduce) paint(4); else paint(0);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) {
    vis = es[0].isIntersecting; clearTimeout(tm);
    if (vis && on && !reduce) { paint(st); tm = setTimeout(tick, st === 0 ? 5200 : 1100); } else clearInterval(clock);
  }, { threshold: .3 }).observe(sc);
  else { vis = true; tm = setTimeout(tick, 5200); }
})();
