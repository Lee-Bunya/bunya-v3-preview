/* Meeting Notes page (Dana, 19 Nov 2026): a live, readable version of the Shah family discovery meeting.
   Replaces the small-print film in the opening frame with a Teams call (real photos), large live captions,
   and Bunya's notes filling in as each point is said. Up close gets a callout that follows the tab.
   Runs after js/dana-feature.js. Styling: css/dana-meet.css. Photos: assets/meeting/ (illustrative people). */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot || !document.body.classList.contains('dx-feat')) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var P = {
    alex: { n: 'Alex Reid', r: 'Adviser', img: 'assets/meeting/alex.jpg' },
    priya: { n: 'Priya Shah', r: 'Client', img: 'assets/meeting/priya.jpg' },
    arjun: { n: 'Arjun Shah', r: 'Client', img: 'assets/meeting/arjun.jpg' }
  };
  /* who speaks, what they say (key words marked), which note it fills in */
  var SCRIPT = [
    ['priya', 'We’d like to <mark>stop work at 60</mark>, and Arjun at <mark>63</mark>.', 0],
    ['arjun', 'And we’re <mark>not sure about keeping the SMSF</mark>.', 1],
    ['alex', 'Let’s <mark>check your cover</mark> before your contract ends.', 2],
    ['alex', 'I’ll ask for your <mark>super statements</mark> today.', 3]
  ];
  var NOTES = [
    ['Their goals', 'Priya to retire at 60, Arjun at 63'],
    ['Their concerns', 'Whether to keep the SMSF'],
    ['What was agreed', 'Check their cover before Arjun’s contract ends'],
    ['Next steps', 'Super statements · fact find · strategy meeting']
  ];

  function tile(k) {
    return '<div class="mt-tile" data-p="' + k + '"><img src="' + P[k].img + '" alt="" loading="lazy">' +
      '<span class="mt-name"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>' + P[k].n + '</span></div>';
  }
  var scene = document.createElement('div');
  scene.className = 'mt-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: a Teams discovery meeting with Priya and Arjun Shah. As each point is said, Bunya writes it into the meeting notes: their goals, their concerns, what was agreed and the next steps.');
  scene.innerHTML =
    '<div class="mt-call" aria-hidden="true">' +
      '<div class="mt-top"><span class="mt-t">T</span><b>Discovery · Shah Family</b><span class="mt-rec"><i></i>Recording with consent</span><span class="mt-time">51:59</span><span class="mt-leave">Leave</span></div>' +
      '<div class="mt-grid">' + tile('alex') + tile('priya') + tile('arjun') + '</div>' +
      '<div class="mt-cap"><span class="mt-cap-k">Live captions</span><div class="mt-line mt-prev"><img alt=""><span><b></b><q></q></span></div><div class="mt-line mt-cur"><img alt=""><span><b></b><q></q></span></div></div>' +
    '</div>' +
    '<div class="mt-notes" aria-hidden="true">' +
      '<div class="mt-nh"><span class="mt-logo"></span><span><b>Noted by Bunya</b><small><i></i>Listening</small></span></div>' +
      '<ol>' + NOTES.map(function (x, i) { return '<li data-i="' + i + '"><span class="k">' + x[0] + '</span><span class="v">' + x[1] + '</span></li>'; }).join('') + '</ol>' +
      '<div class="mt-ready"><span class="mt-chk">✓</span><span><b>File note, email and 3 tasks</b><small>Ready for Alex to check</small></span></div>' +
    '</div>' +
    '<button type="button" class="mt-pause" aria-label="Pause the meeting animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  var vid = shot.querySelector('video');
  if (vid) { vid.pause(); vid.removeAttribute('autoplay'); vid.removeAttribute('src'); vid.load(); vid.classList.add('mt-hidden'); }  /* the film is replaced, so don't download it */
  shot.appendChild(scene);
  shot.classList.add('mt-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Meeting Notes · Live in Teams';
  var illus = shot.nextElementSibling; if (illus && illus.classList.contains('dx-illus')) illus.lastChild.textContent = 'Illustrative meeting · example people and data';

  var tiles = scene.querySelectorAll('.mt-tile'), lis = scene.querySelectorAll('.mt-notes li');
  var prev = scene.querySelector('.mt-prev'), line = scene.querySelector('.mt-cur'), lImg = line.querySelector('img'), lName = line.querySelector('b'), lText = line.querySelector('q');
  var ready = scene.querySelector('.mt-ready'), status = scene.querySelector('.mt-nh small');
  var step = -1, timer = null, playing = !reduce, visible = false;

  function show(i) {
    step = i;
    if (i >= SCRIPT.length) {               // wrap-up: notes complete
      ready.classList.add('on'); status.lastChild.textContent = 'Meeting ended · draft ready';
      [].forEach.call(tiles, function (t) { t.classList.remove('talk'); });
      return;
    }
    var s = SCRIPT[i], who = P[s[0]];
    [].forEach.call(tiles, function (t) { t.classList.toggle('talk', t.dataset.p === s[0]); });
    if (i > 0 && lText.innerHTML) {          // the last line moves up, dimmed
      prev.querySelector('img').src = lImg.src; prev.querySelector('b').textContent = lName.textContent; prev.querySelector('q').innerHTML = lText.innerHTML;
      prev.classList.add('on');
    } else prev.classList.remove('on');
    line.classList.remove('on'); void line.offsetWidth;
    lImg.src = who.img; lName.textContent = who.n; lText.innerHTML = s[1];
    line.classList.add('on');
    [].forEach.call(lis, function (li, k) { li.classList.toggle('on', k <= s[2]); li.classList.toggle('new', k === s[2]); });
    ready.classList.remove('on'); status.lastChild.textContent = 'Listening';
  }
  function reset() { [].forEach.call(lis, function (li) { li.classList.remove('on', 'new'); }); ready.classList.remove('on'); }
  function tick() {
    clearTimeout(timer);
    if (!playing || !visible) return;
    var next = step + 1;
    if (next > SCRIPT.length) { reset(); next = 0; }
    show(next);
    timer = setTimeout(tick, next >= SCRIPT.length ? 5200 : 3400);
  }
  var pb = scene.querySelector('.mt-pause');
  pb.addEventListener('click', function () {
    playing = !playing; scene.classList.toggle('paused', !playing);
    pb.setAttribute('aria-label', playing ? 'Pause the meeting animation' : 'Play the meeting animation');
    if (playing) tick(); else clearTimeout(timer);
  });
  if (reduce) { show(SCRIPT.length - 1); show(SCRIPT.length); scene.classList.add('paused'); }
  else {
    show(0);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) timer = setTimeout(tick, 2600); else clearTimeout(timer); }, { threshold: 0.3 }).observe(scene);
    } else { visible = true; timer = setTimeout(tick, 2600); }
  }

  /* Up close: a callout that follows the tab, overhanging the frame */
  var close = document.querySelector('.dx-dev-close');
  if (close) {
    var TIPS = [
      ['play', '22:16', 'Tap any point to hear the moment it was said.'],
      ['task', '3 actions', 'Each with a named owner and a due date.'],
      ['mail', 'Your letterhead', 'Written from what was agreed, in your voice.'],
      ['pen', 'Adviser approves', 'Only the approved version is filed.']
    ];
    var ic = {
      play: '<path d="M8 5.5v13l10.5-6.5z"/>',
      task: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12.2l2.4 2.4 4.6-4.8"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
      pen: '<path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'
    };
    var tip = document.createElement('div');
    tip.className = 'mt-tip';
    tip.setAttribute('aria-hidden', 'true');
    close.appendChild(tip);
    var chip = document.createElement('div');
    chip.className = 'mt-chip';
    chip.setAttribute('aria-hidden', 'true');
    chip.innerHTML = '<i></i>Drafted by Bunya · waiting for Alex';
    close.appendChild(chip);
    function setTip(i) {
      var t = TIPS[i] || TIPS[0];
      tip.classList.remove('in'); void tip.offsetWidth;
      tip.innerHTML = '<span class="mt-tip-i"><svg viewBox="0 0 24 24">' + ic[t[0]] + '</svg></span><span><b>' + t[1] + '</b><small>' + t[2] + '</small></span>';
      tip.classList.add('in');
    }
    setTip(0);
    [].forEach.call(document.querySelectorAll('#close [data-shot]'), function (b) {
      b.addEventListener('click', function () { setTip(+b.dataset.shot); chip.lastChild.textContent = ['Drafted by Bunya · waiting for Alex', 'Proposed by Bunya · Alex accepts', 'Drafted by Bunya · Alex sends it', 'Approved by Alex · filed'][+b.dataset.shot] || ''; });
    });
  }
})();

