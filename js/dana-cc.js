/* Command Centre page, brought up to the bunya.ai review design (Dana, 19 Nov 2026).
   Same visual experience as the live Command Centre page from the review, built from v3's own concept screens
   (assets/cc/*.webp, illustrative, never the real UI). Lee's markup is untouched: everything here is added on load.
   1. Hero screen in a device frame, with two floating cards and an "illustrative screens" note.
   2. "See the work" tour: five screens behind numbered tabs (click, arrow keys, or it moves on by itself until you touch it).
   3. "Prepared by Bunya. Decided by you." four-step approval flow, plus the AI workflows it covers.
   4. Microsoft 365 apps row in the trust section, and "Your process. Not a template." stage chips.
   Styling: css/dana-cc.css. Runs before js/dana-ux.js so the pale bands alternate across the new sections too. */
(function () {
  'use strict';
  var main = document.querySelector('main');
  if (!main) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var I = {
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
    look: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M8.5 11.2l1.8 1.8 3.4-3.6"/>',
    pen: '<path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    go: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'
  };
  function svg(k) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + I[k] + '</svg>'; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  var BAR = function (label) {
    return '<div class="dx-dev-bar" aria-hidden="true"><i></i><i></i><i></i><span><img src="assets/8b9c16f32c12.svg" alt="">' + label + '</span></div>';
  };

  /* 1. Hero: device frame + floating cards */
  var shot = document.querySelector('.co-hero-shot');
  if (shot) {
    shot.classList.add('dx-dev', 'dx-dev-hero');
    shot.insertAdjacentHTML('afterbegin', BAR('Bunya Command Centre'));
    /* Same numbers as the screen's "Advice in progress" row: households at each stage, 17 in all */
    var bars = [[3, 'Discovery'], [4, 'Fact find'], [3, 'Strategy'], [2, 'Draft SoA'], [3, 'Sign'], [2, 'Implement']];
    shot.appendChild(el('div', 'dx-float dx-float-l', '<span class="dx-float-h"><i>' + svg('chart') + '</i>Advice in progress</span>' +
      '<b>17 <small>households, by stage</small></b><span class="dx-mini">' +
      bars.map(function (b) { return '<span' + (b[0] === 4 ? ' class="most"' : '') + '>' + b[1] + '<i style="--w:' + (b[0] * 25) + '%"></i><b>' + b[0] + '</b></span>'; }).join('') + '</span>'));
    shot.appendChild(el('div', 'dx-float dx-float-r', '<span class="dx-float-h"><i>' + svg('pen') + '</i>Ready for you to approve</span>' +
      '<span class="dx-appr"><b>File note · Patel Family</b><small>Prepared by Bunya from this morning’s recording</small></span>' +
      '<span class="dx-appr-btns" aria-hidden="true"><em class="yes">✓ Approve</em><em>Edit</em></span>'));
    shot.insertAdjacentElement('afterend', el('p', 'dx-illus', '<img src="assets/8b9c16f32c12.svg" alt="">Illustrative screens · example data'));
  }

  /* 2. The tour */
  var hero = document.querySelector('.sx-hero');
  var TOUR = [
    ['today', 'Your working day', 'Meetings, tasks and work waiting for approval, in one view.', 'Command Centre start-of-day view'],
    ['record', 'The client record', 'The whole household, with documents, meetings and history together.', 'Harper Family client record'],
    ['pipeline', 'The advice pipeline', 'Every account from first meeting to implemented advice, and who owns the next step.', 'Advice pipeline board'],
    ['email', 'Your inbox', 'Email filed to the client record as it arrives, inside your own Outlook.', 'Inbox with the client record beside the email'],
    ['reports', 'The practice picture', 'Advice in progress, reviews on time, and where work is waiting.', 'Practice reports']
  ];
  if (hero) {
    var tour = el('section', 'sx-sec dx-tour');
    tour.setAttribute('aria-labelledby', 'dx-tour-h');
    tour.innerHTML = '<div class="sx-head dx-cc-rv"><span class="sx-k">A day in Command Centre</span>' +
      '<h2 id="dx-tour-h">See the work. <span>Know the next step.</span></h2></div>' +
      '<div class="dx-tabs dx-cc-rv" role="tablist" aria-label="Command Centre screens">' + TOUR.map(function (t, i) {
        return '<button type="button" role="tab" id="dx-tab-' + i + '" aria-controls="dx-tour-panel" aria-selected="' + (i ? 'false' : 'true') + '" tabindex="' + (i ? -1 : 0) + '">' +
          '<span class="n">0' + (i + 1) + '</span>' + t[1] + '<i class="dx-prog" aria-hidden="true"></i></button>';
      }).join('') + '</div>' +
      '<figure class="dx-dev dx-dev-tour dx-cc-rv" id="dx-tour-panel" role="tabpanel" aria-labelledby="dx-tab-0">' + BAR('<span data-label>Your working day</span>') +
      '<div class="dx-dev-scr">' + TOUR.map(function (t, i) {
        return '<img src="assets/cc/' + t[0] + '.webp" alt="' + t[3] + ' (illustrative)" width="2560" height="1600"' + (i ? ' loading="lazy"' : '') + ' class="' + (i ? '' : 'on') + '">';
      }).join('') + '</div></figure>' +
      '<p class="dx-tour-cap" aria-live="polite">' + TOUR[0][2] + '</p>';
    hero.insertAdjacentElement('afterend', tour);

    var tabs = [].slice.call(tour.querySelectorAll('[role=tab]')), imgs = tour.querySelectorAll('.dx-dev-scr img');
    var cap = tour.querySelector('.dx-tour-cap'), lab = tour.querySelector('[data-label]'), panel = tour.querySelector('[role=tabpanel]');
    var cur = 0, auto = !reduce, timer = null, visible = false, hover = false;
    function show(i, focus) {
      cur = (i + TOUR.length) % TOUR.length;
      tabs.forEach(function (t, k) { var on = k === cur; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; t.classList.remove('run'); });
      [].forEach.call(imgs, function (m, k) { m.classList.toggle('on', k === cur); });
      cap.textContent = TOUR[cur][2]; lab.textContent = TOUR[cur][1];
      panel.setAttribute('aria-labelledby', 'dx-tab-' + cur);
      if (focus) tabs[cur].focus();
      schedule();
    }
    function schedule() {
      clearTimeout(timer);
      if (!auto || !visible || hover) return;
      void tabs[cur].offsetWidth; tabs[cur].classList.add('run');
      timer = setTimeout(function () { show(cur + 1); }, 7000);
    }
    function stop() { auto = false; clearTimeout(timer); tour.classList.add('manual'); tabs.forEach(function (t) { t.classList.remove('run'); }); }
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { stop(); show(k); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (e.key === 'Home') { stop(); show(0, true); e.preventDefault(); }
        else if (e.key === 'End') { stop(); show(TOUR.length - 1, true); e.preventDefault(); }
        else if (d) { stop(); show(cur + d, true); e.preventDefault(); }
      });
    });
    panel.addEventListener('mouseenter', function () { hover = true; clearTimeout(timer); tabs[cur].classList.remove('run'); });
    panel.addEventListener('mouseleave', function () { hover = false; schedule(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) schedule(); else { clearTimeout(timer); tabs[cur].classList.remove('run'); } }, { threshold: 0.35 }).observe(panel);
    }
  }

  /* 3. Prepared by Bunya. Decided by you. (before "Built to be checked") */
  var trustH = document.getElementById('h-trust');
  var trust = trustH && trustH.closest('section');
  if (trust) {
    var STEPS = [
      ['spark', 'Prepared', 'Bunya drafts the SoA request pack.', 'Bunya', ''],
      ['look', 'Checked', 'The adviser reviews it and corrects anything wrong.', 'Adviser', ''],
      ['pen', 'Approved', 'The adviser signs it off for paraplanning.', 'Adviser', 'gold'],
      ['go', 'Moved on', 'Paraplanning picks it up, with the record kept.', 'Bunya', '']
    ];
    var WF = [['Meeting file notes', 'meeting-notes.html'], ['Fact-find drafts', 'fact-find.html'], ['SoA request packs', 'statements-of-advice.html'], ['Review preparation', 'review-packs.html']];
    var flow = el('section', 'sx-sec dx-flow');
    flow.setAttribute('aria-labelledby', 'dx-flow-h');
    flow.innerHTML = '<div class="sx-head dx-cc-rv"><span class="sx-k">Human approval</span>' +
      '<h2 id="dx-flow-h">Prepared by Bunya. <span>Decided by you.</span></h2>' +
      '<p>AI prepares the prework. Nothing is used or sent until a person on your team checks and approves it.</p></div>' +
      '<ol class="dx-steps dx-cc-rv">' + STEPS.map(function (s, i) {
        return '<li class="' + s[4] + '"><span class="dx-step-ico c' + i + '">' + svg(s[0]) + '</span><span class="dx-step-n">Step 0' + (i + 1) + '</span>' +
          '<b>' + s[1] + '</b><p>' + s[2] + '</p><span class="dx-who ' + (s[3] === 'Bunya' ? 'bunya' : 'adviser') + '">' + s[3] + '</span></li>';
      }).join('') + '</ol>' +
      '<div class="dx-wf dx-cc-rv"><span class="dx-wf-k">AI workflows include</span>' + WF.map(function (w, i) {
        return '<a class="c' + i + '" href="' + w[1] + '">' + w[0] + '</a>';
      }).join('') + '</div>' +
      '<p class="co-more dx-cc-rv"><a href="ai-workflows-integrations.html">How AI workflows work</a></p>';
    trust.insertAdjacentElement('beforebegin', flow);

    /* 4a. Microsoft 365 apps under the trust tiles */
    var more = trust.querySelector('.co-more');
    var apps = el('div', 'dx-ms dx-cc-rv', '<span class="dx-wf-k">Works inside</span>' +
      ['Outlook', 'Teams', 'SharePoint', 'Power BI'].map(function (a, i) { return '<span class="c' + i + '">' + a + '</span>'; }).join(''));
    if (more) more.insertAdjacentElement('beforebegin', apps); else trust.appendChild(apps);

    /* 4b. Your process. Not a template. (after the trust section) */
    var STAGES = ['Discovery', 'Fact find', 'Strategy', 'SoA request', 'Implementation', 'Review'];
    var proc = el('section', 'sx-sec dx-proc');
    proc.setAttribute('aria-labelledby', 'dx-proc-h');
    proc.innerHTML = '<div class="sx-head dx-cc-rv"><span class="sx-k">Your blueprint</span>' +
      '<h2 id="dx-proc-h">Your process. <span>Not a template.</span></h2>' +
      '<p>Stages, roles and approval points are agreed with your team before anything is built.</p></div>' +
      '<ol class="dx-stages dx-cc-rv">' + STAGES.map(function (s, i) { return '<li class="c' + (i % 4) + '"><span>' + (i + 1) + '</span>' + s + '</li>'; }).join('') +
      '<li class="yours"><span>+</span>Your step</li></ol>' +
      '<p class="co-more dx-cc-rv"><a href="getting-started.html">How getting started works</a></p>';
    trust.insertAdjacentElement('afterend', proc);
  }

  /* 5. "Follow Priya and Arjun Shah" (redesigned 20 Nov 2026): the blurry still is replaced by the meeting screen built
     in HTML, crisp at any size: the Discovery meeting with Alex, Priya and Arjun, what Bunya prepared, and the file note
     waiting for Alex to approve. The text side gets the family's photos and the steps the story follows. */
  var tea = document.querySelector('a.co-teaser'), tImg = tea && tea.querySelector('img');
  if (tea && tImg && !tea.querySelector('.sh-app')) {
    var M = 'assets/meeting/';
    var ICO = {
      note: '<svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
      mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
      task: '<svg viewBox="0 0 24 24"><path d="m4 6 1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17M11 6h9M11 12h9M11 18h9"/></svg>'
    };
    function row(ic, t, d) { return '<span class="sh-row"><i class="sh-ri">' + ICO[ic] + '</i><span><b>' + t + '<em>Draft</em></b><small>' + d + '</small></span></span>'; }
    var pan = el('span', 'dx-tpanel sh-pan');
    pan.innerHTML =
      '<span class="sh-app">' +
        '<span class="sh-top"><span class="sh-k">Command Centre · Meetings</span><span class="sh-rec"><i></i>Recorded</span></span>' +
        '<span class="sh-h">Discovery · Shah Family</span>' +
        '<span class="sh-meta">Thursday 9:30 · Teams · 52 minutes</span>' +
        '<span class="sh-who"><img src="' + M + 'alex-sq.jpg" alt=""><img src="' + M + 'priya-sq.jpg" alt=""><img src="' + M + 'arjun-sq.jpg" alt=""><small>Alex Reid with Priya and Arjun</small></span>' +
        '<span class="sh-lab">Prepared by Bunya</span>' +
        row('note', 'File note', 'Goals, concerns and what was agreed') +
        row('mail', 'Follow-up email', 'On your letterhead, three agreed actions') +
        row('task', '3 tasks', 'Super statements · fact find · strategy') +
      '</span>' +
      '<span class="sh-note">' +
        '<span class="sh-nk">File note · ready to check</span>' +
        '<span class="sh-nl"><small>Their goals</small>Priya retires at 60, Arjun at 63</span>' +
        '<span class="sh-nl"><small>Their concerns</small>Whether to keep the SMSF</span>' +
        '<span class="sh-nl"><small>What was agreed</small>Check cover before Arjun’s contract ends</span>' +
        '<span class="sh-btns"><span class="sh-ok">Approve<i></i></span><span class="sh-ed">Edit</span></span>' +
      '</span>';
    tImg.parentNode.replaceChild(pan, tImg);
    var tx = pan.nextElementSibling;
    if (tx) {
      tx.classList.add('sh-txt');
      var fam = el('span', 'sh-fam');
      fam.innerHTML = '<span class="sh-pics"><img src="' + M + 'priya-sq.jpg" alt=""><img src="' + M + 'arjun-sq.jpg" alt=""></span><span>The Shah family</span>';
      tx.insertBefore(fam, tx.firstChild);
      var steps = el('span', 'sh-steps');
      steps.innerHTML = ['Discovery', 'Fact find', 'Strategy', 'Advice', 'Review'].map(function (w, i) { return '<span' + (i === 0 ? ' class="on"' : '') + '>' + (i === 0 ? '<i>✓</i>' : '') + w + '</span>'; }).join('');
      var em = tx.querySelector('em'); tx.insertBefore(steps, em);
    }
    tea.classList.add('sh-on');
  }

  /* Gentle reveal for the added parts (the page's own reveal runs before these exist) */
  var rv = document.querySelectorAll('.dx-cc-rv');
  if (reduce || !('IntersectionObserver' in window)) { [].forEach.call(rv, function (e) { e.classList.add('in'); }); return; }
  document.documentElement.classList.add('dx-cc-anim');
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -6% 0px' });
  [].forEach.call(rv, function (e) { io.observe(e); });
})();

