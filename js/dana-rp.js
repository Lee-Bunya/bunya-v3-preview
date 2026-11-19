/* Review Packs page (Dana, 19 Nov 2026). Runs after js/dana-feature.js. Styling: css/dana-rp.css.
   1. The opening "Reviews and fees" film rebuilt as a large, live screen in Bunya colours: Harper's pack is prepared,
      then the Calder fee renewal is sent and Outlook confirms it (the same story as Lee's film, readable).
   2. "Your review pack, in your brand": one big slide on a stage, all 18 slides as thumbnails, and Lee's full-screen
      reader (data-reader) one click away.
   3. Up close · Year ahead: the reviews-by-month chart redrawn in a quieter, more professional style. */
(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function onScreen(el, fn) {
    if (!('IntersectionObserver' in window)) { fn(true); return; }
    new IntersectionObserver(function (es) { fn(es[0].isIntersecting); }, { threshold: .3 }).observe(el);
  }

  /* ---------- 1. Reviews and fees ---------- */
  var shot = document.querySelector('.dx-dev-feat');
  if (shot) {
    var vid = shot.querySelector('video');
    if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('rf-hidden'); }
    var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
      '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
      '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
    function row(ini, cls, name, sub, pill, pcls, extra) {
      return '<div class="rf-row' + (extra || '') + '"><span class="rf-av ' + cls + '">' + ini + '</span><span class="rf-nm"><b>' + name + '</b><small>' + sub + '</small></span><span class="rf-pill ' + pcls + '">' + pill + '</span></div>';
    }
    var scene = document.createElement('div');
    scene.className = 'rf-scene';
    scene.setAttribute('role', 'img');
    scene.setAttribute('aria-label', 'Illustrative: the Reviews and fees screen. The Harper family’s review pack is prepared by Bunya, then the Calder family’s fee renewal is sent and Outlook confirms it.');
    scene.innerHTML =
      '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, i) { return '<i class="' + (i === 4 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
      '<div class="rf-main"><span class="rf-crumb">Command Centre · Reviews</span><h4>Reviews and fees</h4><span class="rf-sub">6 reviews due this month · 3 consents to renew</span>' +
      '<div class="rf-grid"><div class="rf-col">' +
        '<div class="rf-card"><div class="rf-ch"><b>Reviews due</b><small>This month</small></div>' +
          row('CF', 'c1', 'Calder Family', 'Annual review · Tuesday 11:00', 'Pack ready', 'ok') +
          row('MF', 'c2', 'Morgan Family', 'Annual review · Thursday', 'Pack ready', 'ok') +
          row('HF', 'c3', 'Harper Family', 'Annual review · next week', 'Preparing', 'wait', ' rf-harper') + '</div>' +
        '<div class="rf-card rf-pack"><span class="rf-mini"><i></i><i></i><i><em>Your annual review</em></i></span><span class="rf-pk"><span class="rf-k">Prepared by Bunya</span><b>Harper Family</b><small>Review pack · 3 pages</small>' +
          '<span class="rf-bar"><i></i></span><span class="rf-pill wait" data-pack>Preparing</span></span></div>' +
      '</div><div class="rf-card rf-fees"><div class="rf-ch"><b>Fee consent</b><small>Renewals</small></div>' +
        '<div class="rf-row rf-calder"><span class="rf-av c1">CF</span><span class="rf-nm"><b>Calder Family</b><small>Renewal window open · ends 14 Dec</small></span><span class="rf-send" data-send>Send renewal <i>→</i></span></div>' +
        '<ol class="rf-tl"><li><i></i>Advice 2023</li><li><i></i>Review 2024</li><li><i></i>Consent 2025</li><li class="now"><i></i>Sent today</li></ol>' +
        row('NH', 'c5', 'Nguyen Household', 'Due in 30 days', 'Reminder set', 'soft') +
        row('OF', 'c4', 'Okafor Family', 'Signed · renewed to Nov 2027', 'Renewed', 'ok') +
      '</div></div></div></div>' +
      '<div class="rf-toast" aria-hidden="true"><span class="rf-ol"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/></svg></span><span><small>Outlook · Sent items · now</small><b>Fee renewal sent to the Calder Family</b></span></div>' +
      '<button type="button" class="mt-pause rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
    shot.appendChild(scene);
    shot.classList.add('rf-on');
    var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Review Packs · Reviews and fees';
    var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';

    var st = -1, tm = null, playing = !reduce, vis = false;
    function paint(s) {
      st = s;
      scene.dataset.s = s;
      var ready = s >= 2, sent = s >= 3;
      var hp = scene.querySelector('.rf-harper .rf-pill'), pk = scene.querySelector('[data-pack]');
      [hp, pk].forEach(function (p) { p.textContent = ready ? 'Pack ready' : 'Preparing'; p.className = 'rf-pill ' + (ready ? 'ok' : 'wait'); });
      if (pk) pk.setAttribute('data-pack', '');
      scene.querySelector('[data-send]').innerHTML = sent ? '✓ Sent' : 'Send renewal <i>→</i>';
    }
    function tick() {
      clearTimeout(tm);
      if (!playing || !vis) return;
      paint(st >= 4 ? 0 : st + 1);
      tm = setTimeout(tick, st === 4 ? 4200 : 2600);
    }
    var pb = scene.querySelector('.rf-pause');
    pb.addEventListener('click', function () {
      playing = !playing; scene.classList.toggle('paused', !playing);
      pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation');
      if (playing) tick(); else clearTimeout(tm);
    });
    if (reduce) { paint(4); scene.classList.add('paused'); }
    else { paint(0); onScreen(scene, function (v) { vis = v; if (v) tm = setTimeout(tick, 1600); else clearTimeout(tm); }); }
  }

  /* ---------- 2. The review pack, in your brand ---------- */
  var docs = document.querySelector('#example .pp-docs');
  if (docs) {
    var N = 18, TITLES = { 1: 'Annual review', 2: 'What we’ll cover today' };
    var cur = 1, auto = !reduce, tv = null, visD = false;
    var view = document.createElement('div');
    view.className = 'rp-view';
    var thumbs = ''; for (var i = 1; i <= N; i++) thumbs += '<button type="button" class="rp-th" data-n="' + i + '" aria-label="Show slide ' + i + ' of ' + N + '"><img src="assets/aynub/docs/annual/' + i + '.webp?v=2" alt="" loading="lazy"><span>' + i + '</span></button>';
    view.innerHTML =
      '<div class="rp-stage"><div class="rp-slide"><img src="assets/aynub/docs/annual/1.webp?v=2" alt="Aynub Financial annual review, slide 1 of 18 (fictional example)" width="1600" height="900"></div>' +
        '<div class="rp-bar"><span class="rp-brand"><u></u>Aynub Financial · Annual review</span><span class="rp-count"><b data-n>1</b> / ' + N + '</span>' +
        '<span class="rp-btns"><button type="button" class="rp-nav" data-d="-1" aria-label="Previous slide">←</button><button type="button" class="rp-nav" data-d="1" aria-label="Next slide">→</button>' +
        '<button type="button" class="rp-full" data-reader="annual" data-page="1">Read it full screen</button></span></div>' +
        '<div class="rp-tag rp-tag-a" aria-hidden="true"><i></i>Your logo, colours and fonts</div><div class="rp-tag rp-tag-b" aria-hidden="true"><i></i>18 slides · prepared by Bunya</div></div>' +
      '<div class="rp-rail" role="group" aria-label="All 18 slides">' + thumbs + '</div>';
    docs.insertAdjacentElement('afterend', view);
    docs.classList.add('dx-hide');
    var img = view.querySelector('.rp-slide img'), cnt = view.querySelector('[data-n]'), full = view.querySelector('.rp-full'), rail = view.querySelector('.rp-rail');
    function go(n, user) {
      cur = ((n - 1 + N) % N) + 1;
      if (user) { auto = false; clearTimeout(tv); }
      img.classList.remove('in'); void img.offsetWidth;
      img.src = 'assets/aynub/docs/annual/' + cur + '.webp?v=2';
      img.alt = 'Aynub Financial annual review, slide ' + cur + ' of ' + N + (TITLES[cur] ? ': ' + TITLES[cur] : '') + ' (fictional example)';
      img.classList.add('in');
      cnt.textContent = cur; full.setAttribute('data-page', String(cur));
      [].forEach.call(rail.children, function (b) { var on = +b.dataset.n === cur; b.classList.toggle('on', on); b.setAttribute('aria-current', on ? 'true' : 'false'); });
      var on = rail.querySelector('.on');
      if (on && user !== 'load') rail.scrollTo({ left: on.offsetLeft - rail.clientWidth / 2 + on.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
    }
    view.addEventListener('click', function (e) {
      var t = e.target.closest('.rp-th'); if (t) { go(+t.dataset.n, true); return; }
      var d = e.target.closest('.rp-nav'); if (d) go(cur + (+d.dataset.d), true);
    });
    function loopD() { clearTimeout(tv); if (!auto || !visD) return; tv = setTimeout(function () { go(cur + 1); loopD(); }, 4500); }
    go(1, 'load');
    onScreen(view, function (v) { visD = v; if (v) loopD(); else clearTimeout(tv); });
  }

  /* ---------- 3. Up close · Year ahead, redrawn ---------- */
  var sc = document.querySelector('#close .dx-dev-close .sc');
  if (sc) {
    var M = [['Nov', 6], ['Dec', 9], ['Jan', 4], ['Feb', 11], ['Mar', 15], ['Apr', 8], ['May', 7], ['Jun', 17], ['Jul', 12], ['Aug', 10], ['Sep', 9], ['Oct', 13]];
    var max = 20, avg = 10;
    var yr = document.createElement('div');
    yr.className = 'fn yr';
    yr.innerHTML =
      '<div class="fn-top"><div><span class="fn-crumb">Command Centre · Reviews</span><h4>Your year of reviews</h4><span class="fn-sub">142 households on ongoing fees · Alex and Jess</span></div>' +
        '<div class="fn-acts yr-filter"><span class="on">All advisers</span><span>Alex</span><span>Jess</span></div></div>' +
      '<div class="yr-chart"><div class="yr-ch"><span><b>Reviews by month</b><small>Next 12 months</small></span><span class="yr-legend"><i class="a"></i>Reviews due<i class="b"></i>Busy month<i class="c"></i>Monthly average</span></div>' +
        '<div class="yr-plot"><div class="yr-grid">' + [20, 15, 10, 5, 0].map(function (v) { return '<span><em>' + v + '</em></span>'; }).join('') + '</div>' +
        '<span class="yr-avg" style="bottom:' + (avg / max * 100) + '%"><em>Avg 10</em></span>' +
        '<div class="yr-bars">' + M.map(function (m) {
          var busy = m[1] >= 15;
          return '<div class="yr-col' + (busy ? ' busy' : '') + '"><span class="yr-b" style="height:' + (m[1] / max * 100) + '%"><em>' + m[1] + '</em></span><small>' + m[0] + '</small></div>';
        }).join('') + '</div></div></div>' +
      '<div class="yr-low"><div class="yr-card"><div class="yr-ch"><b>Coming up</b><small>Next 8 weeks</small></div>' +
        [['CF', 'c1', 'Calder Family', 'Review Wed 4 Nov · Alex', 'Pack ready', 'ok'], ['LH', 'c4', 'Lim Household', 'Review 24 Nov · Jess', 'Booked', 'soft'],
         ['MF', 'c2', 'Morgan Family', 'Review in 6 weeks · Alex', 'Invite to check', 'wait'], ['OF', 'c3', 'Okafor Family', 'Review in 8 weeks · Alex', 'Cycle starts 1 Dec', 'soft']].map(function (r) {
          return '<div class="rf-row"><span class="rf-av ' + r[1] + '">' + r[0] + '</span><span class="rf-nm"><b>' + r[2] + '</b><small>' + r[3] + '</small></span><span class="rf-pill ' + r[5] + '">' + r[4] + '</span></div>';
        }).join('') + '</div>' +
        '<div class="yr-side"><div class="yr-card yr-stats"><b class="yr-t">This month</b><span><b>6</b>Reviews</span><span><b>5</b>Booked</span><span><b>1</b>To invite</span></div>' +
        '<div class="yr-busy"><span class="yr-busy-i">!</span><span><b>March and June are busy</b>Seen now, so you can plan the team’s time.</span></div></div></div>';
    sc.appendChild(yr);
    sc.classList.add('fn-on');
    function tabYr() {
      var sel = document.querySelector('#close [data-shot][aria-selected="true"]');
      var on = !sel || sel.dataset.shot === '0';
      yr.hidden = !on; sc.classList.toggle('fn-on', on);
    }
    [].forEach.call(document.querySelectorAll('#close [data-shot]'), function (b) { b.addEventListener('click', function () { setTimeout(tabYr, 0); }); });
    tabYr();
    onScreen(yr, function (v) { if (v) yr.classList.add('grow'); });
  }
})();
