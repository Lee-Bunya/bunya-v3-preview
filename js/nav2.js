/* New Bunya nav (6 Nov 2026). Builds the bar, the desktop picture dropdowns and the phone menu
   into <header id="nav2" class="nv">. One list (NAV) drives all three, so menus can't drift apart.
   Product pictures are the concept screens (never the real Command Centre UI).
   Agents shows only what's included today; Daniel to confirm the full agent list before launch.
   */
(function(){
  'use strict';
  var IMG = 'assets/concept/';
  var G = { // simple line glyphs for services, which have no screens
    brand: '<path d="M12 3l7.5 8.5L12 21 4.5 11.5z"/><path d="M12 3v18M4.5 11.5h15"/>',
    design: '<rect x="5" y="3" width="11" height="15" rx="1.5"/><path d="M8 3v0M8 8h5M8 11h5M8 14h3"/><path d="M16 7h3v14H8v-3"/>',
    web: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 8h18M8 21h8M12 18v3"/>',
    mkt: '<path d="M4 15V9l11-5v16L4 15z"/><path d="M15 8a4 4 0 0 1 0 8M7 15l1.5 5h3L10 16"/>'
  };
  var NAV = [
    { key: 'cc', label: 'Command Centre', tiles: [
      { name: 'Command Centre', img: 'home.webp', learn: 'command-centre-new.html', build: 'build.html' },
      { name: 'Advice pipeline', img: 'pipeline.webp', learn: 'financial-advice-process.html', build: 'build.html' },
      { name: 'Bunya in Outlook', img: 'outlook.webp', learn: 'ai-workflows-integrations.html', build: 'build.html' },
      { name: 'Practice reports', img: 'reports.webp', learn: 'command-centre-new.html', build: 'build.html' } ],
      links: [['How it works', 'command-centre-new.html'], ['Security and your data', 'security-your-data.html'], ['Connections', 'ai-workflows-integrations.html'], ['Getting started', 'getting-started.html'], ['FAQs', 'faq.html']] },
    { key: 'agents', label: 'Agents', tiles: [
      { name: 'Meeting Notes', img: 'meeting.webp', learn: 'agent-file-notes.html', build: 'build.html' },
      { name: 'Review Packs', img: 'reviews.webp', learn: 'reviews-fee-consent.html', build: 'build.html' },
      { name: 'Fact find', img: 'factfind.webp', learn: 'agent-fact-find.html', build: 'build.html?soa=all' },
      { name: 'Statements of advice', img: 'portal.webp', learn: 'soa-preparation.html', build: 'build.html?soa=all' } ],
      links: [['All agents', 'agents.html'], ['Fee consent and renewals', 'reviews-fee-consent.html'], ['Client onboarding', 'client-onboarding.html'], ['Advice implementation', 'advice-implementation.html']] },
    { key: 'apps', label: 'Apps', tiles: [
      { name: 'Client Portal', img: 'portal.webp', learn: 'apps.html', build: 'build.html?add=portal' },
      { name: 'Broadcast HQ', img: 'bhq_cockpit.webp', learn: 'broadcast-hq.html', build: 'build.html?add=bhq' },
      { name: 'Field Notes', dark: true, soon: true, learn: 'apps.html', build: 'build.html?add=field' },
      { name: 'Revenue Import', img: 'reports.webp', soon: true, learn: 'apps.html', build: 'build.html?add=rev' } ],
      links: [['All apps', 'apps.html']] },
    { key: 'services', label: 'Services', tiles: [
      { name: 'Brand', glyph: 'brand', build: 'build.html?brand=kit#sec-svc' },
      { name: 'Design', glyph: 'design', build: 'build.html?docs=1#sec-svc' },
      { name: 'Website', glyph: 'web', build: 'build.html?web=w5#sec-svc' },
      { name: 'Marketing', glyph: 'mkt', build: 'build.html?mkt=upkeep#sec-svc' } ],
      links: [['See all services and prices', 'build.html#sec-svc']] },
    { key: 'customers', label: 'Customers', words: true,
      links: [['Customer stories', 'case-studies.html'], ['Falcon Financial', 'case-study-falcon.html'], ['About Bunya', 'about.html'], ['Contact us', 'contact.html']] }
  ];
  var CHEV = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  var BACK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var CLOSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function pic(t){
    if (t.img) return '<span class="nv-pic"><img src="' + IMG + t.img + '" alt="" loading="lazy"></span>';
    if (t.dark) return '<span class="nv-pic dark"><i></i></span>';
    return '<span class="nv-pic glyph"><svg viewBox="0 0 24 24" aria-hidden="true">' + G[t.glyph] + '</svg></span>';
  }
  function tiles(s){
    if (!s.tiles) return '';
    return '<div class="nv-tiles">' + s.tiles.map(function(t){
      var acts = (t.learn ? '<a href="' + t.learn + '">Learn</a>' : '') + '<a href="' + t.build + '">' + (t.learn ? 'Build' : 'Add to your build') + '</a>';
      return '<div class="nv-tile"><a href="' + (t.learn || t.build) + '" tabindex="-1" aria-hidden="true">' + pic(t) + '</a>' +
        '<span class="nv-name">' + t.name + (t.soon ? '<small>Soon</small>' : '') + '</span><span class="nv-acts">' + acts + '</span></div>';
    }).join('') + '</div>';
  }
  function list(s){ return '<div class="nv-list">' + s.links.map(function(l){ return '<a href="' + l[1] + '">' + l[0] + '</a>'; }).join('') + '</div>'; }

  var root = document.getElementById('nav2'); if (!root) return;
  var logo = root.getAttribute('data-logo') || 'assets/84374dbcdaa8.svg';
  root.innerHTML =
    '<div class="nv-bar">' +
      '<a class="nv-logo" href="index.html" aria-label="Bunya AI home"><img src="' + logo + '" alt="Bunya AI" width="120" height="26"></a>' +
      '<nav class="nv-main" aria-label="Main">' + NAV.map(function(s){ return '<button type="button" data-nv="' + s.key + '" aria-expanded="false" aria-controls="nv-drop">' + s.label + '</button>'; }).join('') + '</nav>' +
      '<div class="nv-right"><a class="nv-build" href="build.html">Build yours</a><a class="nv-demo" href="booking.html">Book a demo</a><button type="button" class="nv-menu-btn" aria-expanded="false" aria-controls="nv-phone">Menu</button></div>' +
    '</div>' +
    '<div class="nv-drop" id="nv-drop">' + NAV.map(function(s){ return '<div class="nv-sec' + (s.words ? ' words' : '') + '" data-sec="' + s.key + '">' + tiles(s) + list(s) + '</div>'; }).join('') + '</div>' +
    '<div class="nv-veil"></div>' +
    '<div class="nv-phone" id="nv-phone" role="dialog" aria-modal="true" aria-label="Menu"><div class="nv-ph-top"><button type="button" class="nv-ph-back" aria-label="Back" hidden>' + BACK + '</button><b></b><button type="button" class="nv-ph-close" aria-label="Close menu">' + CLOSE + '</button></div>' +
      '<div class="nv-ph-body"></div><div class="nv-ph-foot"><a href="build.html">Build yours</a><a class="nv-demo" href="booking.html">Book a demo</a></div></div>';

  /* Count of things in your build, like a shopping bag */
  function buildCount(){
    var q; try { q = new URLSearchParams(localStorage.getItem('bunya.build') || ''); } catch (e) { return 0; }
    if (!q.toString()) return 0;
    var c = 1 + ((q.get('soa') === 'all' || q.get('soa') === 'packs') ? 1 : 0) + (q.get('add') || '').split(',').filter(Boolean).length;
    ['brand', 'web', 'mkt'].forEach(function(k){ if (q.get(k)) c++; }); if (q.get('docs') === '1') c++;
    return c;
  }
  function badge(){
    var n = buildCount(), b = root.querySelector('.nv-build');
    b.innerHTML = 'Build yours' + (n ? '<span class="nv-count" aria-label="' + n + ' items in your build">' + n + '</span>' : '');
  }
  badge();
  document.addEventListener('bunya:build', badge);
  addEventListener('storage', function(e){ if (e.key === 'bunya.build') badge(); });

  /* Desktop: hover or click a word to open its dropdown */
  var drop = root.querySelector('.nv-drop'), veil = root.querySelector('.nv-veil'), btns = root.querySelectorAll('[data-nv]'), openKey = null, timer = null;
  function open(key){
    clearTimeout(timer); openKey = key;
    [].forEach.call(btns, function(b){ b.setAttribute('aria-expanded', String(b.dataset.nv === key)); });
    [].forEach.call(root.querySelectorAll('.nv-sec'), function(s){ s.classList.toggle('on', s.dataset.sec === key); });
    drop.classList.add('on'); veil.classList.add('on');
  }
  function close(){
    openKey = null; drop.classList.remove('on'); veil.classList.remove('on');
    [].forEach.call(btns, function(b){ b.setAttribute('aria-expanded', 'false'); });
  }
  function later(){ clearTimeout(timer); timer = setTimeout(close, 180); }
  [].forEach.call(btns, function(b){
    b.addEventListener('mouseenter', function(){ clearTimeout(timer); timer = setTimeout(function(){ open(b.dataset.nv); }, openKey ? 0 : 90); });
    b.addEventListener('click', function(){ openKey === b.dataset.nv ? close() : open(b.dataset.nv); });
  });
  root.querySelector('.nv-main').addEventListener('mouseleave', later);
  drop.addEventListener('mouseenter', function(){ clearTimeout(timer); });
  drop.addEventListener('mouseleave', later);
  veil.addEventListener('click', close);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') { close(); closePhone(); } });

  /* Phone: full-screen list, tap a word to drill in, back arrow to return */
  var phone = root.querySelector('.nv-phone'), body = phone.querySelector('.nv-ph-body'), title = phone.querySelector('.nv-ph-top b'),
      back = phone.querySelector('.nv-ph-back'), menuBtn = root.querySelector('.nv-menu-btn');
  function home(){
    title.textContent = ''; back.hidden = true;
    body.innerHTML = NAV.map(function(s){ return '<button type="button" class="nv-ph-row" data-ph="' + s.key + '">' + s.label + CHEV + '</button>'; }).join('');
  }
  function section(key){
    var s = NAV.filter(function(x){ return x.key === key; })[0];
    title.textContent = s.label; back.hidden = false; body.innerHTML = tiles(s) + list(s); body.scrollTop = 0;
  }
  function openPhone(){ home(); phone.classList.add('on'); menuBtn.setAttribute('aria-expanded', 'true'); document.documentElement.style.overflow = 'hidden'; }
  function closePhone(){ phone.classList.remove('on'); menuBtn.setAttribute('aria-expanded', 'false'); document.documentElement.style.overflow = ''; }
  menuBtn.addEventListener('click', openPhone);
  phone.querySelector('.nv-ph-close').addEventListener('click', closePhone);
  back.addEventListener('click', home);
  body.addEventListener('click', function(e){ var r = e.target.closest('[data-ph]'); if (r) section(r.dataset.ph); });
})();
