/* Bunya menu, take 3 (7 Nov 2026; 9 Nov: no bag or + buttons, building happens in Build your Bunya; 10 Nov: the "Your Bunya"
   pill is back as a shortlist, see window.bunyaList below). Mounts into <header id="nav3" class="n3">.
   Shares "your build" with the home page and the build page through localStorage 'bunya.build'
   (same format as the build page's address) and the 'bunya:build' event. Products open their
   product sheet on the home page (window.bunyaOpenProduct), or go to index.html#p=<key>. */
/* One page per product (8 Nov 2026): the single map of product key -> page, used by the menu, footer, home sheets and
   tools/v3/build_products.mjs (which generates the pages from js/hb.js). */
window.BUNYA_PAGES = { cc: 'command-centre.html', notes: 'meeting-notes.html', reviews: 'review-packs.html', fee: 'review-packs.html#fees', care: 'care.html',
  bp: 'care.html#portal', shape: 'bunya-shape.html', soa: 'advice-engine.html', portal: 'client-portal.html', bhq: 'broadcast-hq.html', field: 'field-notes.html',
  rev: 'revenue-import.html', voice: 'bunya-voice.html', vault: 'bunya-vault.html', svc: 'brand-website-marketing.html' };
/* 10 Nov 2026: each Advice Engine feature has its own page (built by tools/v3/build_products.mjs). */
window.BUNYA_FEATURE_PAGES = { ff: 'fact-find.html', pf: 'portfolio.html', ins: 'insurance-needs.html', mod: 'strategy-modelling.html', cmp: 'platform-comparisons.html', soa: 'soa-generator.html', aud: 'file-audit.html' };
/* 9 Nov 2026: Daniel's Build your Bunya is where firms build and buy. One address; build.html hands over to it. */
window.BUNYA_BUILD = 'https://build-your-bunya-376bd3.netlify.app/';
/* Local preview: use the local build of the configurator (Lee's branch, preview "build-your-bunya" on port 8795). */
if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) window.BUNYA_BUILD = 'http://localhost:8795/';

/* ── Your Bunya: the shortlist (10 Nov 2026, Lee: "tick things as you go … a running total … the price of a household").
   Firms tick Advice Engine features and apps as they read; the menu pill keeps a running price per household; Build yours
   hands the picks to Build your Bunya (build.html calls window.bunyaList.handover()). It is a shortlist, not a checkout:
   households, totals and ordering stay in Build your Bunya. Prices are the configurator's draft prices (Lee's suggestions
   for Daniel, not agreed): $3 base, features priced per household, every feature = the whole Advice Engine at $2 more.
   Apps are a flat price a month for the firm, so they sit on their own line and never change the household price.
   Store: localStorage 'bunya.build' = v=2&feat=ff,pf&add=portal,bhq (or ae=1 for the whole Advice Engine). */
