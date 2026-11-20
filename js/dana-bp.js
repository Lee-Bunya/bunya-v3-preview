/* Bunya Portal (bunya-portal.html), Dana 20 Nov 2026. Styling: css/dana-bp.css.
   The two Portal screens (the one under the hero and the "Up close" tabs) were flat screenshots. They're rebuilt as the
   live portal, made personal: Alex Reid is signed in, his photo is in the top bar, Home greets him by name, and a card
   overhangs each screen saying what Alex is seeing. Lee's content is kept (projects, Ask Bunya answer, Discover,
   Requests). The tabs still drive the Up close screen; the original screenshots stay in the page for no-script visitors. */
(function () {
  'use strict';
  var ALEX = 'assets/meeting/alex-sq.jpg';
  var IC = {
    cal: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
    vid: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="m16 10.5 5-3v9l-5-3"/></svg>',
    map: '<svg viewBox="0 0 24 24"><path d="M4 6h10M4 12h16M4 18h7"/><circle cx="17" cy="6" r="2"/><circle cx="14" cy="18" r="2"/></svg>',
    pen: '<svg viewBox="0 0 24 24"><path d="M15 5l4 4L8 20H4v-4z"/><path d="m13 7 4 4"/></svg>',
    tick: '<svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    shield: '<svg viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
    spark: '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>',
    note: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
    globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    mega: '<svg viewBox="0 0 24 24"><path d="M3 10v4l12 5V5z"/><path d="M15 9a4 4 0 0 1 0 6M7 15v4"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>'
  };
  var NAV = ['Home', 'Ask Bunya', 'Library', 'Discover', 'Requests'];
  var NAVI = [0, 1, 3, 4];
  function shell(v, body) {
    return '<div class="bp-app" data-v="' + v + '"><div class="bp-top"><span class="bp-brand"><i></i>Bunya Portal</span><span class="bp-nav">' +
      NAV.map(function (n, i) { return '<span' + (i === NAVI[v] ? ' class="on"' : '') + '>' + n + '</span>'; }).join('') +
      '</span><span class="bp-me"><img src="' + ALEX + '" alt=""><span><b>Alex Reid</b><small>Principal</small></span></span></div><div class="bp-body">' + body + '</div></div>';
  }
  function pill(t, k) { return '<em class="bp-pill ' + (k || '') + '">' + t + '</em>'; }
  function row(ic, t, d, end) { return '<div class="bp-row"><i class="bp-ri">' + IC[ic] + '</i><span><b>' + t + '</b><small>' + d + '</small></span>' + (end || '') + '</div>'; }

  var V = [
    /* Home */
    '<div class="bp-g2"><div class="bp-card bp-hi"><img class="bp-face" src="' + ALEX + '" alt=""><div><span class="bp-k">Good morning, Alex</span><b class="bp-h">Three projects with Bunya.</b>' +
      pill('1 thing waiting on your team', 'mint') + '</div><span class="bp-btn">Ask Bunya</span></div>' +
      '<div class="bp-card bp-meet"><i class="bp-ri">' + IC.cal + '</i><span class="bp-k">Next progress meeting</span><b>Thu 19 Nov · 10:00</b><small>Teams · agenda from your open requests</small></div></div>' +
    '<div class="bp-sh"><b>Your projects</b><span>Roadmap →</span></div>' +
    '<div class="bp-g3"><div class="bp-card bp-proj"><span class="bp-k">In build</span><b>Release 2 · reviews and reporting</b><i class="bp-bar"><u style="width:62%"></u></i>' + pill('On track', 'ok') + '</div>' +
      '<div class="bp-card bp-proj"><span class="bp-k">Testing</span><b>Review Packs</b><i class="bp-bar"><u style="width:84%"></u></i>' + pill('On track', 'ok') + '</div>' +
      '<div class="bp-card bp-proj"><span class="bp-k">Planned</span><b>Client Portal</b><i class="bp-bar"><u style="width:12%"></u></i>' + pill('Target Feb', 'grey') + '</div></div>' +
    '<div class="bp-g2 bp-lo"><div class="bp-card"><div class="bp-sh"><b>Waiting on you</b><span>All requests</span></div>' + row('doc', 'Quote · Insurance review step', 'Scoped and quoted · approve, or ask a question', '<span class="bp-btn sm">Open</span>') + '</div>' +
      '<div class="bp-card"><div class="bp-sh"><b>Recent meetings</b><span>All meetings</span></div>' + row('vid', 'Monthly progress meeting', '3 Nov · Summary') + row('vid', 'Training · client services', '28 Oct · Recording') + '</div></div>',
    /* Ask Bunya */
    '<div class="bp-title"><b>Ask Bunya</b><small>Answers about your projects, meetings, documents and training, from your firm’s records with Bunya.</small></div>' +
    '<div class="bp-g2 bp-ask"><div class="bp-card bp-chat"><div class="bp-q"><span>What did we agree in the last progress meeting?</span><img src="' + ALEX + '" alt=""></div>' +
      '<div class="bp-a"><i class="bp-logo"></i><div><p>Three things were agreed at the progress meeting on 3 Nov:</p><ul><li>An insurance review step after Strategy, owned by Jess.</li><li>Review Packs go live for client services on 24 Nov.</li><li>Bunya to quote the Excel export of the review list.</li></ul><small>Written by AI from your records. Check anything important with Bunya.</small></div></div>' +
      '<div class="bp-input"><span>Ask about your projects, meetings, documents or training</span><em>Send</em></div></div>' +
      '<div class="bp-col"><div class="bp-card"><div class="bp-sh"><b>From your records</b></div>' + row('vid', 'Monthly progress meeting', '3 Nov · Summary') + row('map', 'Review Packs', 'Roadmap · Testing') + row('doc', 'Excel export of the review list', 'Request · being scoped') + '</div>' +
      '<div class="bp-card">' + row('pen', 'Need a change?', 'Send a request. It’s scoped and quoted before any build starts.', '<span class="bp-btn sm ghost">New request</span>') + '</div></div></div>',
    /* Discover */
    '<div class="bp-title"><b>More possibilities for your firm.</b><small>Apps and agents for your Command Centre. Bunya reviews fit, access and costs with you before setup.</small><span class="bp-plan">Your plan · 1</span></div>' +
    '<div class="bp-tabs"><span class="on">Marketplace</span><span>Community</span><span>What’s new</span><span>Your tools</span></div>' +
    '<div class="bp-g4">' +
      '<div class="bp-card bp-appc"><i class="bp-ai c1">' + IC.note + '</i><span class="bp-k">Agent</span><b>Meeting Notes</b><small>Every client meeting, written up.</small>' + pill('In your Command Centre', 'mint') + '</div>' +
      '<div class="bp-card bp-appc"><i class="bp-ai c2">' + IC.globe + '</i><span class="bp-k">App</span><b>Client Portal</b><small>Your clients’ own space.</small>' + pill('In your plan', 'ok') + '</div>' +
      '<div class="bp-card bp-appc"><i class="bp-ai c3">' + IC.mega + '</i><span class="bp-k">App</span><b>Broadcast HQ</b><small>One idea. Every channel.</small><span class="bp-btn sm">Add to plan</span></div>' +
      '<div class="bp-card bp-appc"><i class="bp-ai c4">' + IC.pin + '</i><span class="bp-k">App</span><b>Field Notes</b><small>Meetings anywhere, noted.</small><span class="bp-btn sm">Add to plan</span></div></div>' +
    '<div class="bp-card bp-idea">' + row('spark', 'Default days for each workflow step', 'Community · open for input · New tasks fill in their due dates.', '<span class="bp-btn sm ghost">We’d use this</span>') + '</div>',
    /* Requests */
    '<div class="bp-title"><b>Requests, from question to delivered.</b><small>Changes, files and answers between your firm and Bunya. Changes are scoped and quoted before any build starts.</small><span class="bp-btn">New request</span></div>' +
    '<div class="bp-g2 bp-req"><div class="bp-card"><div class="bp-tabs"><span class="on">Open 2</span><span>Waiting on you 1</span><span>Closed 6</span></div>' +
      row('doc', 'Insurance review step', 'Feature request · quoted 5 Nov', pill('Waiting on you', 'mint')) +
      row('doc', 'Export the review list to Excel', 'Feature request · being scoped', pill('With Bunya', 'ok')) +
      row('tick', 'Copy of our signed agreement', 'Document or file · sent 30 Oct', pill('Closed', 'grey')) + '</div>' +
      '<div class="bp-col"><div class="bp-card">' + row('shield', 'Support', 'Problems, handled in the open') + '<div class="bp-kv"><span>Open</span><b>0</b></div><div class="bp-kv"><span>Raised from</span><b>The portal, Teams or phone</b></div></div>' +
      '<div class="bp-card">' + row('spark', 'Releases', 'What shipped, and what’s next') + '<div class="bp-kv"><span>Release 1 · pipeline and templates<small>Shipped 28 Oct</small></span>' + pill('Live', 'ok') + '</div></div></div></div>'
  ];
  /* the card that overhangs each screen, saying what Alex is seeing */
  var TIPS = [
    ['<img src="' + ALEX + '" alt="">', 'Signed in as Alex Reid', 'Principal · the firm’s projects and meetings'],
    ['<i>' + IC.tick + '</i>', 'Answered from 3 records', 'The meeting, the roadmap and a request'],
    ['<i>' + IC.spark + '</i>', 'Field Notes · added to the plan', 'Fit and cost checked before setup'],
    ['<i>' + IC.tick + '</i>', 'Quote ready for Alex to approve', 'Insurance review step · scoped 5 Nov']
  ];
  function tip(i) { var t = TIPS[i]; return '<span class="bp-tip">' + t[0] + '<span><b>' + t[1] + '</b><small>' + t[2] + '</small></span></span>'; }

  function stage(host, views, start) {
    var st = document.createElement('div');
    st.className = 'bp-stage'; st.setAttribute('aria-hidden', 'true');
    st.innerHTML = '<div class="bp-fit">' + views.map(function (i) { return '<div class="bp-view' + (i === start ? ' on' : '') + '" data-i="' + i + '">' + shell(i, V[i]) + '</div>'; }).join('') + '</div>';
    host.appendChild(st);
    var fit = st.querySelector('.bp-fit');
    function size() { var w = st.clientWidth; if (w) fit.style.setProperty('--k', w / 1200); }
    size(); if ('ResizeObserver' in window) new ResizeObserver(size).observe(st); else addEventListener('resize', size);
    host.classList.add('bp-on');
    return st;
  }

  /* 1. the screen under the hero: Home, with Alex's card and Ask Bunya's answer overhanging */
  var hero = document.querySelector('.pp-wrap .pp-shot');
  if (hero && !hero.querySelector('.bp-stage')) {
    stage(hero, [0], 0);
    var wrap = hero.parentNode; wrap.classList.add('bp-heroWrap');
    var fl = document.createElement('div'); fl.className = 'bp-floats'; fl.setAttribute('aria-hidden', 'true');
    fl.innerHTML = '<span class="bp-tip bp-f1"><img src="' + ALEX + '" alt=""><span><b>Alex Reid</b><small>Principal · signed in to the portal</small></span><em class="bp-dot"></em></span>' +
      '<span class="bp-tip bp-f2"><i>' + IC.spark + '</i><span><b>Review Packs go live 24 Nov</b><small>Ask Bunya · from the 3 Nov meeting</small></span></span>';
    hero.appendChild(fl);
  }

  /* 2. Up close: the four screens, switched by Lee's tabs, with a card that changes with the tab */
  var sc = document.querySelector('#close .sc');
  if (sc && !sc.querySelector('.bp-stage')) {
    var st = stage(sc, [0, 1, 2, 3], 0);
    var tp = document.createElement('div'); tp.className = 'bp-floats bp-close'; tp.setAttribute('aria-hidden', 'true'); tp.innerHTML = tip(0);
    sc.parentNode.appendChild(tp);
    function show(i) {
      [].forEach.call(st.querySelectorAll('.bp-view'), function (v) { v.classList.toggle('on', +v.dataset.i === i); });
      tp.innerHTML = tip(i); tp.firstChild.classList.add('in');
    }
    [].forEach.call(document.querySelectorAll('#close [data-shot]'), function (b) {
      b.addEventListener('click', function () { show(+b.dataset.shot); });
    });
    var imgs = sc.querySelectorAll('img');
    if ('MutationObserver' in window) new MutationObserver(function () {
      [].forEach.call(imgs, function (im, i) { if (im.classList.contains('on')) { var v = st.querySelector('.bp-view.on'); if (!v || +v.dataset.i !== i) show(i); } });
    }).observe(sc, { subtree: true, attributes: true, attributeFilter: ['class'] });
  }
})();
