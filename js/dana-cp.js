/* Client Portal (client-portal.html), Dana 20 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-cp.css
   (+ the app frame, rows, pills and toast from css/dana-rp.css).
   1. The top film, rebuilt large so it fills its card: Alex approves the Shah family's SOA, it goes to their portal,
      Priya and Arjun sign, and the next steps are created.
   2. Up close, "Read and sign": Lee's screenshot becomes a live portal screen in the firm's brand (Aynub Financial,
      the made-up practice used across the site): the SOA with its cover photo and recommendations, and Tom signing
      on the page. The other three tabs keep Lee's screenshots. */
(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function svg(p) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; }
  var IC = {
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    send: '<path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    folder: '<path d="M3 7.5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    tick: '<path d="M6 12.5l4 4 8-9"/>',
    shield: '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/>',
    msg: '<path d="M4 5h16v11H8l-4 4z"/>'
  };
  function watch(el, fn) {
    if (!('IntersectionObserver' in window)) { fn(true); return; }
    new IntersectionObserver(function (es) { fn(es[0].isIntersecting); }, { threshold: .3 }).observe(el);
  }

  /* ---- 1. The top film, live ---- */
  (function () {
    var shot = document.querySelector('.dx-dev-feat');
    if (!shot) return;
    var vid = shot.querySelector('video');
    if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('cp-hidden'); }
    var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
      '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', IC.doc, IC.cal, '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
    var scene = document.createElement('div');
    scene.className = 'cp-scene';
    scene.setAttribute('role', 'img');
    scene.setAttribute('aria-label', 'Illustrative: the adviser approves the Shah family’s Statement of Advice, it is sent to their client portal, Priya and Arjun each sign it, and the implementation tasks and first review are created.');
    scene.innerHTML =
      '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 3 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
      '<div class="rf-main"><span class="rf-crumb">Advice Engine · Shah Family</span><h4>Review and sign</h4><span class="rf-sub">Statement of Advice · <span data-sub>ready for Alex to approve</span></span>' +
      '<div class="cp-grid"><div class="rf-card cp-sign"><div class="rf-ch"><b>Signing</b><small>E-signing in your brand</small></div>' +
        '<div class="rf-row cp-r" data-r="0"><span class="cp-doc">' + svg(IC.doc) + '</span><span class="rf-nm"><b>Approve the SOA</b><small data-s0>Reviewed by Alex · 2 edits</small></span><span class="cp-approve" data-btn><span>Approve</span><i>' + svg(IC.tick) + '</i></span></div>' +
        '<div class="rf-row cp-r" data-r="1"><span class="cp-ic">' + svg(IC.send) + '</span><span class="rf-nm"><b>Send to Priya and Arjun</b><small data-s1>Once Alex approves</small></span><span class="rf-pill soft" data-p1>Next</span></div>' +
        '<div class="rf-row cp-r" data-r="2"><img class="cp-av" src="assets/meeting/priya-sq.jpg" alt=""><span class="rf-nm"><b>Priya</b><small data-s2>Not sent yet</small></span><span class="rf-pill soft" data-p2>To sign</span></div>' +
        '<div class="rf-row cp-r" data-r="3"><img class="cp-av" src="assets/meeting/arjun-sq.jpg" alt=""><span class="rf-nm"><b>Arjun</b><small data-s3>Not sent yet</small></span><span class="rf-pill soft" data-p3>To sign</span></div>' +
        '<div class="cp-sigs"><span>Signatures</span><span class="cp-bar"><i data-bar></i></span><b><span data-n>0</span> of 2</b></div></div>' +
      '<div class="cp-side"><div class="rf-card cp-next"><div class="rf-ch"><b>Next</b><small>Created when they sign</small></div>' +
        '<div class="rf-row cp-nx" data-x="0"><span class="cp-ic">' + svg(IC.list) + '</span><span class="rf-nm"><b>Implementation tasks</b><small data-x0>When both have signed</small></span></div>' +
        '<div class="rf-row cp-nx" data-x="1"><span class="cp-ic">' + svg(IC.cal) + '</span><span class="rf-nm"><b>First review</b><small data-x1>When both have signed</small></span></div></div>' +
        '<div class="rf-card cp-file"><span class="cp-ic">' + svg(IC.folder) + '</span><span class="rf-nm"><b>Filed to their record</b><small data-f>The signed SOA, in SharePoint</small></span><span class="cp-fi">' + svg(IC.tick) + '</span></div></div></div></div></div>' +
      '<div class="rf-toast cp-toast" aria-hidden="true"><span class="rf-ol">' + svg(IC.tick) + '</span><span><small>Client Portal · now</small><b>Signed by Priya and Arjun</b></span></div>' +
      '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
    shot.appendChild(scene);
    shot.classList.add('rf-on');
    var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Client Portal · Shah Family';
    var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';
    function q(s) { return scene.querySelector(s); }
    var TXT = {
      sub: ['ready for Alex to approve', 'with Priya and Arjun to sign', 'with Arjun to sign', 'signed by both', 'signed by both'],
      s0: ['Reviewed by Alex · 2 edits', 'Approved by Alex · 10:02', 'Approved by Alex · 10:02', 'Approved by Alex · 10:02', 'Approved by Alex · 10:02'],
      s1: ['Once Alex approves', 'Sent to their portal · 10:02', 'Sent to their portal · 10:02', 'Sent to their portal · 10:02', 'Sent to their portal · 10:02'],
      s2: ['Not sent yet', 'Reading it now', 'Signed · 10:41', 'Signed · 10:41', 'Signed · 10:41'],
      s3: ['Not sent yet', 'Opened it · 10:05', 'Reading it now', 'Signed · 11:05', 'Signed · 11:05'],
      x0: ['When both have signed', 'When both have signed', 'When both have signed', 'When both have signed', 'Ready for the team'],
      x1: ['When both have signed', 'When both have signed', 'When both have signed', 'When both have signed', 'Booked in a year']
    };
    var st = -1, tm = null, playing = !reduce, vis = false;
    /* 0 ready to approve · 1 approved and sent · 2 Priya signed · 3 Arjun signed · 4 next steps created */
    function pill(el, s, ok) { el.className = 'rf-pill ' + (ok ? 'ok' : 'soft'); el.textContent = s; }
    function paint(s) {
      st = s; scene.dataset.s = s;
      q('[data-sub]').textContent = TXT.sub[s];
      ['s0', 's1', 's2', 's3', 'x0', 'x1'].forEach(function (k) { q('[data-' + k + ']').textContent = TXT[k][s]; });
      pill(q('[data-p1]'), s >= 1 ? 'Sent' : 'Next', s >= 1);
      pill(q('[data-p2]'), s >= 2 ? 'Signed' : 'To sign', s >= 2);
      pill(q('[data-p3]'), s >= 3 ? 'Signed' : 'To sign', s >= 3);
      var n = s >= 3 ? 2 : s >= 2 ? 1 : 0;
      q('[data-n]').textContent = n; q('[data-bar]').style.width = (n * 50) + '%';
      q('[data-btn] span').textContent = s >= 1 ? 'Approved' : 'Approve';
    }
    function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 4 ? 0 : st + 1); tm = setTimeout(tick, st === 4 ? 4200 : st === 0 ? 1800 : 1700); }
    var pb = scene.querySelector('.rf-pause');
    pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else clearTimeout(tm); });
    if (reduce) { paint(4); scene.classList.add('paused'); }
    else { paint(0); watch(scene, function (v) { vis = v; if (v) tm = setTimeout(tick, 1400); else clearTimeout(tm); }); }
  })();

  /* ---- 2. Up close: "Read and sign", live ---- */
  (function () {
    var sc = document.querySelector('#close .hb-view .sc');
    if (!sc) return;
    var SIG = '<svg class="cp-sig" viewBox="0 0 220 60" aria-hidden="true"><path pathLength="1" d="M8 44c10-24 18-30 22-14s6 20 14 4 12-22 16-8 2 22 10 8 10-18 16-6 6 14 14 2c5-8 9-8 12 0s8 10 16 0 10-8 14 0 10 6 18-2 14-6 22 2"/></svg>';
    var REC = [
      ['$1,500', 'a year less in fees', 'Move Tom’s super to a lower-cost fund', 'Similar investment options, lower fees.'],
      ['$400', 'a month', 'Salary sacrifice into Tom’s super', 'Within his concessional cap, and it lifts his retirement income.'],
      ['Kept', 'in place for now', 'Mia’s insurance stays inside super', 'Until her new cover is confirmed.']
    ];
    var live = document.createElement('div');
    live.className = 'cp-live';
    live.setAttribute('role', 'img');
    live.setAttribute('aria-label', 'Illustrative: Mia and Tom’s client portal, in their adviser’s brand, showing page 9 of their Statement of Advice with three recommendations. They tick that they have read it and had their questions answered, Mia has signed, and Tom signs on the page.');
    live.innerHTML =
      '<div class="cp-stage" aria-hidden="true">' +
        '<div class="cp-top"><img src="assets/aynub/aynub-lockup-financial-on-light.png" alt=""><nav><span>Home</span><span>Your plan</span><span class="on">Documents</span><span>Messages</span></nav><img class="cp-me" src="assets/meeting/mia.jpg" alt=""></div>' +
        '<div class="cp-body">' +
          '<div class="cp-soa">' +
            '<div class="cp-cover"><img src="assets/portal/cp-couple.jpg" alt=""><div><small>Statement of Advice</small><b>Mia and Tom’s advice</b><span>Prepared by Alex Reid · 5 November · 24 pages</span></div></div>' +
            '<div class="cp-pg"><div class="cp-pgh"><span><small>Page <b>9</b> of 24</small><b>Our recommendations</b></span><span class="cp-read"><i><u style="width:37.5%"></u></i>You’ve read 9 of 24 pages</span></div>' +
              '<div class="cp-recs">' + REC.map(function (r, k) {
                return '<div class="cp-rec" style="--d:' + (k * .12) + 's"><span class="cp-num"><b>' + r[0] + '</b><small>' + r[1] + '</small></span><span class="cp-rt"><em>' + (k + 1) + '</em><b>' + r[2] + '</b><small>' + r[3] + '</small></span></div>';
              }).join('') + '</div>' +
              '<div class="cp-pgf"><span>‹ Page 8</span><span class="cp-pdf">' + svg(IC.doc) + 'Download PDF</span><span>Page 10 ›</span></div></div></div>' +
          '<div class="cp-col">' +
            '<div class="cp-card cp-sg"><b class="cp-h">Sign your advice</b>' +
              '<span class="cp-chk" data-c="0"><i>' + svg(IC.tick) + '</i>I’ve read my Statement of Advice</span>' +
              '<span class="cp-chk" data-c="1"><i>' + svg(IC.tick) + '</i>My questions have been answered</span>' +
              '<div class="cp-who"><img src="assets/meeting/mia.jpg" alt=""><span><b>Mia</b><small>Signed · 10:42</small></span><span class="cp-ok">Signed</span></div>' +
              '<div class="cp-who cp-tom"><img src="assets/meeting/tom.jpg" alt=""><span><b>Tom</b><small data-tom>Ready to sign</small></span><span class="cp-btn" data-tb>Sign as Tom</span></div>' +
              '<div class="cp-pad">' + SIG + '<span>Tom · signing now</span></div>' +
              '<div class="cp-done"><i>' + svg(IC.tick) + '</i><span><b>Signed by you both</b><small>Alex has been told, and it’s filed with your record.</small></span></div></div>' +
            '<div class="cp-card cp-ask"><span class="cp-ai">' + svg(IC.msg) + '</span><span><b>A question for Alex?</b><small>Ask before you sign</small></span><span class="cp-msg">Message</span></div>' +
          '</div></div></div>';
    sc.appendChild(live);
    sc.classList.add('cp-on');
    function fit() { var w = sc.clientWidth; if (w) live.style.setProperty('--k', w / 1280); }
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(sc); else addEventListener('resize', fit);

    var st = -1, tm = null, vis = false, on = true;
    /* 0 opened · 1 read ticked · 2 questions ticked · 3 Tom signs on the page · 4 signed by both */
    function paint(s) {
      st = s; live.dataset.s = s;
      live.querySelector('[data-tom]').textContent = s >= 4 ? 'Signed · 10:44' : s === 3 ? 'Signing…' : 'Ready to sign';
      live.querySelector('[data-tb]').textContent = s >= 4 ? 'Signed' : 'Sign as Tom';
    }
    function tick() { clearTimeout(tm); if (!vis || !on || reduce) return; paint(st >= 4 ? 0 : st + 1); tm = setTimeout(tick, st === 4 ? 4600 : st === 3 ? 2400 : st === 0 ? 1600 : 1300); }
    function sync() {
      var sel = document.querySelector('#close [data-shot][aria-selected="true"]');
      on = !sel || sel.dataset.shot === '0';
      sc.classList.toggle('cp-on', on);
      clearTimeout(tm);
      if (on) { fit(); if (!reduce) { paint(0); tm = setTimeout(tick, 900); } }
    }
    [].forEach.call(document.querySelectorAll('#close [data-shot]'), function (b) { b.addEventListener('click', function () { setTimeout(sync, 0); }); });
    if (reduce) paint(4); else paint(0);
    watch(sc, function (v) { vis = v; if (v && on) { clearTimeout(tm); tm = setTimeout(tick, 900); } else clearTimeout(tm); });
  })();
})();
