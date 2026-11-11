/* Prototype hero (10 Nov 2026, Lee): "Build the practice system your advice firm needs." The new way is AI and your team together.
   The old way: a made-up grey CRM, one for everyone. It shatters, the label flips to "The new way", and your Bunya snaps
   together from blocks like Lego: the base (Command Centre), the features, the apps, then your brand. Then it starts
   working: Bunya's AI prepares a review pack and a person approves it. Used by index-hero.html.
   One progress value P (0 to 1) drives everything. It moves forward on its own after a moment and faster when you
   scroll, never runs backwards, and lets go of the page when it finishes. Reduced motion shows the finished hero. */
(function () {
  var root = document.getElementById('hx'); if (!root) return;
  var Q = function (s) { return root.querySelector(s); }, QA = function (s) { return [].slice.call(root.querySelectorAll(s)); };
  var pin = Q('.hx-pin'), copy = Q('.hx-copy'), stage = Q('.hx-stage'), oldWrap = Q('.hx-oldwrap'), crm = Q('.hx-crm'), tag = Q('.hx-tag'),
      pill = Q('.hx-pill'), pillO = Q('.hx-pill .o'), pillN = Q('.hx-pill .n'), l1 = Q('h1 .l1'), l2 = Q('.hx-copy .sub'), /* the line under the headline lands as Bunya comes together */
      sub = Q('.hx-copy .sub'), btns = Q('.hx-copy .hb-btns'), from = Q('.hx-copy .from'),
      plate = Q('.hx-plate'), blocks = QA('.hx-blk'), ai = Q('.hx-ai'), replay = Q('.hx-replay');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── The old CRM, drawn piece by piece so it can break apart ─────────────────────────────── */
  function rep(n, f) { var s = ''; for (var i = 0; i < n; i++) s += f(i); return s; }
  var fi = 0;
  function field(l, v, cls) { var k = fi++, c = (/^▾/.test(v || '') ? 'dd' : '') + (k < 12 ? ' f' : ''); return '<label' + (cls ? ' class="' + cls + '"' : '') + '><em>' + l + '</em><u class="' + c + '" style="--i:' + k + '">' + (v || '').replace(/^▾/, '') + '</u></label>'; }
  var A = [['Title', '▾Mr'], ['First name', 'John', 'req'], ['Middle name', ''], ['Surname', 'SMITH', 'req'], ['Preferred', ''], ['Date of birth', '14/03/1961', 'req'], ['Gender', '▾Male'],
           ['Marital status', '▾Married'], ['Occupation', '▾-- Select --'], ['Employer', ''], ['Phone (H)', '07 0000 0000'], ['Phone (W)', ''], ['Mobile', ''], ['Fax', ''],
           ['Email', 'j.smith@email'], ['Email 2', ''], ['Address 1', '12 Example St'], ['Address 2', ''], ['Suburb', ''], ['State', '▾QLD'], ['Postcode', ''], ['Country', '▾Australia'],
           ['Residency', '▾-- Select --'], ['Smoker', '▾Unknown']];
  var B = [['Client type', '▾Individual (Legacy)'], ['Status', '▾Active - Review'], ['Segment', '▾B2'], ['Adviser', '▾ADV-014'], ['Servicing', '▾-- Select --'], ['Source', '▾Referral (old)'],
           ['Fee type', '▾Ongoing (v2)'], ['Fee code', 'FC-OSA-12'], ['Review month', '▾March'], ['Last review', '02/11/2023'], ['Risk profile', '▾Balanced (2019)'], ['FDS sent', ''],
           ['Opt-in date', ''], ['Renewal', ''], ['Entity link', '▾-- None --'], ['Partner ID', '004813'], ['Ext ref 1', ''], ['Ext ref 2', ''], ['Custom 14', ''], ['Custom 15', '']];
  var rows = [['00481-A', 'Task', 'Open', 'ADV-014', '03/09/2025', 'Annual review - overdue'], ['00481-B', 'Doc', 'Draft', 'PARA-02', '11/09/2025', 'SOA v3 FINAL (2).docx'],
              ['00481-C', 'Email', 'Sent', 'ADMIN', '12/09/2025', 'RE: RE: FW: Fee consent'], ['00481-D', 'Task', 'Waiting', 'ADV-014', '18/09/2025', 'Chase super statement'],
              ['00481-E', 'Note', '-', 'PARA-02', '22/09/2025', 'See attached spreadsheet'], ['00481-F', 'Workflow', 'Stalled', 'SYSTEM', '01/10/2025', 'Step 7 of 19'],
              ['00481-G', 'Doc', 'Final', 'ADMIN', '04/10/2025', 'FDS_2025_SMITH_v1.pdf'], ['00481-H', 'Task', 'Open', 'ADV-014', '09/10/2025', 'Update fact find (legacy)'],
              ['00481-J', 'Note', '-', 'ADV-014', '15/10/2025', 'Call back re insurance'], ['00481-K', 'Email', 'Failed', 'SYSTEM', '20/10/2025', 'Delivery failure: review pack']];
  var PIECES = [
    ['ttl', 0, 0, 1280, 34, '<span>Practice Manager Enterprise 11.4 - [Client: SMITH, John &amp; Mary (ID 004812)]</span><span><i>–</i><i>□</i><i>×</i></span>'],
    ['menu', 0, 34, 1280, 26, ['File', 'Edit', 'View', 'Clients', 'Opportunities', 'Workflow', 'Documents', 'Reports', 'Compliance', 'Tools', 'Window', 'Help'].map(function (w) { return '<span>' + w + '</span>'; }).join('')],
    ['tool', 0, 60, 1280, 40, rep(22, function () { return '<b></b>'; }) + '<s>Quick find (Ctrl+Shift+F)…</s><s>View: Default (Legacy) ▾</s>'],
    ['ban', 0, 100, 1280, 34, '<b>⚠</b><strong>Update available: 47 changes.</strong> Some screens and fields will move after you install it. Restart required.<span><u>Install now</u><u>Remind me later</u></span>'],
    ['tree', 0, 134, 200, 642, ['▾ Clients', '-Smith, John &amp; Mary', '-Entities (3)', '-Related parties', '▸ Contacts', '▸ Opportunities', '▾ Fact Find', '-Fact Find (v2)', '-Fact Find (legacy)', '-Risk Profiler (2019)', '▸ Workflow (19 steps)', '▸ Tasks', '▸ Documents', '▸ Templates', '▸ Reports', '▸ Commissions', '▸ Fee Disclosure', '▸ Compliance', '▸ Admin', '▸ Integrations', '▸ Archive'].map(function (t, i) { return '<span' + (t[0] === '-' ? ' class="s' + (i === 1 ? ' on' : '') + '"' : '') + '>' + t.replace(/^-/, '') + '</span>'; }).join('')],
    ['tabs', 200, 134, 1080, 30, ['Details', 'Contact', 'Entities', 'Assets', 'Liabilities', 'Income', 'Expenses', 'Insurance', 'Super', 'Estate', 'Goals', 'Risk', 'Notes', 'Docs', 'Audit', 'Custom'].map(function (t, i) { return '<span' + (i ? '' : ' class="on"') + '>' + t + '</span>'; }).join('')],
    ['form', 200, 164, 540, 300, A.map(function (f) { return field(f[0], f[1], f[2]); }).join('') + '<div class="ck"><span>Deceased</span><span>Do not contact</span><span>Paper only</span><span>Legacy import</span></div>'],
    ['form', 740, 164, 540, 300, B.map(function (f) { return field(f[0], f[1]); }).join('')],
    ['grid', 200, 464, 1080, 260, '<table><tr><th>Ref</th><th>Type</th><th>Status</th><th>Owner</th><th>Created</th><th>Subject</th><th>Linked</th><th>Due</th><th>Priority</th></tr>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '<td>Yes</td><td>-</td><td>Normal</td></tr>'; }).join('') + '</table>'],
    ['btns', 200, 724, 1080, 52, '<em>Last saved 14 minutes ago by ADMIN</em><span>Save</span><span>Save &amp; Close</span><span>Apply</span><span>Cancel</span>'],
    ['stat', 0, 776, 1280, 24, '<span>Ready</span><span>Record 1 of 4,812</span><span>Server: PRD-SQL-02</span><span>Build 11.4.2.881</span><span>Licence: 7 of 7 seats in use</span>'],
    ['spin', 470, 560, 330, 46, '<b></b>Loading related records… please wait'],
    ['modal', 430, 268, 420, 168, '<div class="mt">Record locked</div><div class="mb"><b>⚠</b><div>This record is being edited by another user (ADMIN).<br>Open it as read-only? Unsaved changes may be lost.</div></div><div class="mf"><span>Yes</span><span>No</span><span>Cancel</span></div>']
  ];
  crm.innerHTML = PIECES.map(function (p) {
    return '<div class="pc ' + p[0] + '" style="left:' + p[1] + 'px;top:' + p[2] + 'px;width:' + p[3] + 'px;height:' + p[4] + 'px">' + p[5] + '</div>';
  }).join('');
  var pcs = [].slice.call(crm.children);

  /* Steady "random" so it breaks the same way every time */
  var seed = 7; function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  var FALL = pcs.map(function (el, i) {
    var p = PIECES[i], cx = p[1] + p[3] / 2 - 640;
    return { el: el, dx: cx * .5 + (rnd() - .5) * 500, dy: 700 + rnd() * 900, r: (rnd() - .5) * 70, z: (rnd() - .3) * 300,
             s: i >= 11 ? 0 : [3, 5, 1, 0, 6, 2, 7, 8, 9, 4, 10][i] * .012 + (i === 3 ? 0 : .02) };
  });
  /* the pop-ups go first */
  FALL[11].s = 0; FALL[12].s = .005;


  /* ── The new way: a baseplate, then blocks that snap on ──────────────────────────────────── */
  var BLK = blocks.map(function (el, i) { return { el: el, s: .36 + i * .034 }; });
  var brandAt = BLK[BLK.length - 1].s + .06;

  /* ── Layout ─────────────────────────────────────────────────────────────── */
  var L = {};
  function rel(el) { return el.getBoundingClientRect().bottom - copy.getBoundingClientRect().top; }
  function layout() {
    var phone = innerWidth <= 700, vw = pin.clientWidth, ph = Math.max(phone ? 620 : 600, innerHeight - (phone ? 56 : 60)); /* the screen, not the pin, which grows when finished */
    [pill, l1, l2, sub, btns, from].forEach(function (e) { e.style.transform = ''; });
    var gap = phone ? 26 : 34;
    var yOld = rel(l1) + gap, yBuild = rel(l2) + gap, yFinal = rel(from) + (phone ? 30 : 40);
    var W = Math.min(1000, vw - 32, (ph - yBuild - (phone ? 150 : 28)) / .625);
    W = Math.max(W, Math.min(vw - 32, 300));
    var sF = 1; /* the board stays the size it was built at, so every block stays in view */
    L = { W: W, H: W * .625, yOld: yOld, yBuild: yBuild, yFinal: yFinal, sF: sF };
    stage.style.width = W + 'px'; stage.style.height = L.H + 'px';
    stage.style.fontSize = Math.max(9, W / 64).toFixed(2) + 'px';
    crm.style.transform = 'scale(' + (W / 1280) + ')';
    render();
  }

  /* ── Drawing one moment of the story ───────────────────────────────────── */
  function seg(p, a, b) { return Math.min(1, Math.max(0, (p - a) / (b - a))); }
  function out(t) { return 1 - Math.pow(1 - t, 3); }
  function inout(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function back(t) { var c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
  function show(el, t, y) { el.style.opacity = t; el.style.transform = 'translateY(' + ((y == null ? 18 : y) * (1 - t)) + 'px)'; }
  var P = 0;
  function render() {
    if (!L.W) return;
    /* 1. The old way: one CRM for everyone. the headline is there from the start */
    var flip = seg(P, .2, .26);
    pillO.style.opacity = 1 - flip; pillN.style.opacity = flip;
    /* 2. It tips back and shatters */
    var tilt = out(seg(P, .07, .17));
    oldWrap.style.transform = 'rotateX(' + (24 * tilt) + 'deg) scale(' + (1 - .07 * tilt) + ')';
    oldWrap.style.visibility = P > .5 ? 'hidden' : '';
    oldWrap.querySelector('.hx-old').style.boxShadow = P > .15 ? 'none' : '';
    tag.style.opacity = 1 - seg(P, .12, .16);
    FALL.forEach(function (f) {
      var s0 = .15 + f.s * .7, t = seg(P, s0, s0 + .16), e = t * t;
      f.el.style.transform = e ? 'translate3d(' + (f.dx * e) + 'px,' + (f.dy * e) + 'px,0) rotate(' + (f.r * e) + 'deg)' : '';
      f.el.style.opacity = 1 - seg(P, s0 + .08, s0 + .16);
    });
    /* 3. The new way: the base rises, then each block snaps on */
    var pr = out(seg(P, .25, .35));
    plate.style.opacity = pr; plate.style.transform = 'translateY(' + (70 * (1 - pr)) + 'px) scale(' + (.95 + .05 * pr) + ')';
    BLK.forEach(function (b, i) {
      var t = seg(P, b.s, b.s + .06), e = back(t), g = seg(P, b.s + .06, b.s + .12);
      b.el.style.opacity = seg(P, b.s, b.s + .015);
      b.el.style.transform = 'translateY(' + (-3.6 * (1 - e)) + 'em) scale(' + (1 + .08 * (1 - t)) + ')';
      var c = getComputedStyle(b.el).getPropertyValue('--c') || '#5EEAD4';
      b.el.style.boxShadow = t >= 1 && g < 1 ? 'inset 0 0 0 1px rgba(255,255,255,.1),0 0 0 ' + (2 + 6 * g).toFixed(1) + 'px ' + c.trim() + Math.round((1 - g) * 60 + 10).toString(16).padStart(2, '0') : '';
    });
    plate.classList.toggle('branded', P >= brandAt);
    /* "Bunya is the AI system you build around your firm." lands as it comes together */
    var l2t = out(seg(P, .5, .6));
    show(l2, l2t, 20);
    /* 4. It starts working: AI prepares, a person approves */
    root.classList.toggle('live', P >= .7);
    var at = out(seg(P, .74, .8));
    ai.style.opacity = at; ai.style.transform = 'translateY(' + (24 * (1 - at)) + 'px) scale(' + (.95 + .05 * at) + ')';
    ai.style.visibility = at > 0 ? 'visible' : 'hidden';
    ai.classList.toggle('ok', P >= .86);
    show(btns, out(seg(P, .82, .9)));
    show(from, out(seg(P, .86, .94)));
    btns.style.pointerEvents = P > .85 ? '' : 'none';
    /* the stage makes room for the words as they arrive */
    var m1 = inout(seg(P, .5, .6)), m2 = inout(seg(P, .78, .92));
    var y = L.yOld + (L.yBuild - L.yOld) * m1 + (L.yFinal - L.yBuild) * m2;
    stage.style.top = y + 'px';
    stage.style.transform = 'translateX(-50%) scale(' + (1 + (L.sF - 1) * m2) + ')';
    replay.classList.toggle('on', P >= 1 && !reduce);
  }

  /* ── Time and scroll ───────────────────────────────────────────────────── */
  var DELAY = 900, DUR = 9500, t0 = performance.now(), raf = 0, done = false;
  function scrollP() {
    var r = root.getBoundingClientRect(), span = root.offsetHeight - pin.offsetHeight;
    return span > 0 ? Math.min(1, Math.max(0, (parseFloat(getComputedStyle(pin).top) - r.top) / span)) : 1;
  }
  /* when it's finished, the hero grows to fit the whole board, so nothing is cut off */
  function settle() {
    root.classList.add('hx-done');
    var want = Math.ceil(L.yFinal + L.H + (innerWidth <= 700 ? 40 : 70));
    pin.style.height = want > innerHeight - 60 ? want + 'px' : '';
  }
  function letGo() {
    if (done) return;
    var r = root.getBoundingClientRect(), pinTop = parseFloat(getComputedStyle(pin).top);
    if (r.top >= pinTop - 2) { settle(); done = true; }
    else if (r.bottom <= 0) { var h = root.offsetHeight; settle(); scrollBy(0, -(h - root.offsetHeight)); done = true; }
  }
  function tick(now) {
    raf = 0;
    var auto = Math.max(0, (now - t0 - DELAY) / DUR);
    P = Math.max(P, Math.min(1, auto), done ? 1 : scrollP());
    render();
    if (P >= 1) letGo();
    if (P < 1 || !done) raf = requestAnimationFrame(tick);
  }
  function go() { if (!raf) raf = requestAnimationFrame(tick); }
  addEventListener('scroll', go, { passive: true });
  addEventListener('resize', function () { layout(); go(); });
  replay.addEventListener('click', function () {
    root.classList.remove('hx-done', 'live'); pin.style.height = ''; done = false; scrollTo(0, 0);
    P = 0; t0 = performance.now(); layout(); go();
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  layout();
  /* ?p=0.4 holds the story at one moment, for reviewing and screenshots */
  var hold = /[?&]p=([\d.]+)/.exec(location.search);
  if (hold) { P = Math.min(1, +hold[1]); settle(); done = true; layout(); }
  else if (reduce) { P = 1; settle(); done = true; layout(); }
  else go();
})();