/* Up close, live (Dana, 19 Nov 2026): all four tabs as working screens, following the same Shah family meeting
   as the top of the page. File note: click a point to hear the moment it was said. Actions: accept them into tasks.
   Follow-up: the email, written from what was agreed. Approve: checked, approved, filed. Lee's screenshots stay
   in the page underneath for anyone without scripts. */
(function () {
  'use strict';
  var sc = document.querySelector('#close .dx-dev-close .sc');
  if (!sc) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PPL = {
    priya: ['Priya Shah', 'assets/meeting/priya-sq.jpg'], arjun: ['Arjun Shah', 'assets/meeting/arjun-sq.jpg'],
    alex: ['Alex Reid', 'assets/meeting/alex-sq.jpg']
  };
  function av(k) { return '<img src="' + PPL[k][1] + '" alt="" title="' + PPL[k][0] + '">'; }
  function top(title, sub, right) {
    return '<div class="fn-top"><div><span class="fn-crumb">Clients · Shah Family · ' + title.split(' · ')[0] + '</span><h4>' + title + '</h4>' +
      '<span class="fn-sub"><span class="fn-avs">' + av('alex') + av('priya') + av('arjun') + '</span>' + sub + '</span></div><div class="fn-acts">' + right + '</div></div>';
  }
  var panels = [];
  function panel(html) { var d = document.createElement('div'); d.className = 'fn'; d.innerHTML = html; d.hidden = true; sc.appendChild(d); panels.push(d); return d; }
  var timers = [];

  /* ---- 1. File note ---- */
  var ROWS = [
    ['Goals', 'Priya to retire at 60, Arjun at 63.', '12:40', .24, [['priya', 'We’d like to <mark>stop work at 60</mark>, and Arjun at <mark>63</mark>.']]],
    ['', 'A long trip in the first year of retirement.', '18:05', .35, [['arjun', 'That first year, we’d <mark>love a long trip</mark>.']]],
    ['Concerns', 'Whether to keep the SMSF.', '22:16', .43, [['arjun', 'And we’re <mark>not sure about keeping the SMSF</mark>.'], ['alex', 'Let’s put the <mark>costs side by side</mark> before you decide.']]],
    ['Discussed', 'Arjun’s contract ends in June. Their cover needs checking.', '27:51', .54, [['alex', 'Let’s <mark>check your cover</mark> before your contract ends.']]],
    ['Agreed next steps', 'Priya sends the super statements. Alex checks their cover. Client services books the strategy meeting.', '49:30', .95, [['priya', 'I can <mark>send the super statements</mark> this week.']]]
  ];
  var CHECKS = [['Names and dates', 1], ['Decisions match the conversation', 3], ['Next steps have owners', 4]];
  var bars = ''; for (var i = 0; i < 110; i++) { var h = 22 + Math.round(70 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * .43))); bars += '<i style="height:' + h + '%"></i>'; }
  var fn = panel(
    top('File note · Discovery meeting', 'Alex Reid with Priya and Arjun Shah · Thursday 9:30 · 52 min',
      '<span class="fn-draft"><i></i>Draft · <b data-left>3</b> to check</span><span class="fn-btn">Edit</span><span class="fn-btn dark">Approve</span>') +
    '<div class="fn-body"><div class="fn-note" role="group" aria-label="File note points. Choose one to hear the moment it was said.">' + ROWS.map(function (r, i) {
      return '<button type="button" class="fn-row" data-i="' + i + '"><span class="fn-sec">' + r[0] + '</span><span class="fn-pt">' + r[1] + '</span><span class="fn-ts"><i aria-hidden="true">▶</i>' + r[2] + '</span></button>';
    }).join('') + '<div class="fn-foot"><span><b>5 points</b>, each linked to the recording</span><span class="fn-files"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7.5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>Files to Shah Family · SharePoint</span></div></div>' +
    '<div class="fn-side"><div class="fn-rec" aria-live="polite"><div class="fn-rec-h"><span class="fn-rec-i"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg></span>' +
      '<span><b>From the recording</b><small data-ts>12:40 / 52:04</small></span><span class="fn-teams">Teams</span></div><div class="fn-wave" aria-hidden="true">' + bars + '<span class="fn-head"></span></div><div class="fn-said"></div></div>' +
    '<div class="fn-chk"><div class="fn-chk-h"><b>Before you approve</b><span><b data-done>0</b> of 3</span></div><span class="fn-prog"><i></i></span>' +
      CHECKS.map(function (c, i) { return '<div class="fn-c"><span class="fn-tick"></span>' + c[0] + '<em>Check</em></div>'; }).join('') + '</div></div></div>');
  var rows = fn.querySelectorAll('.fn-row'), said = fn.querySelector('.fn-said'), ts = fn.querySelector('[data-ts]'), head = fn.querySelector('.fn-head');
  var waveBars = fn.querySelectorAll('.fn-wave i'), checks = fn.querySelectorAll('.fn-c'), prog = fn.querySelector('.fn-prog i');
  var seen = {}, cur = -1, auto = !reduce;
  function pick(i) {
    cur = i; seen[i] = 1;
    var r = ROWS[i];
    [].forEach.call(rows, function (b, k) { b.classList.toggle('on', k === i); b.classList.toggle('seen', !!seen[k] && k !== i); b.setAttribute('aria-current', k === i ? 'true' : 'false'); });
    ts.textContent = r[2] + ' / 52:04'; head.style.left = (r[3] * 100) + '%';
    var cut = Math.round(r[3] * waveBars.length);
    [].forEach.call(waveBars, function (b, k) { b.classList.toggle('pl', k < cut); });
    said.classList.remove('in'); void said.offsetWidth;
    said.innerHTML = r[4].map(function (q) { return '<div class="fn-q">' + av(q[0]) + '<span><b>' + PPL[q[0]][0] + '</b>' + q[1] + '</span></div>'; }).join('');
    said.classList.add('in');
    var done = 0, n = Object.keys(seen).length;
    CHECKS.forEach(function (c, k) {
      var ok = Object.keys(seen).some(function (x) { return +x >= c[1]; }) || (k === 0 && n > 1);
      checks[k].classList.toggle('ok', ok); checks[k].querySelector('em').textContent = ok ? 'Done' : 'Check'; if (ok) done++;
    });
    fn.querySelector('[data-done]').textContent = done; fn.querySelector('[data-left]').textContent = 3 - done; prog.style.width = (done / 3 * 100) + '%';
  }
  [].forEach.call(rows, function (b) { b.addEventListener('click', function () { auto = false; pick(+b.dataset.i); }); });
  pick(0);
  function stepFn() { if (!auto) return false; if (cur >= ROWS.length - 1) { seen = {}; pick(0); } else pick(cur + 1); return true; }

  /* ---- 2. Actions ---- */
  var ACTS = [
    ['Send the latest super statements', 'priya', 'Priya Shah', 'Client', 'Fri 22 Nov', '49:30'],
    ['Check their insurance cover before Arjun’s contract ends', 'alex', 'Alex Reid', 'Adviser', 'Thu 28 Nov', '27:51'],
    ['Book the strategy meeting', '', 'Jess', 'Client services', 'Mon 25 Nov', '50:12']
  ];
  var ac = panel(
    top('Actions · Discovery meeting', 'Proposed by Bunya from what was agreed · accept them to make tasks', '<span class="fn-draft"><i></i><b data-open>3</b> to accept</span>') +
    '<div class="fn-body ac-body"><div class="ac-list">' + ACTS.map(function (a, i) {
      return '<div class="ac-card" data-i="' + i + '"><span class="ac-n">' + (i + 1) + '</span><div class="ac-t"><b>' + a[0] + '</b>' +
        '<span class="ac-meta"><span class="ac-own">' + (a[1] ? av(a[1]) : '<u>CS</u>') + a[2] + ' <small>' + a[3] + '</small></span><span class="ac-due">Due ' + a[4] + '</span><span class="fn-ts"><i aria-hidden="true">▶</i>' + a[5] + '</span></span></div>' +
        '<button type="button" class="ac-btn" data-i="' + i + '">Accept</button></div>';
    }).join('') + '</div>' +
    '<div class="ac-side"><div class="ac-sum"><span class="ac-big"><b data-acc>0</b><small>of 3</small></span><span><b>Tasks created</b>Accepted actions land in each person’s task list, linked to the Shah family.</span></div>' +
      '<div class="ac-tasks"><span class="ac-tasks-h">Alex’s tasks · this week</span><div data-tasks><p class="ac-empty">Accepted actions appear here.</p></div></div></div></div>');
  var acc = {};
  function paintAc() {
    var n = 0, list = '';
    ACTS.forEach(function (a, i) {
      var on = !!acc[i]; if (on) { n++; list += '<div class="ac-task"><span class="fn-tick"></span><span>' + a[0] + '<small>' + a[2] + ' · due ' + a[4] + '</small></span></div>'; }
      var card = ac.querySelector('.ac-card[data-i="' + i + '"]'); card.classList.toggle('ok', on);
      var b = card.querySelector('.ac-btn'); b.textContent = on ? '✓ Task created' : 'Accept'; b.setAttribute('aria-pressed', String(on));
    });
    ac.querySelector('[data-acc]').textContent = n; ac.querySelector('[data-open]').textContent = 3 - n;
    ac.querySelector('[data-tasks]').innerHTML = list || '<p class="ac-empty">Accepted actions appear here.</p>';
  }
  var acAuto = !reduce;
  ac.addEventListener('click', function (e) { var b = e.target.closest('.ac-btn'); if (!b) return; acAuto = false; acc[b.dataset.i] = !acc[b.dataset.i]; paintAc(); });
  if (reduce) { acc = { 0: 1, 1: 1 }; }
  paintAc();
  function stepAc() { if (!acAuto) return false; var k = Object.keys(acc).length; if (k >= 3) acc = {}; else acc[k] = 1; paintAc(); return true; }

  /* ---- 3. Follow-up ---- */
  var FU = [
    ['Priya will send the latest super statements this week.', '49:30'],
    ['I’ll check your insurance cover before Arjun’s contract ends.', '27:51'],
    ['Jess from our team will be in touch to book your strategy meeting.', '50:12']
  ];
  var fu = panel(
    top('Follow-up · Email draft', 'Written by Bunya from what was agreed · on your letterhead', '<span class="fn-btn">Edit</span><span class="fn-btn dark">Send</span>') +
    '<div class="fn-body fu-body"><div class="fu-mail"><div class="fu-hd"><span class="fu-logo">Your logo</span><span class="fu-firm">Your firm’s letterhead</span></div>' +
      '<div class="fu-fields"><span><em>To</em>Priya Shah, Arjun Shah</span><span><em>From</em>Alex Reid</span><span><em>Subject</em><b>Thanks for today, and your next steps</b></span></div>' +
      '<div class="fu-txt"><p>Hi Priya and Arjun,</p><p>Thanks for your time today. Here’s what we agreed:</p><ul>' + FU.map(function (f, i) { return '<li data-i="' + i + '">' + f[0] + '</li>'; }).join('') + '</ul>' +
      '<p>We’ll look at the SMSF costs side by side before your strategy meeting.</p><p>Kind regards,<br>Alex</p></div></div>' +
    '<div class="fu-side"><div class="fu-from"><span class="ac-tasks-h">Written from the meeting</span>' + FU.map(function (f, i) {
      return '<div class="fu-link" data-i="' + i + '"><span class="fn-ts"><i aria-hidden="true">▶</i>' + f[1] + '</span><span>' + ['Agreed next steps', 'Discussed', 'Agreed next steps'][i] + '</span></div>';
    }).join('') + '</div><div class="fu-note"><span class="fu-note-i">✓</span><span><b>Nothing is sent</b>until Alex reads it and presses Send.</span></div></div></div>');
  var fuI = 0;
  function paintFu() { [].forEach.call(fu.querySelectorAll('[data-i]'), function (e) { e.classList.toggle('on', +e.dataset.i === fuI); }); }
  paintFu();
  function stepFu() { if (reduce) return false; fuI = (fuI + 1) % FU.length; paintFu(); return true; }

  /* ---- 4. Approve ---- */
  var TL = [
    ['Drafted by Bunya', '10:21', 'When the meeting ended'],
    ['Checked by Alex Reid', '10:29', 'Two small edits'],
    ['Approved', '10:30', 'Alex Reid'],
    ['Filed to the Shah family', '10:30', 'Recording, transcript and the approved note, in SharePoint']
  ];
  var ap = panel(
    top('Approve · File note', 'Discovery meeting · Thursday 9:30', '<span class="ap-state" data-state>Waiting for Alex</span>') +
    '<div class="fn-body ap-body"><div class="ap-card"><span class="ac-tasks-h">Before you approve</span>' +
      CHECKS.map(function (c) { return '<div class="fn-c ok"><span class="fn-tick"></span>' + c[0] + '<em>Done</em></div>'; }).join('') +
      '<button type="button" class="ap-btn">Approve the file note</button><p class="ap-small">Only the approved version is kept. Drafts are discarded.</p></div>' +
    '<ol class="ap-tl">' + TL.map(function (t, i) { return '<li data-i="' + i + '"><span class="ap-dot"></span><span><b>' + t[0] + '</b><small>' + t[1] + ' · ' + t[2] + '</small></span></li>'; }).join('') + '</ol></div>');
  var apI = 1;
  function paintAp() {
    [].forEach.call(ap.querySelectorAll('.ap-tl li'), function (li, k) { li.classList.toggle('done', k <= apI); li.classList.toggle('now', k === apI); });
    var ok = apI >= 2;
    ap.querySelector('.ap-btn').classList.toggle('ok', ok); ap.querySelector('.ap-btn').textContent = ok ? '✓ Approved' : 'Approve the file note';
    ap.querySelector('[data-state]').textContent = ok ? 'Approved · filed' : 'Waiting for Alex'; ap.querySelector('[data-state]').classList.toggle('ok', ok);
  }
  var apAuto = !reduce;
  ap.querySelector('.ap-btn').addEventListener('click', function () { apAuto = false; apI = apI >= 2 ? 1 : 3; paintAp(); });
  if (reduce) apI = 3;
  paintAp();
  function stepAp() { if (!apAuto) return false; apI = apI >= 3 ? 1 : apI + 1; paintAp(); return true; }

  /* ---- which tab is showing, and the gentle autoplay ---- */
  var steps = [stepFn, stepAc, stepFu, stepAp], tabI = 0, visible = false, t = null;
  sc.classList.add('fn-on');
  function show() {
    var sel = document.querySelector('#close [data-shot][aria-selected="true"]');
    tabI = sel ? +sel.dataset.shot : 0;
    panels.forEach(function (p, k) { p.hidden = k !== tabI; });
    loop();
  }
  function loop() { clearTimeout(t); if (!visible || reduce) return; t = setTimeout(function () { if (steps[tabI]()) loop(); }, tabI === 0 ? 4200 : 2600); }
  [].forEach.call(document.querySelectorAll('#close [data-shot]'), function (b) { b.addEventListener('click', function () { setTimeout(show, 0); }); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) loop(); else clearTimeout(t); }, { threshold: .4 }).observe(sc);
  show();
})();