(function(){
  'use strict';
  var KEY = 'bunya.build', BASE = 3, AE = 2, ALL_APPS = 1150, ALL_APPS_AE = 548;
  var FEAT = [['ff', 'Fact find', .4, []], ['pf', 'Portfolio', .3, []], ['ins', 'Insurance needs and quotes', .4, ['ff']], ['mod', 'Strategy and modelling', .5, ['ff']],
              ['cmp', 'Platform comparisons', .3, ['pf']], ['soa', 'SOA generator', 1, ['ff', 'mod']], ['aud', 'File Audit', .3, ['soa']]];
  var APPS = [['portal', 'Client Portal', 790], ['bhq', 'Broadcast HQ', 390], ['field', 'Field Notes', 19], ['rev', 'Revenue Import', 119], ['voice', 'Bunya Voice', 370]];
  var MEM = '';
  function f(k){ return FEAT.filter(function(x){ return x[0] === k; })[0]; }
  function a(k){ return APPS.filter(function(x){ return x[0] === k; })[0]; }
  function read(){
    var t; try { t = localStorage.getItem(KEY) || ''; } catch (e) { t = MEM; }
    var q = new URLSearchParams(t), s = { feat: {}, add: {}, ae: false };
    if (q.get('v') !== '2') return s;
    s.ae = q.get('ae') === '1';
    (q.get('feat') || '').split(',').forEach(function(k){ if (f(k)) s.feat[k] = true; });
    (q.get('add') || '').split(',').forEach(function(k){ if (a(k)) s.add[k] = true; });
    if (s.ae) FEAT.forEach(function(x){ s.feat[x[0]] = true; });
    return s;
  }
  function write(s, detail){
    if (FEAT.every(function(x){ return s.feat[x[0]]; })) s.ae = true;
    var fs = FEAT.filter(function(x){ return s.feat[x[0]]; }).map(function(x){ return x[0]; }),
        as = APPS.filter(function(x){ return s.add[x[0]]; }).map(function(x){ return x[0]; }), q = new URLSearchParams();
    if (s.ae || fs.length || as.length) q.set('v', '2');
    if (s.ae) q.set('ae', '1'); else if (fs.length) q.set('feat', fs.join(','));
    if (as.length) q.set('add', as.join(','));
    MEM = q.toString();
    try { MEM ? localStorage.setItem(KEY, MEM) : localStorage.removeItem(KEY); } catch (e) {}
    document.dispatchEvent(new CustomEvent('bunya:build', { detail: detail || {} }));
  }
  function featOn(s, k){ s.feat[k] = true; f(k)[3].forEach(function(r){ featOn(s, r); }); }
  function featOff(s, k){ delete s.feat[k]; s.ae = false; FEAT.forEach(function(x){ if (s.feat[x[0]] && x[3].indexOf(k) > -1) featOff(s, x[0]); }); }
  function featSum(s){ return FEAT.reduce(function(t, x){ return t + (s.feat[x[0]] ? x[2] : 0); }, 0); }
  function rate(s){ return BASE + (s.ae ? AE : featSum(s)); }
  function inAE(s, k){ return s.ae && k === 'portal'; }
  function every(s){ return APPS.every(function(x){ return s.add[x[0]] || inAE(s, x[0]); }); }
  function apps(s){
    var paid = APPS.filter(function(x){ return s.add[x[0]] && !inAE(s, x[0]); });
    return every(s) ? (s.ae ? ALL_APPS_AE : ALL_APPS) : paid.reduce(function(t, x){ return t + x[2]; }, 0);
  }
  function count(s){ return (s.ae ? 1 : Object.keys(s.feat).length) + Object.keys(s.add).length; }
  window.bunyaList = {
    FEAT: FEAT, APPS: APPS, BASE: BASE, AE: AE, ALL_APPS: ALL_APPS, ALL_APPS_AE: ALL_APPS_AE,
    read: read, rate: rate, featSum: featSum, apps: apps, every: every, inAE: inAE, count: count,
    has: function(kind, k){ var s = read(); return kind === 'ae' ? s.ae : !!s[kind][k]; },
    toggle: function(kind, k){
      var s = read(), on, before = Object.keys(s.feat).length;
      if (kind === 'ae') { on = !s.ae; s.ae = on; s.feat = {}; if (on) FEAT.forEach(function(x){ s.feat[x[0]] = true; }); }
      else if (kind === 'feat') { on = !s.feat[k]; if (on) featOn(s, k); else featOff(s, k); }
      else { on = !s.add[k]; if (on) s.add[k] = true; else delete s.add[k]; }
      var extra = kind === 'feat' && on ? Object.keys(s.feat).length - before - 1 : 0;
      write(s, { kind: kind, key: k, on: on, extra: extra });
      return on;
    },
    clear: function(){ write({ feat: {}, add: {}, ae: false }, { cleared: true }); },
    // What Build your Bunya reads from its address: model=ae or feat=…, add=…, voice=1, all=1 (every app)
    handover: function(){
      var s = read(), q = new URLSearchParams();
      if (s.ae) q.set('model', 'ae'); else if (Object.keys(s.feat).length) q.set('feat', FEAT.filter(function(x){ return s.feat[x[0]]; }).map(function(x){ return x[0]; }).join(','));
      var ad = ['portal', 'bhq', 'field', 'rev'].filter(function(k){ return s.add[k]; });
      if (ad.length) q.set('add', ad.join(','));
      if (s.add.voice) q.set('voice', '1');
      if (Object.keys(s.add).length && every(s)) q.set('all', '1');
      return q;
    }
  };
})();