/* consistency pass (19 Nov 2026): the questions headline matches the feature pages */
(function () {
  var h = document.getElementById('h-faq');
  if (h) h.innerHTML = 'Questions, <span>answered.</span>';
})();

/* Dana (20 Nov 2026): the "All of this comes with it" cards. Each gets an "Included" tag (the last, "Add what you
   need", is the add-ons card) and a "See more" line at the foot, and takes its icon's teal for its hover frame. */
(function () {
  'use strict';
  var cards = document.querySelectorAll('.co-gets > .co-get');
  if (!cards.length || document.querySelector('.cg-tag')) return;
  var HC = { 'dx-c1': '#11B8B1', 'dx-c2': '#0A7D79', 'dx-c3': '#04545B', 'dx-c4': '#0A9C96', 'dx-c5': '#7EDAD6' };
  [].forEach.call(cards, function (a, i) {
    var last = i === cards.length - 1, ico = a.querySelector('.dx-ico');
    var c = ico && (ico.className.match(/dx-c\d/) || [])[0];
    if (c && HC[c]) a.style.setProperty('--hc', HC[c]);
    var tag = document.createElement('span');
    tag.className = 'cg-tag'; tag.setAttribute('aria-hidden', 'true');
    tag.innerHTML = last ? 'Add-ons' : '<i>✓</i>Included';
    a.appendChild(tag);
    var b = a.querySelector('b'); if (last && b) b.textContent = b.textContent.replace(/\s*›\s*$/, '');
    var more = document.createElement('span');
    more.className = 'cg-more'; more.setAttribute('aria-hidden', 'true');
    more.innerHTML = (last ? 'See what each costs' : 'See more') + '<i></i>';
    a.appendChild(more);
    if (last) a.classList.add('cg-add');
  });
  document.querySelector('.co-gets').classList.add('cg-on');
})();