/* Meeting Notes, from the design review (19 Nov 2026):
   - the three small points repeated How it works straight after it, so they're hidden here
   - Questions gets the rest of what the page already says, so it isn't a two-question stub. Every answer is taken
     from this page or the Field Notes page; nothing new is claimed. */
(function () {
  'use strict';
  var pts = document.querySelector('.pp-points');
  if (pts) pts.classList.add('dx-hide');
  var faq = document.querySelector('#faq .hb-faq');
  if (!faq) return;
  var MORE = [
    ['Where are the recording and the note kept?', 'In your firm’s SharePoint, filed to the client with the transcript and the approved note, so you can find them later from the client’s record.'],
    ['Can the adviser change the note?', 'Yes. The adviser edits it, approves it or sends it back. Nothing is filed or sent until it’s approved, and only the approved version is kept.'],
    ['What about meetings that aren’t on Teams?', 'Field Notes records meetings at the client’s home or business, right in Command Centre, with the client’s consent. It’s $19 a month.'],
    ['What does it cost?', 'Meeting Notes is included with Command Centre, from $3 per account a month.']
  ];
  MORE.forEach(function (q) {
    var d = document.createElement('details');
    d.innerHTML = '<summary>' + q[0] + '<i></i></summary><p>' + q[1] + '</p>';
    faq.appendChild(d);
  });
})();