(function(){
  'use strict';
  var root = document.getElementById('nav3'); if (!root) return;
  var IMG = 'assets/concept/', KEY = 'bunya.build';
  var I = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    bag: '<path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', tick: '<path d="M5 12.5l4.5 4.5L19 7.5"/>', x: '<path d="M7 7l10 10M17 7L7 17"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', page: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/>', q: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"/>',
    brand: '<path d="M12 3l7.5 8.5L12 21 4.5 11.5z"/><path d="M12 3v18M4.5 11.5h15"/>',
    docs: '<rect x="5" y="3" width="11" height="15" rx="1.5"/><path d="M8 8h5M8 11h5M8 14h3"/><path d="M16 7h3v14H8v-3"/>',
    web: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 8h18M8 21h8M12 18v3"/>',
    mkt: '<path d="M4 15V9l11-5v16L4 15z"/><path d="M15 8a4 4 0 0 1 0 8M7 15l1.5 5h3L10 16"/>'
  };
  var svg = function(k){ return '<svg viewBox="0 0 24 24" aria-hidden="true">' + I[k] + '</svg>'; };
  var P = {
    cc:      { name: 'Command Centre', head: 'Every client. One place.', img: 'home.webp', price: 'From $3 per household', c: '#5EEAD4', g: 'rgba(45,212,191,.5)', base: true },
    notes:   { name: 'Meeting Notes', head: 'Every meeting, written up.', c: '#C4B5FD', incl: true },
    reviews: { name: 'Review Packs', head: 'Every review, ready.', c: '#FCD34D', incl: true },
    fee:     { name: 'Fee consent', head: 'Renewals, on time.', c: '#6EE7B7', incl: true },
    soa:     { name: 'Advice Engine', head: 'Every SOA, drafted.', img: 'factfind.webp', price: '$5 per household', c: '#93C5FD', g: 'rgba(96,165,250,.55)', param: 'soa', val: 'all' },
    portal:  { name: 'Client Portal', head: 'Your clients’ own space.', img: 'portal.webp', price: '$790 a month', c: '#F9A8D4', g: 'rgba(244,114,182,.5)', add: 'portal' },
    bhq:     { name: 'Broadcast HQ', head: 'One idea. Every channel.', img: 'bhq_cockpit.webp', price: '$390 a month', c: '#FDBA74', g: 'rgba(251,146,60,.55)', add: 'bhq' },
    field:   { name: 'Field Notes', head: 'Meetings anywhere, noted.', phone: true, price: '$19 a month', c: '#FCA5A5', g: 'rgba(248,113,113,.55)', add: 'field' },
    rev:     { name: 'Revenue Import', head: 'Revenue, matched.', img: 'reports.webp', price: '$119 a month', c: '#BEF264', g: 'rgba(163,230,53,.45)', add: 'rev' },
    voice:   { name: 'Bunya Voice', head: 'Every call, on the client’s file.', img: 'assets/voice/voice.webp', price: '$370 a month', c: '#67E8F9', g: 'rgba(103,232,249,.45)', add: 'voice' },
    vault:   { name: 'Bunya Vault', head: 'Team credentials, together.', img: 'assets/vault/list.webp', price: 'Talk to us', c: '#FDE68A', g: 'rgba(250,204,21,.45)', talk: true },
    brand:   { name: 'Brand', head: 'A kit, guidelines or a refresh.', glyph: 'brand', price: 'AI kit included', c: '#A5B4FC', g: 'rgba(129,140,248,.5)', param: 'brand', val: 'kit', sheet: 'svc' },
    docs:    { name: 'Your documents', head: 'Every document your clients see, in your brand.', glyph: 'docs', price: 'From $4,500', c: '#F0ABFC', g: 'rgba(232,121,249,.45)', param: 'docs', val: '1', sheet: 'svc' },
    web:     { name: 'Website', head: 'Get found. Look the part.', glyph: 'web', price: 'Quoted', c: '#67E8F9', g: 'rgba(34,211,238,.45)', param: 'web', val: 'w5', sheet: 'svc' },
    mkt:     { name: 'Marketing', head: 'Upkeep, search and AI answers.', glyph: 'mkt', price: 'Quoted', c: '#FDE68A', g: 'rgba(250,204,21,.4)', param: 'mkt', val: 'upkeep', sheet: 'svc' }
  };
  var NAMES = { portal: 'Client Portal', bhq: 'Broadcast HQ', field: 'Field Notes', rev: 'Revenue Import', kit: 'Brand kit', guide: 'Brand guidelines', refresh: 'Brand refresh',
    w5: 'Website, 5 pages', w12: 'Website, 12 pages', w25: 'Website, 25 pages', upkeep: 'Website upkeep', found: 'Be found', cited: 'Be cited' };

  /* ── Your build (shared store) ── */
  function load(){ try { return new URLSearchParams(localStorage.getItem(KEY) || ''); } catch (e) { return new URLSearchParams(); } }
  function save(q){ try { var t = q.toString(); t ? localStorage.setItem(KEY, t) : localStorage.removeItem(KEY); } catch (e) {} document.dispatchEvent(new CustomEvent('bunya:build', { detail: { source: 'nav' } })); }
  function adds(q){ return (q.get('add') || '').split(',').filter(Boolean); }
  function has(k, q){
    var p = P[k]; q = q || load();
    if (p.base || p.incl) return !!q.toString();
    if (p.add) return adds(q).indexOf(p.add) > -1;
    if (p.param === 'soa') return q.get('soa') === 'all' || q.get('soa') === 'packs';
    return !!q.get(p.param);
  }
  function add(k){
    var p = P[k], q = load(); if (!q.toString()) q.set('cc', '1');
    if (p.add) { var l = adds(q); if (l.indexOf(p.add) < 0) l.push(p.add); q.set('add', l.join(',')); }
    if (p.param) q.set(p.param, p.val);
    save(q);
  }
  function removeKey(k){
    var q = load();
    if (k === 'cc') return save(new URLSearchParams());
    if (P[k] && P[k].add) { var l = adds(q).filter(function(x){ return x !== P[k].add; }); l.length ? q.set('add', l.join(',')) : q.delete('add'); }
    else if (k === 'soa') q.set('soa', 'none');
    else q.delete(P[k] ? P[k].param : k);
    save(q);
  }
  function items(q){
    q = q || load(); if (!q.toString()) return [];
    var out = [['cc', 'Command Centre', P.cc.c]], s = q.get('soa');
    if (s === 'all' || s === 'packs') out.push(['soa', s === 'packs' ? 'SOA packs' : 'All SOAs', P.soa.c]);
    adds(q).forEach(function(a){ var k = Object.keys(P).filter(function(x){ return P[x].add === a; })[0]; if (k) out.push([k, P[k].name, P[k].c]); });
    [['brand', 'brand'], ['web', 'web'], ['mkt', 'mkt']].forEach(function(g){ var v = q.get(g[0]); if (v && NAMES[v]) out.push([g[1], NAMES[v], P[g[1]].c]); });
    if (q.get('docs') === '1') out.push(['docs', P.docs.name, P.docs.c]);
    return out;
  }
  function openProduct(k){
    var key = P[k] && P[k].sheet || k; close(); closePhone();
    location.href = window.BUNYA_PAGES[key] || 'index.html#p=' + key;
  }

  /* ── Pieces ── */
  function addBtn(k){ var on = has(k); return '<button type="button" class="n3-add' + (on ? ' on' : '') + '" data-n3-add="' + k + '" aria-pressed="' + on + '" aria-label="' + (on ? 'Remove ' : 'Add ') + P[k].name + '"><span class="p">' + svg('plus') + '</span><span class="t">' + svg('tick') + '</span></button>'; }
  function tile(k, d){
    var p = P[k], pic = p.img ? '<div class="sc"><img src="' + (p.img.indexOf('/') > -1 ? '' : IMG) + p.img + '" alt="" loading="lazy"></div>' : p.phone ? '<div class="ph"></div>' : '<div class="gl">' + svg(p.glyph) + '</div>';
    return '<div class="n3-tile st" style="--d:' + d + ';--c:' + p.c + ';--g:' + p.g + '">' + '<div class="pic">' + pic + '</div>' +
      '<button type="button" class="open" data-n3-open="' + k + '"><b>' + p.name + '</b><small>' + p.head + '</small><em>' + p.price + '</em></button></div>';
  }
  /* 10 Nov 2026 (Lee): the menu follows Build your Bunya: the base, the features, the add-ons, then proof and pricing. */
  var FEATS = [['ff', 'Fact find'], ['pf', 'Portfolio'], ['ins', 'Insurance needs'], ['mod', 'Strategy and modelling'], ['cmp', 'Platform comparisons'], ['soa', 'SOA generator'], ['aud', 'File Audit']];
  var SECS = [
    { key: 'cc', label: 'Command Centre', html: function(){
      return '<div class="n3-grid">' +
        '<div class="n3-col st" style="--d:0"><h4>1 · The base, in every firm</h4><div class="n3-big">' +
          '<button type="button" data-n3-open="cc" style="--c:' + P.cc.c + '">Command Centre</button>' +
          ['notes', 'reviews'].map(function(k){ return '<button type="button" data-n3-open="' + k + '" style="--c:' + P[k].c + '">' + P[k].name + '</button>'; }).join('') +
          '<button type="button" data-n3-open="care" style="--c:#5EEAD4">Care <small>support, updates, your portal</small></button><button type="button" data-n3-open="shape" style="--c:#F0ABFC">Bunya Shape <small>change it yourself</small></button></div></div>' +
        '<div class="n3-col st" style="--d:2"><h4>Find out more</h4><div class="n3-small"><a href="how-it-works.html">How it works</a><a href="security-your-data.html">Security and your data</a><a href="getting-started.html">Getting started</a><a href="faq.html">Questions</a></div></div>' +
        '<div class="n3-feature st" style="--d:3;--c:#5EEAD4;--g:rgba(45,212,191,.5)"><div><span class="k">From $3 per household</span><b>Every client. One place.</b><a class="n3-cc-link" href="command-centre.html">See Command Centre</a></div>' +
          '<div class="sc"><img src="assets/cc/today.webp" alt="" loading="lazy"></div><div class="acts" data-n3-cc></div></div></div>';
    } },
    { key: 'ae', label: 'Advice Engine', html: function(){
      return '<div class="n3-grid">' +
        '<div class="n3-col st" style="--d:0"><h4>2 · The features, pick what you need</h4><div class="n3-big n3-mid">' +
          FEATS.map(function(f){ return '<a href="' + (window.BUNYA_FEATURE_PAGES[f[0]] || 'advice-engine.html#' + f[0]) + '" style="--c:#93C5FD">' + f[1] + '</a>'; }).join('') + '</div></div>' +
        '<div class="n3-col st" style="--d:2"><h4>Or take it all</h4><div class="n3-small"><a href="advice-engine.html">The whole Advice Engine</a><a href="build.html?soa=all">Build yours with it</a><a href="pricing.html">Pricing</a></div></div>' +
        '<div class="n3-feature st" style="--d:3;--c:#93C5FD;--g:rgba(96,165,250,.5)"><div><span class="k">Every feature, $2 a household</span><b>Every SOA, drafted.</b><a class="n3-cc-link" href="advice-engine.html">See the Advice Engine</a></div>' +
          '<div class="sc"><img src="assets/soa/ready.webp" alt="" loading="lazy"></div><div class="acts"><a class="n3-pill" href="build.html?soa=all">Build yours</a></div></div></div>';
    } },
    { key: 'apps', label: 'Apps', html: function(){
      return '<div class="n3-tiles" style="--cols:6">' + ['portal', 'bhq', 'field', 'rev', 'voice', 'vault'].map(tile).join('') + '</div>' +
        '<div class="n3-foot st" style="--d:6"><span>3 · The add-ons. Add them now or later.</span><a href="build.html">Build yours</a></div>';
    } },
    { key: 'cust', label: 'Customers', html: function(){
      return '<div class="n3-grid" style="grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr)">' +
        '<figure class="n3-quote st" style="--d:0;margin:0"><q>This is a game changer for a role like mine.</q><figcaption class="who"><img src="assets/falcon-charlotte-omeara.webp" alt="" loading="lazy"><span><b>Charlotte O’Meara</b>Falcon Financial Advisers</span></figcaption></figure>' +
        '<div class="n3-col st" style="--d:1"><h4>Customers</h4><div class="n3-big"><a href="case-studies.html">Customer stories</a><a href="watch.html">Watch Bunya</a><a href="blog.html">Insights</a><a href="security-your-data.html">Security and your data</a></div></div>' +
        '<div class="n3-col st" style="--d:2"><h4>Company</h4><div class="n3-small"><a href="about.html">About Bunya</a><a href="booking.html#contact">Contact</a><a href="tel:1300286922">1300 286 922</a></div></div></div>';
    } },
    { key: 'price', label: 'Pricing', html: function(){
      return '<div class="n3-grid">' +
        '<div class="n3-col st" style="--d:0"><h4>Pricing</h4><div class="n3-big"><a href="build.html" style="--c:#5EEAD4">Build yours</a><a href="pricing.html">Pricing</a><button type="button" data-n3-open="svc" style="--c:#A5B4FC">Make it yours <small>brand and documents</small></button><a href="website-marketing.html" style="--c:#F9A8D4">Website and marketing <small>$8,500, then $1,500 a month</small></a></div></div>' +
        '<div class="n3-col st" style="--d:2"><h4>Before you start</h4><div class="n3-small"><a href="how-it-works.html">How it works</a><a href="getting-started.html">Getting started</a><a href="faq.html">Questions</a><a href="booking.html">Book a demo</a></div></div>' +
        '<div class="n3-feature st" style="--d:3;--c:#5EEAD4;--g:rgba(45,212,191,.5)"><div><span class="k">From $3 per household a month</span><b>Pay only for what your firm uses.</b><a class="n3-cc-link" href="build.html">See your price</a></div>' +
          '<div class="sc"><img src="assets/concept/home.webp" alt="" loading="lazy"></div><div class="acts"><a class="n3-pill" href="build.html">Build yours</a><a class="n3-pill ghost" href="booking.html">Book a demo</a></div></div></div>';
    } }
  ];

  /* ── Mount ── */
  var logo = root.getAttribute('data-logo') || 'assets/84374dbcdaa8.svg';
  root.innerHTML =
    '<div class="n3-bar"><a class="n3-logo" href="index.html" aria-label="Bunya AI home"><img src="' + logo + '" alt="Bunya AI" width="120" height="26"></a>' +
      '<nav class="n3-main" aria-label="Main">' + SECS.map(function(s){ return '<button type="button" data-n3="' + s.key + '" aria-expanded="false" aria-controls="n3-panel">' + s.label + '</button>'; }).join('') + '</nav>' +
      '<div class="n3-right"><div class="n3-yb" id="n3-yb" hidden><button type="button" class="n3-yb-b" id="n3-yb-b" aria-expanded="false" aria-controls="n3-yb-pop">' +
          '<i>' + svg('bag') + '<span class="c" id="n3-yb-c"></span></i><span class="l">Your Bunya</span><b id="n3-yb-r"></b><small>a household</small></button>' +
          '<div class="n3-yb-pop" id="n3-yb-pop" role="dialog" aria-label="Your Bunya"></div><div class="n3-yb-toast" id="n3-yb-toast" role="status" aria-live="polite"></div></div>' +
        '<button type="button" class="n3-ic" data-n3-search aria-label="Search (⌘K)">' + svg('search') + '</button>' +
        '<a class="n3-book" href="booking.html">Book a demo</a><a class="n3-demo" href="build.html">Build yours</a><button type="button" class="n3-menu" aria-expanded="false">Menu</button></div></div>' +
    '<div class="n3-panel" id="n3-panel">' + SECS.map(function(s){ return '<div class="n3-sec" data-sec="' + s.key + '"></div>'; }).join('') + '</div>' +
    '<div class="n3-veil"></div>' +
    '<div class="n3-search" id="n3-search" role="dialog" aria-modal="true" aria-label="Search"><div class="n3-sbox"><div class="n3-sin">' + svg('search') +
      '<input id="n3-q" type="search" placeholder="Search products, pages and questions" autocomplete="off" aria-controls="n3-res"><kbd>esc</kbd></div><div class="n3-res" id="n3-res" role="listbox"></div></div></div>' +
    '<div class="n3-phone" id="n3-phone" role="dialog" aria-modal="true" aria-label="Menu"><div class="n3-ph-top"><img src="' + logo + '" alt="Bunya AI"><button type="button" class="n3-ic" data-n3-pclose aria-label="Close menu">' + svg('x') + '</button></div>' +
      '<div class="n3-ph-body" id="n3-ph-body"></div><div class="n3-ph-foot"><a class="pri" href="build.html" id="n3-ph-build">Build yours</a><a href="booking.html">Book a demo</a></div></div>';

  var panel = root.querySelector('.n3-panel'), btns = root.querySelectorAll('[data-n3]'), cur = null, timer = null;
  function paintSec(k){ var s = SECS.filter(function(x){ return x.key === k; })[0], el = panel.querySelector('[data-sec="' + k + '"]'); el.innerHTML = s.html(); paintCC(); return el; }
  function paintCC(){
    var el = root.querySelector('[data-n3-cc]'); if (!el) return;
    el.innerHTML = '<a class="n3-pill" href="build.html">Build yours</a><button type="button" class="n3-pill ghost" data-n3-open="cc">Learn more</button>';
  }
  function open(k){
    clearTimeout(timer); closeBag();
    if (cur !== k) {
      [].forEach.call(panel.children, function(s){ s.classList.toggle('on', s.dataset.sec === k); });
      var el = paintSec(k);
      [].forEach.call(btns, function(b){ b.setAttribute('aria-expanded', String(b.dataset.n3 === k)); });
      cur = k; root.classList.add('open');
      requestAnimationFrame(function(){ panel.style.height = el.offsetHeight + 'px'; });
    }
  }
  function close(){ cur = null; root.classList.remove('open'); panel.style.height = '0px'; [].forEach.call(btns, function(b){ b.setAttribute('aria-expanded', 'false'); }); }
  function later(){ clearTimeout(timer); timer = setTimeout(close, 220); }
  [].forEach.call(btns, function(b){
    b.addEventListener('mouseenter', function(){ clearTimeout(timer); timer = setTimeout(function(){ open(b.dataset.n3); }, cur ? 0 : 110); });
    b.addEventListener('click', function(){ cur === b.dataset.n3 ? close() : open(b.dataset.n3); });
    b.addEventListener('keydown', function(e){ if (e.key === 'ArrowDown') { e.preventDefault(); open(b.dataset.n3); var f = panel.querySelector('.n3-sec.on button, .n3-sec.on a'); if (f) f.focus(); } });
  });
  root.querySelector('.n3-main').addEventListener('mouseleave', later);
  panel.addEventListener('mouseenter', function(){ clearTimeout(timer); });
  panel.addEventListener('mouseleave', later);
  root.querySelector('.n3-veil').addEventListener('click', close);

  function $(id){ return document.getElementById(id); }

  /* ── Your Bunya pill: the running price per household, and the list as a drop-down ── */
  var L = window.bunyaList, yb = $('n3-yb'), ybB = $('n3-yb-b'), ybPop = $('n3-yb-pop'), ybToast = $('n3-yb-toast'), toastT = null;
  function rateTxt(v){ return '$' + (Math.round(v * 100) / 100).toFixed(2); }
  function plusTxt(v){ v = Math.round(v * 100) / 100; return '+' + (v < 1 ? Math.round(v * 100) + 'c' : '$' + (v % 1 ? v.toFixed(2) : v)); }
  function moneyTxt(v){ return '$' + Math.round(v).toLocaleString('en-AU'); }
  function row(name, sub, price, x){
    return '<div class="r"><span><b>' + name + '</b>' + (sub ? '<small>' + sub + '</small>' : '') + '</span><em>' + price + '</em>' +
      (x ? '<button type="button" class="x" data-yb-x="' + x + '" aria-label="Remove ' + name + '">' + svg('x') + '</button>' : '<span class="x"></span>') + '</div>';
  }
  function popHTML(s){
    var feats = s.ae ? row('The whole Advice Engine', 'Every feature, with Client Portal and the Brand Document Pack', plusTxt(L.AE), 'ae:')
      : L.FEAT.filter(function(x){ return s.feat[x[0]]; }).map(function(x){ return row(x[1], '', plusTxt(x[2]), 'feat:' + x[0]); }).join('');
    var nudge = !s.ae && L.featSum(s) >= L.AE ? '<div class="nudge"><p><b>The whole Advice Engine is $2 a household.</b> Every feature, plus Client Portal, for less than your picks.</p>' +
      '<button type="button" data-yb-ae>Switch to it</button></div>' : '';
    var picked = L.APPS.filter(function(x){ return s.add[x[0]]; }), all = picked.length && L.every(s);
    var apps = picked.length ? '<div class="grp"><p class="lbl">Apps <span>a month, for your firm</span></p>' +
      picked.map(function(x){ return row(x[1], '', L.inAE(s, x[0]) ? 'Included' : all ? '' : moneyTxt(x[2]), 'add:' + x[0]); }).join('') +
      (all ? '<div class="r tot"><span><b>Every app, together</b></span><em>' + moneyTxt(L.apps(s)) + '</em><span class="x"></span></div>'
           : picked.length > 1 ? '<div class="r tot"><span><b>Apps</b></span><em>' + moneyTxt(L.apps(s)) + '</em><span class="x"></span></div>' : '') + '</div>' : '';
    return '<div class="hd"><b>Your Bunya</b><button type="button" class="clr" data-yb-clear>Clear</button></div>' +
      '<div class="grp">' + row('Command Centre', 'The base: Meeting Notes, Review Packs with fee consent (97c a client review), Care and Bunya Shape', '$3', '') + feats + '</div>' +
      '<div class="sum"><span>Per household, a month</span><strong>' + rateTxt(L.rate(s)) + '</strong></div>' + nudge + apps +
      '<a class="go" href="build.html">Build yours' + svg('arrow') + '</a>' +
      '<p class="fine">Set your number of households in Build your Bunya to see your monthly total. Draft prices, A$ ex GST, with a $500 monthly minimum.</p>';
  }
  function paintBag(e){
    var s = L.read(), n = L.count(s);
    yb.hidden = !n;
    if (!n) { closeBag(); return; }
    $('n3-yb-r').textContent = rateTxt(L.rate(s));
    $('n3-yb-c').textContent = n;
    ybB.setAttribute('aria-label', 'Your Bunya: ' + n + ' picked, ' + rateTxt(L.rate(s)) + ' a household a month');
    if (ybB.getAttribute('aria-expanded') === 'true') ybPop.innerHTML = popHTML(s);
    var d = e && e.detail;
    if (d && d.kind) {
      yb.classList.remove('bump'); void yb.offsetWidth; yb.classList.add('bump');
      if (d.on && ybB.getAttribute('aria-expanded') !== 'true') {
        var name = d.kind === 'ae' ? 'the whole Advice Engine' : d.kind === 'feat' ? L.FEAT.filter(function(x){ return x[0] === d.key; })[0][1] : L.APPS.filter(function(x){ return x[0] === d.key; })[0][1];
        ybToast.innerHTML = '<b>Added ' + name + '</b>' + (d.extra > 0 ? ', with what it needs' : '') + '<span>' +
          (d.kind === 'add' ? (L.inAE(s, d.key) ? 'Included with the Advice Engine' : 'A flat price a month for your firm') : 'Now ' + rateTxt(L.rate(s)) + ' a household a month') + '</span>';
        ybToast.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function(){ ybToast.classList.remove('on'); }, 2600);
      }
    }
  }
  function openBag(){ close(); closePhone(); ybToast.classList.remove('on'); ybPop.innerHTML = popHTML(L.read()); ybB.setAttribute('aria-expanded', 'true'); yb.classList.add('open'); }
  function closeBag(){ if (!ybB) return; ybB.setAttribute('aria-expanded', 'false'); yb.classList.remove('open'); }
  ybB.addEventListener('click', function(){ ybB.getAttribute('aria-expanded') === 'true' ? closeBag() : openBag(); });
  ybPop.addEventListener('click', function(e){
    var b; e.stopPropagation(); // the list repaints under the click, so the outside-click check below must not see it
    if ((b = e.target.closest('[data-yb-x]'))) { var p = b.dataset.ybX.split(':'); L.toggle(p[0], p[1]); }
    else if (e.target.closest('[data-yb-ae]')) L.toggle('ae');
    else if (e.target.closest('[data-yb-clear]')) L.clear();
  });
  document.addEventListener('click', function(e){ if (yb.classList.contains('open') && !yb.contains(e.target)) closeBag(); });
  document.addEventListener('bunya:build', paintBag);
  addEventListener('storage', function(e){ if (e.key === 'bunya.build') paintBag(); });
  paintBag();

  /* ── Search (⌘K or /) ── */
  var PAGES = [
    ['Build your Bunya', 'Choose what your firm needs and see your price', 'build.html', 'arrow', '#5EEAD4', 'pricing price cost build quote'],
    ['Book a demo', 'One meeting, with your firm in mind', 'booking.html', 'arrow', '#fff', 'demo meeting call talk'],
    ['Security and your data', 'Your own Microsoft 365. You own and control it.', 'security-your-data.html', 'page', '#A5B4FC', 'security data privacy microsoft tenant'],
    ['Customer stories', 'Falcon Financial Advisers and more', 'case-studies.html', 'page', '#F9A8D4', 'customers case study falcon'],
    ['Watch Bunya', 'Our latest ad and a film of every part of Bunya', 'watch.html', 'page', '#67E8F9', 'watch video film ad commercial pam bali demo'],
    ['Getting started', 'Setup, moving in and training', 'getting-started.html', 'page', '#6EE7B7', 'setup onboarding migration training start'],
    ['Pricing', 'From $3 per household a month, and what each piece costs', 'pricing.html', 'page', '#5EEAD4', 'pricing price cost compare models household'],
    ['How it works', 'One household, from first meeting to annual review', 'how-it-works.html', 'page', '#93C5FD', 'how it works journey story process'],
    ['Website and marketing', 'A website in your brand, then Found & Cited every month', 'website-marketing.html', 'page', '#F9A8D4', 'website seo aeo search google ai answers marketing found cited'],
    ['Insights', 'Guides for advice firms: meeting notes, SOAs, reviews, evidence', 'blog.html', 'page', '#67E8F9', 'insights blog articles guides checklist meeting notes soa review migration'],
    ['Contact', 'info@bunya.ai · 1300 286 922', 'booking.html#contact', 'page', '#FDE68A', 'contact phone email support']
  ];
  var QS = [
    ['How is it priced?', 'Per client household, from $3 a month. A couple counts as one.', 'pricing.html', 'price pricing household'],
    ['Where does our client data live?', 'In your firm’s own Microsoft 365. You own and control it.', 'security-your-data.html', 'data microsoft security'],
    ['Does it write our Statements of Advice?', 'Yes, with the Advice Engine, in your template. Your adviser approves every SOA.', 'p:soa', 'soa statement advice draft'],
    ['Do clients know the meeting is recorded?', 'Consent settings are agreed with your firm before rollout.', 'p:notes', 'recording consent meeting'],
    ['Does anything go out without a person checking it?', 'No. Nothing is used or sent until someone approves it.', 'faq.html', 'approve approval human check']
  ];
  var srch = $('n3-search'), qIn = $('n3-q'), res = $('n3-res'), hits = [], sel = 0;
  function match(text, q){ return q.split(/\s+/).every(function(w){ return text.toLowerCase().indexOf(w) > -1; }); }
  function runSearch(){
    var q = qIn.value.trim().toLowerCase(), groups = [];
    var prods = Object.keys(P).filter(function(k){ return !q || match(P[k].name + ' ' + P[k].head, q); }).slice(0, q ? 8 : 5)
      .map(function(k){ return { t: P[k].name, d: P[k].head, go: 'p:' + k, ic: P[k].glyph || 'arrow', c: P[k].c }; });
    var pages = PAGES.filter(function(p){ return !q || match(p[0] + ' ' + p[1] + ' ' + p[5], q); }).slice(0, q ? 6 : 3).map(function(p){ return { t: p[0], d: p[1], go: p[2], ic: p[3], c: p[4] }; });
    var qs = QS.filter(function(x){ return q && match(x[0] + ' ' + x[1] + ' ' + x[3], q); }).map(function(x){ return { t: x[0], d: x[1], go: x[2], ic: 'q', c: '#93C5FD' }; });
    if (prods.length) groups.push(['Products', prods]); if (pages.length) groups.push(['Pages', pages]); if (qs.length) groups.push(['Questions', qs]);
    hits = []; groups.forEach(function(g){ hits = hits.concat(g[1]); }); sel = 0;
    var n = -1;
    res.innerHTML = hits.length ? groups.map(function(g){
      return '<h5>' + g[0] + '</h5>' + g[1].map(function(h){ n++; return '<button type="button" role="option" data-hit="' + n + '" class="' + (n === 0 ? 'on' : '') + '" style="--c:' + h.c + '"><i>' + svg(h.ic) + '</i><span><b>' + h.t + '</b><small>' + h.d + '</small></span><span class="go">' + (h.go.indexOf('p:') === 0 ? 'Open' : 'Go') + ' ↵</span></button>'; }).join('');
    }).join('') : '<div class="n3-empty">Nothing found for “' + qIn.value + '”. Try “consent”, “portal” or “pricing”.</div>';
  }
  function go(h){ if (!h) return; closeSearch(); if (h.go.indexOf('p:') === 0) openProduct(h.go.slice(2)); else location.href = h.go; }
  function openSearch(){ close(); closeBag(); closePhone(); srch.classList.add('on'); qIn.value = ''; runSearch(); setTimeout(function(){ qIn.focus(); }, 30); }
  function closeSearch(){ srch.classList.remove('on'); }
  qIn.addEventListener('input', runSearch);
  qIn.addEventListener('keydown', function(e){
    var bs = res.querySelectorAll('[data-hit]');
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + bs.length) % Math.max(bs.length, 1); [].forEach.call(bs, function(b, i){ b.classList.toggle('on', i === sel); if (i === sel) b.scrollIntoView({ block: 'nearest' }); }); }
    if (e.key === 'Enter') { e.preventDefault(); go(hits[sel]); }
  });
  res.addEventListener('click', function(e){ var b = e.target.closest('[data-hit]'); if (b) go(hits[+b.dataset.hit]); });
  srch.addEventListener('click', function(e){ if (e.target === srch) closeSearch(); });

  /* ── Phone ── */
  var phone = $('n3-phone'), menuBtn = root.querySelector('.n3-menu');
  function phoneHTML(){
    var group = function(label, keys, links, d){
      return '<div class="n3-acc" style="--d:' + d + '"><button type="button" aria-expanded="false">' + label + svg('plus') + '</button><div class="in"><div>' +
        keys.map(function(k){ var p = P[k]; return '<div class="item" style="--c:' + p.c + '"><span class="dot"></span><button type="button" class="nm" data-n3-open="' + k + '"><b>' + p.name + '</b><small>' + (p.price || p.head) + '</small></button>' + '' + '</div>'; }).join('') +
        (links ? '<div class="links">' + links + '</div>' : '') + '</div></div></div>';
    };
    return '<button type="button" class="n3-ph-search" data-n3-search>' + svg('search') + 'Search products, pages and questions</button>' +
      group('Command Centre', ['cc', 'notes', 'reviews'], '<a href="how-it-works.html">How it works</a><a href="care.html">Care</a><a href="bunya-shape.html">Bunya Shape</a>', 0) +
      '<div class="n3-acc" style="--d:1"><button type="button" aria-expanded="false">Advice Engine' + svg('plus') + '</button><div class="in"><div><div class="links">' +
        '<a href="advice-engine.html">The whole Advice Engine</a>' + FEATS.map(function(f){ return '<a href="' + (window.BUNYA_FEATURE_PAGES[f[0]] || 'advice-engine.html#' + f[0]) + '">' + f[1] + '</a>'; }).join('') + '</div></div></div></div>' +
      group('Apps', ['portal', 'bhq', 'field', 'rev', 'voice', 'vault'], null, 2) +
      '<div class="n3-acc" style="--d:3"><button type="button" aria-expanded="false">Customers' + svg('plus') + '</button><div class="in"><div><div class="links"><a href="case-studies.html">Customer stories</a><a href="watch.html">Watch Bunya</a><a href="blog.html">Insights</a><a href="security-your-data.html">Security and your data</a><a href="about.html">About Bunya</a><a href="booking.html#contact">Contact</a></div></div></div></div>' +
      '<div class="n3-acc" style="--d:4"><button type="button" aria-expanded="false">Pricing' + svg('plus') + '</button><div class="in"><div><div class="links"><a href="build.html">Build yours</a><a href="pricing.html">Pricing</a><a href="brand-website-marketing.html">Make it yours</a><a href="website-marketing.html">Website and marketing</a><a href="getting-started.html">Getting started</a><a href="faq.html">Questions</a></div></div></div></div>';
  }
  function openPhone(){ $('n3-ph-body').innerHTML = phoneHTML(); phone.classList.add('on'); menuBtn.setAttribute('aria-expanded', 'true'); document.documentElement.style.overflow = 'hidden'; }
  function closePhone(){ if (!phone.classList.contains('on')) return; phone.classList.remove('on'); menuBtn.setAttribute('aria-expanded', 'false'); document.documentElement.style.overflow = ''; }
  menuBtn.addEventListener('click', openPhone);
  phone.addEventListener('click', function(e){
    if (e.target.closest('[data-n3-pclose]')) return closePhone();
    var a = e.target.closest('.n3-acc > button');
    if (a) { var acc = a.parentNode, on = !acc.classList.contains('open'); acc.classList.toggle('open', on); a.setAttribute('aria-expanded', on); }
  });

  /* ── Shared clicks ── */
  root.addEventListener('click', function(e){
    var b;
    if ((b = e.target.closest('[data-n3-search]'))) return openSearch();
    if ((b = e.target.closest('[data-n3-open]'))) return openProduct(b.dataset.n3Open);
  });
  document.addEventListener('keydown', function(e){
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); srch.classList.contains('on') ? closeSearch() : openSearch(); }
    else if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
    else if (e.key === 'Escape') { closeSearch(); close(); closeBag(); closePhone(); }
  });
  addEventListener('resize', function(){ if (cur) panel.style.height = panel.querySelector('.n3-sec.on').offsetHeight + 'px'; });
  paintCC();
  window.bunyaNav = { openSearch: openSearch };
})();
