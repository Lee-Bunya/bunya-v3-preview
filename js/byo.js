/* Build your Bunya, the site's own page (11 Nov 2026). Markup from tools/v3/build_byo.py; needs js/nav3.js first
   (window.bunyaList = the site's shortlist of features and apps). Accounts: localStorage 'bunya.hh'.
   Extras (brand, documents, website, SEO & AI Search, support level X.lvl, social media done for you, pay yearly): sessionStorage 'bunya.byo'.
   Prices: Daniel's configurator and his 12 Nov 2026 reply (draft, A$ ex GST): $500 a month minimum, accounts above 1,000 16% less, paying yearly
   takes 10% off the Bunya fee, setup $7,249, client reviews 97c each and SOAs drafted for you $153 each on Command Centre.
   Own it (17 Nov 2026, Lee: bring it back with the payment terms): Command Centre $104,020, or $178,321 with the whole
   Advice Engine, any size up to 1,500 accounts, setup included, paid in full or over 12, 24 or 36 months at no extra
   charge (Daniel's configurator), then support and updates $1,497 a month (email support; Shape, Build or Build Team on top, same as subscribers). Apps and
   marketing stay a price a month. X.own, X.term in sessionStorage 'bunya.byo'; ?pay=own&term=24 from other pages. */
(function(){
  'use strict';
  var L = window.bunyaList; if (!L) return;
  var $ = function(id){ return document.getElementById(id); };
  var money = function(v){ return '$' + Math.round(v).toLocaleString('en-AU'); };
  var rate = function(v){ v = Math.round(v * 100) / 100; return '$' + (v % 1 ? v.toFixed(2) : v); };
  var cents = function(v){ var c = Math.round(v * 100); return c < 100 ? c + 'c' : rate(c / 100); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MIN = 500, BAND = 1000, OFF = .16, YEAR = .1, SETUP = 7249, FC = 2243, FCP = 3734, ADS = 744, SMM = 4867, WEB = 14882, DOCS = 7441, COLL = 4500, SOA = 153, REVIEW = .97;
  var OWN_CC = 104020, OWN_AE = 178321, CARE = 1497, TERMS = [0, 12, 24, 36];
  /* 17 Nov 2026 (Daniel, Lee): support and Bunya Build are one ladder. Standard (email, 36 business hours) is included, and
     is the $1,497 support and updates when owning. Shape $1,503, Build $5,274 and Build Team $12,055 a month sit on top, the
     same for subscribers and owners. Build Team is chosen for 1 to 12 months. X.lvl: '' | shape | build | team. */
  var LV = { shape: 1503, build: 5274, team: 12055 }, LVN = { shape: 'Shape', build: 'Build', team: 'Build Team' }, FREE_SHAPE = 1;
  /* 17 Nov 2026 (Lee): Shape is always included for subscribers; owners get its first month, then $1,503 a month. */
  function freeMonth(){ return lvl() === 'build' || (lvl() === 'shape' && !!X.own); }
  function shapeIn(){ return lvl() === 'shape' && !X.own; }
  /* 17 Nov 2026 (Lee): Shape and Build show their price, with "Included for 1 month" under it. The month is the ongoing
     price; a "Your first month" line shows it with the free month taken off. */
  /* 17 Nov 2026 (Daniel, Lee: "3 months", then "1 month"): three levels, not four. Email support is included underneath; Shape is the
     starting level and is included for the first month, then $1,503 a month (or drop back to email support). */
  var BRAND = { kit: ['Brand kit, set up by our designer', 1800], guide: ['Brand guidelines', 4500], refresh: ['Brand refresh', 7500] };
  var APPN = {}; L.APPS.forEach(function(a){ APPN[a[0]] = a; });
  // 12 Nov 2026 (Daniel, "partner tools"): some features use a partner's tool, which the provider bills the practice for directly.
  // Ask which tool and show its cost up front, kept out of our price per account. Three totals: to Bunya, to other
  // providers (about) and all in (about). Each choice has "We already have one", which adds nothing.
  var PT = {
    ins: ['Insurance needs and quotes', [['omni', 'OmniLife', 'From $500 a month, covering 50 clients']]],
    mod: ['Strategy and modelling', [['rm', 'RetireMap', 'Per user a month: $325 for 1 to 2 users, $275 for 3 to 5, $245 for 6 to 9, $225 for 10 or more']]],
    cmp: ['Platform comparisons', [['hub', 'HUB24 Platform Research', 'Coming soon', true], ['cw', 'Chant West', 'Coming soon', true]]]
  };
  function rmRate(u){ return u >= 10 ? 225 : u >= 6 ? 245 : u >= 3 ? 275 : 325; }
  function ptPick(k){ var p = (X.pt || {})[k], live = PT[k][1].filter(function(o){ return !o[3]; });
    if (p && (p === 'have' || live.some(function(o){ return o[0] === p; }))) return p;
    return live.length ? live[0][0] : 'have'; }
  function ptUsers(){ return Math.max(1, Math.min(50, +((X.pt || {}).users) || 2)); }
  function ptKeys(s){ return X.own && !s.ae ? [] : ['ins', 'mod', 'cmp'].filter(function(k){ return s.feat[k]; }); }
  function ptLines(s){
    var out = [];
    if (X.own && !s.ae) return out;
    if (s.feat.ins) out.push(ptPick('ins') === 'omni' ? ['OmniLife', 500, 'from $500 a month'] : ['Insurance tool: you already have one', 0, '']);
    if (s.feat.mod) { var u = ptUsers(); out.push(ptPick('mod') === 'rm' ? ['RetireMap, ' + u + ' user' + (u > 1 ? 's' : ''), u * rmRate(u), u + ' × ' + money(rmRate(u)) + ' a month'] : ['Modelling tool: you already have one', 0, '']); }
    if (s.feat.cmp) out.push(['Comparison tool: you already have one (HUB24 and Chant West coming soon)', 0, '']);
    return out;
  }
  function ptCost(s){ return ptLines(s).reduce(function(t, l){ return t + l[1]; }, 0); }

  // State
  var X = {}, n = 500, sized = false;
  try { X = JSON.parse(sessionStorage.getItem('bunya.byo') || '{}') || {}; } catch (e) { X = {}; }
  try { var h = +localStorage.getItem('bunya.hh'); if (h >= 100 && h <= 1500) { n = Math.round(h / 10) * 10; sized = true; } } catch (e) {}
  function YR(){ return !!X.year && !X.own; }
  function bm(){ return Math.max(1, Math.min(12, +X.bm || 1)); }
  /* 17 Nov 2026 (Lee): Microsoft costs in their own section. Billed by Microsoft, estimates from the pricing page: Power
     Apps Premium about $29.90 a person a month, AI credits from about $50 a month, Teams Phone about $12 a person a month
     with Bunya Voice. Microsoft 365 licences the firm already has. X.msu = people using Bunya (default 5). */
  function msu(){ return Math.max(1, Math.min(200, +X.msu || 5)); }
  /* Client Portal runs on Power Pages, pay as you go: about A$5.50 for each client who signs in that month (Microsoft's
     authenticated-user meter, US$4; Australian price from a local Microsoft partner, 17 Nov 2026). X.mcu, default 50. */
  function mcu(){ return Math.max(0, Math.min(5000, X.mcu === undefined ? 50 : +X.mcu || 0)); }
  function msCost(s){ var p = msu(), pa = p * 29.9, ai = 50, tp = s.add.voice ? p * 12 : 0, portal = !!s.add.portal || L.inAE(s, 'portal'), cu = mcu(), pp = portal ? cu * 5.5 : 0;
    return { p: p, pa: pa, ai: ai, tp: tp, portal: portal, cu: cu, pp: pp, total: pa + ai + tp + pp }; }
  function lvl(){ return X.lvl === 'build' || X.lvl === 'team' ? X.lvl : 'shape'; }
  function lvlP(){ return shapeIn() ? 0 : LV[lvl()]; }
  function lvlName(){ return LVN[lvl()] + (shapeIn() ? ' <small>included with your subscription</small>' : freeMonth() ? ' <small>your first month is included</small>' : '') + (lvl() === 'team' ? ' <small>for ' + bm() + (bm() === 1 ? ' month' : ' months') + ', ' + money(bm() * LV.team) + ' in all</small>' : ''); }
  function saveX(){ try { sessionStorage.setItem('bunya.byo', JSON.stringify(X)); } catch (e) {} }
  function saveN(){ try { localStorage.setItem('bunya.hh', n); } catch (e) {} }

  // Ad tracking tags, kept for the quote form (this address, or earlier in the visit)
  var TAGS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'], tags = {};
  try { tags = JSON.parse(sessionStorage.getItem('bunya.utm') || '{}') || {}; } catch (e) {}
  (function(){ var q = new URLSearchParams(location.search), any = false; TAGS.forEach(function(k){ if (q.get(k)) { tags[k] = q.get(k); any = true; } }); if (any) try { sessionStorage.setItem('bunya.utm', JSON.stringify(tags)); } catch (e) {} })();

  // The site's older build links (and Daniel's configurator addresses) become picks
  (function(){
    var q = new URLSearchParams(location.search); if (!q.toString()) return;
    var s = L.read(), soa = q.get('soa'), model = q.get('model');
    if ((soa === 'all' || soa === 'packs' || model === 'ae') && !s.ae) L.toggle('ae', '');
    else if ((soa === 'none' || model === 'cc') && s.ae) L.toggle('ae', '');
    (q.get('feat') || '').split(',').forEach(function(k){ if (k && L.FEAT.some(function(f){ return f[0] === k; }) && !L.has('feat', k)) L.toggle('feat', k); });
    (q.get('add') || '').split(',').concat(q.get('voice') === '1' ? ['voice'] : []).forEach(function(k){ if (APPN[k] && !L.has('add', k)) L.toggle('add', k); });
    if (q.get('n')) { n = Math.max(100, Math.min(1500, Math.round(+q.get('n') / 10) * 10 || 500)); sized = true; saveN(); }
    if (q.get('bill') === 'year') X.year = true;
    if (BRAND[q.get('brand')]) X.brand = q.get('brand');
    if (q.get('docs') === '1') X.docs = true;
    if (q.get('coll') === '1') X.coll = true;
    if (q.get('web') || q.get('mkt') || q.get('wm') === '1') X.web = true;
    if (q.get('pay') === 'own') { X.own = true; if (TERMS.indexOf(+q.get('term')) > -1) X.term = +q.get('term'); }
    else if (q.get('pay') === 'sub') X.own = false;
    if (q.get('fc') === '1') { X.fc = true; X.fcp = false; } else if (q.get('fc') === 'plus') { X.fcp = true; X.fc = false; }
    saveX();
    history.replaceState(null, '', location.pathname + location.hash);
  })();

  function banded(r){ return r * (Math.min(n, BAND) + Math.max(0, n - BAND) * (1 - OFF)); }
  function calc(){
    var s = L.read(), r = L.rate(s) * (YR() ? 1 - YEAR : 1), raw = banded(r), fee = Math.max(MIN, raw), apps = L.apps(s);
    var mkt = lvlP() + (X.fc ? FC : 0) + (X.fcp ? FCP : 0) + (X.ads ? ADS : 0) + (X.smm ? SMM : 0);
    var svc = (X.brand ? BRAND[X.brand][1] : 0) + (X.docs ? DOCS : 0) + (X.coll ? COLL : 0) + (X.web ? WEB : 0);
    var base = { s: s, r: r, apps: apps, pt: ptCost(s), ptOn: ptKeys(s).length > 0, svc: svc };
    if (X.own) {
      var own = s.ae ? OWN_AE : OWN_CC, term = TERMS.indexOf(X.term) > 0 ? X.term : 0, instal = term ? own / term : 0, care = CARE;
      return Object.assign(base, { own: own, term: term, instal: instal, care: care, fee: 0, raw: 0, atMin: false, extra: care + mkt,
        monthly: instal + care + apps + mkt, after: care + apps + mkt, once: svc + (term ? 0 : own) });
    }
    return Object.assign(base, { raw: raw, fee: fee, atMin: raw < MIN, extra: mkt, monthly: fee + apps + mkt, once: SETUP + svc });
  }


  // The left screen (11 Nov 2026, Lee: "do option 1"): Daniel's Command Centre screens, shown screen-only from
  // build-daniel.html?stage=1 and driven through its window.bbStage hook. Each step and tick shows its screen, in the
  // firm's brand once they add their website. "Watch the film" plays the matching film over it.
  // FILM: [film, caption, line]; VIEW: the screen on Daniel's stage.
  var FILM = {
    size: ['clients-and-accounts', 'Command Centre', 'Every account, with the trusts, SMSFs and companies they own.'],
    base: ['advice-pipeline', 'Command Centre', 'Every client, every meeting and every piece of advice in one place.'],
    ae: ['soa-generator', 'The Advice Engine', 'From the meeting to the draft SOA, each step prepared for your team to check.'],
    ff: ['fact-find', 'Fact find', 'Filled from the meeting, the documents and the client portal.'],
    pf: ['portfolio', 'Portfolio', 'Their investments and super, pulled together.'],
    ins: ['insurance-needs', 'Insurance needs and quotes', 'Cover needs from the fact find, with comparison quotes.'],
    mod: ['strategy-and-modelling', 'Strategy and modelling', 'Retirement, cash flow and super scenarios.'],
    cmp: ['platform-comparison', 'Platform comparisons', 'Platforms and products, side by side.'],
    soa: ['soa-generator', 'SOA generator', 'Every SOA drafted in your template. Your adviser approves it.'],
    aud: ['file-audit', 'File Audit', 'Every file checked before it goes out.'],
    portal: ['review-and-sign', 'Client Portal', 'Clients review and sign their advice in their own space.'],
    bhq: ['broadcast-hq', 'Broadcast HQ', 'One idea, every channel, each version approved.'],
    field: ['', 'Field Notes', 'Meetings away from the office, noted.'],
    rev: ['revenue-import', 'Revenue Import', 'Revenue, matched to each client.'],
    voice: ['', 'Bunya Voice', 'Every call, on the client’s file.'],
    yours: ['', 'Your brand', 'Your logo and colours across Command Centre and your Client Portal.'],
    docs: ['', 'Your documents', 'Your advice documents and client collateral, in your brand.'],
    web: ['website-to-lead', 'Your website', 'A website in your brand, with enquiries landing as leads.'],
    support: ['bunya-care', 'Support', 'Help when your team needs it, and a Bunya that keeps improving.'],
    build: ['bunya-shape', 'Build and Build Team', 'Your ideas, built into your system with you.'],
    sum: ['meetings-and-tasks', 'Your Bunya', 'Ready for your team, in your Microsoft 365.']
  };
  // Daniel's per-feature and per-app screens are his films (in Bunya's colours), so ticks keep his branded overview
  // screens on show and the feature's own film sits behind "Watch the film".
  var VIEW = { size: 'cc', base: 'cc', ae: 'ae', ff: 'ae', pf: 'ae', ins: 'ae', mod: 'ae', cmp: 'ae', soa: 'ae', aud: 'ae',
    portal: 'apps', bhq: 'apps', field: 'field', rev: 'ae', voice: 'voice', yours: 'brand', docs: 'docs', web: 'services', support: 'support', build: 'build', sum: 'summary' };
  var vid = $('byo-v'), img = $('byo-i'), screen = $('byo-screen'), frameEl = $('byo-stage'), watch = $('byo-watch');
  var stage = null, keyNow = 'base', pushT = 0;
  function stageState(view){
    var s = L.read(), o = { n: sized ? n : 500, ae: s.ae, feat: Object.keys(s.feat), add: Object.keys(s.add).filter(function(k){ return k !== 'voice'; }),
      voice: !!s.add.voice, brand: X.brand || '', docs: !!(X.docs || X.coll), web: !!(X.web || X.fc || X.fcp || X.ads), site: window.byoBrand ? window.byoBrand.site : '' };
    if (view) o.view = view;
    return o;
  }
  function push(view){ if (stage) try { stage.apply(stageState(view)); } catch (e) {} }
  function pushSoon(){ clearTimeout(pushT); pushT = setTimeout(function(){ push(); }, 120); }
  function stopFilm(){ vid.pause(); vid.hidden = true; img.hidden = true; screen.classList.remove('filming'); watch.textContent = 'Watch the film'; }
  function playFilm(){
    var f = FILM[keyNow] || FILM.base; if (!f[0]) return;
    vid.poster = 'assets/films/posters/' + f[0] + '.webp';
    if (vid.getAttribute('src') !== 'assets/films/' + f[0] + '.mp4') vid.src = 'assets/films/' + f[0] + '.mp4';
    vid.hidden = false; screen.classList.add('filming'); watch.textContent = 'Back to the screen';
    if (!reduce) { var p = vid.play(); if (p && p.catch) p.catch(function(){}); }
    (window.dataLayer = window.dataLayer || []).push({ event: 'byo_film', byo_film: f[0] });
  }
  function film(key){
    if (key === 'brand') key = 'yours';
    if (!FILM[key] || key === keyNow) return;
    keyNow = key;
    var f = FILM[key];
    $('byo-cap-t').textContent = f[1]; $('byo-cap-d').textContent = f[2];
    watch.hidden = !f[0];
    stopFilm();
    if (stage) push(VIEW[key]); else if (screen.classList.contains('nolive')) playFilm();
  }
  watch.addEventListener('click', function(){ screen.classList.contains('filming') ? stopFilm() : playFilm(); });
  function live(){
    try { stage = frameEl.contentWindow.bbStage || null; } catch (e) { stage = null; }
    if (stage) { screen.classList.add('live'); screen.classList.remove('nolive'); push(VIEW[keyNow]); }
  }
  addEventListener('message', function(e){ if (e.origin === location.origin && e.data && e.data.bbStage === 'ready') live(); });
  frameEl.addEventListener('load', live);
  setTimeout(function(){ if (!stage) { screen.classList.add('nolive'); playFilm(); } }, 9000);
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) film(e.target.dataset.film); }); }, { rootMargin: '-40% 0px -50% 0px' });
    [].forEach.call(document.querySelectorAll('.byo-step[data-film]'), function(el){ io.observe(el); });
  }
  keyNow = ''; film('base');

  // Paint
  var was = null, chgT = 0;
  function on(el, v, inc){ el.setAttribute('aria-pressed', String(v || !!inc)); el.classList.toggle('on', v || !!inc); el.disabled = !!inc; var r = el.closest('.pr-row'); if (r) { r.classList.toggle('on', v || !!inc); r.classList.toggle('inc', !!inc); } }
  /* 17 Nov 2026 (Lee: "too long now"): steps 2 to 7 open and close from their heading; 1 (size) and 8 (Your Bunya) stay
     open. A closed step shows what's picked in it, in one line. */
  var COL = ['byo-base', 'byo-feats', 'byo-apps', 'byo-mkt', 'byo-yours', 'byo-support', 'byo-micro'];
  COL.forEach(function(id){
    var sec = $(id), gh = sec && sec.querySelector('.pr-gh'); if (!gh) return;
    sec.classList.add('byo-col'); gh.setAttribute('role', 'button'); gh.tabIndex = 0; gh.setAttribute('aria-expanded', 'false');
    var pk = document.createElement('span'); pk.className = 'byo-pick'; gh.querySelector('div').appendChild(pk);
    var ch = document.createElement('i'); ch.className = 'pr-chev'; ch.setAttribute('aria-hidden', 'true'); gh.appendChild(ch);
  });
  function openStep(id, open){
    var sec = $(id); if (!sec || !sec.classList.contains('byo-col')) return;
    var o = open === undefined ? !sec.classList.contains('open') : open;
    sec.classList.toggle('open', o); sec.querySelector('.pr-gh').setAttribute('aria-expanded', String(o));
  }
  function picked(sec){
    var mode = X.own ? '.byo-sub-only' : '.byo-own-only';
    return [].filter.call(sec.querySelectorAll('[data-tk][aria-pressed="true"],[data-tk][aria-checked="true"]'), function(b){ return !b.closest(mode); })
      .map(function(b){ return b.dataset.name; }).filter(Boolean);
  }
  function short(names){ return !names.length ? 'None yet' : names.length > 3 ? names.slice(0, 2).join(', ') + ' and ' + (names.length - 2) + ' more' : names.join(', '); }
  function paintPicks(s){
    var t = {
      'byo-base': X.own ? 'Yours to own, with support and updates' : '$3 an account, with email support',
      'byo-feats': X.own ? (s.ae ? 'Command Centre and the whole Advice Engine' : 'Command Centre on its own') : s.ae ? 'The whole Advice Engine, ' + rate(L.AE) + ' an account' : short(picked($('byo-feats'))),
      'byo-micro': 'About ' + money(msCost(s).total) + ' a month, ' + msu() + (msu() === 1 ? ' person' : ' people'),
      'byo-support': shapeIn() ? 'Shape, included with your subscription' : LVN[lvl()] + ', ' + money(lvlP()) + ' a month' + (freeMonth() ? ', first month included' : lvl() === 'team' ? ', for ' + bm() + (bm() === 1 ? ' month' : ' months') : '')
    };
    COL.forEach(function(id){ var pk = $(id) && $(id).querySelector('.byo-pick'); if (pk) pk.textContent = t[id] || short(picked($(id))); });
  }
  function paint(){
    var c = calc(), s = c.s;
    pushSoon();
    // Size
    $('byo-hh').value = n; $('byo-n').textContent = n >= 1500 ? '1,500 or more' : n.toLocaleString('en-AU');
    [].forEach.call(document.querySelectorAll('[data-hh]'), function(b){ b.setAttribute('aria-pressed', String(sized && +b.dataset.hh === n)); });
    // Ticks
    setTimeout(function(){ paintPicks(s); }, 0);
    [].forEach.call(document.querySelectorAll('[data-tk]'), function(b){
      var t = b.dataset.tk.split(':'), k = t[1];
      if (t[0] === 'feat') on(b, !!s.feat[k]);
      else if (t[0] === 'ae') on(b, s.ae);
      else if (t[0] === 'add') { var inc = L.inAE(s, k); on(b, !!s.add[k] && !inc, inc); var pc = b.closest('.pr-row').querySelector('.pc'); pc.innerHTML = inc ? '<b>Included</b>' : '<b>' + money(APPN[k][2]) + '</b> a month'; }
      else if (t[0] === 'brand') { var sel = (X.brand || 'none') === k; b.setAttribute('aria-checked', String(sel)); b.classList.toggle('on', sel); b.closest('.pr-row').classList.toggle('on', sel); }
      else if (t[0] === 'x') on(b, !!X[k]);
      else if (t[0] === 'lvl') { var sl = k === lvl(); b.setAttribute('aria-checked', String(sl)); b.classList.toggle('on', sl); b.closest('.pr-row').classList.toggle('on', sl); }
      else if (t[0] === 'own') { var so = (k === 'ae') === !!s.ae; b.setAttribute('aria-checked', String(so)); b.classList.toggle('on', so); b.closest('.pr-row').classList.toggle('on', so); }
    });
    document.body.classList.toggle('is-own', !!X.own);
    [].forEach.call(document.querySelectorAll('[data-mode]'), function(b){ if (b.getAttribute('role') !== 'radio') return; var sel = (b.dataset.mode === 'own') === !!X.own; b.setAttribute('aria-checked', String(sel)); b.classList.toggle('on', sel); });
    [].forEach.call(document.querySelectorAll('[data-term]'), function(b){ var sel = +b.dataset.term === (c.term || 0); b.setAttribute('aria-checked', String(sel)); b.classList.toggle('on', sel); });
    [].forEach.call(document.querySelectorAll('[data-bill]'), function(b){ var sel = (b.dataset.bill === 'year') === !!X.year; b.setAttribute('aria-checked', String(sel)); b.classList.toggle('on', sel); });
    // 17 Nov 2026 (Lee): choose how many months of Build Team, 1 to 12
    var bmEl = $('byo-bm');
    if (bmEl) { bmEl.hidden = lvl() !== 'team'; var m = bm(); bmEl.innerHTML = lvl() === 'team' ? '<span>For how many months?</span><span class="byo-pt-step"><button type="button" data-bm="-1" aria-label="One month fewer"' + (m <= 1 ? ' disabled' : '') + '>−</button><output aria-live="polite">' + m + '</output><button type="button" data-bm="1" aria-label="One month more"' + (m >= 12 ? ' disabled' : '') + '>+</button></span><em>' + m + (m === 1 ? ' month' : ' months') + ' × ' + money(LV.team) + ' = ' + money(m * LV.team) + '. Then choose any level.</em>' : ''; }
    // 12 Nov 2026 (Lee): the pack and the website are designed from the firm's brand. No brand tier? Ask.
    var picks = [X.docs, X.coll, X.web].filter(Boolean).length, nb = $('byo-needs'), needBrand = picks > 0 && !X.brand;
    nb.hidden = !needBrand;
    if (needBrand) nb.innerHTML = '<p><b>' + (picks > 1 ? 'These need' : 'This needs') + ' your brand.</b> ' + (picks > 1 ? 'They’re' : 'It’s') + ' designed from your brand guidelines: logo files, fonts and colours. If you don’t have them, pick a brand kit, guidelines or refresh above.</p>' +
      '<button type="button" class="byo-own' + (X.ownbrand ? ' on' : '') + '" data-ownbrand aria-pressed="' + !!X.ownbrand + '"><i></i>We already have brand guidelines</button>' +
      (X.ownbrand ? '<p class="byo-dim">Thanks. We’ll check your brand files before we start.</p>' : '');
    paintPT(s, c);
    // Command Centre usage
    // Pay as you go: 97c a review and $153 an SOA on Command Centre; each shows Free once a plan covers it
    var freeRev = s.ae, freeSoa = s.ae || !!s.feat.soa;
    $('byo-pg-rev-p').innerHTML = freeRev ? '<b>Free</b>' : '<b>97c</b> a review';
    $('byo-pg-rev-s').textContent = freeRev ? 'Every client review is included with the whole Advice Engine.' : 'Each time Bunya prepares a client review. Free with the whole Advice Engine.';
    $('byo-pg-soa-p').innerHTML = freeSoa ? '<b>Free</b>' : '<b>$153</b> an SOA';
    $('byo-pg-soa-s').textContent = freeSoa ? 'Your SOAs are drafted by the SOA generator, so there’s no charge.' : 'Each SOA we draft for you. Free with the SOA generator or the whole Advice Engine.';
    $('byo-pg-rev').classList.toggle('inc', freeRev); $('byo-pg-soa').classList.toggle('inc', freeSoa);
    // Advice Engine nudge
    var fs = L.featSum(s), alc = L.FEAT.reduce(function(t, f){ return t + f[2]; }, 0);
    $('byo-nudge').innerHTML = s.ae
      ? '<p><b>You have the whole Advice Engine.</b> ' + rate(L.AE) + ' an account instead of ' + rate(alc) + ', with every SOA and client review and Client Portal included.</p><button type="button" class="byo-link" data-tk="ae:">Pick features one by one instead</button>'
      : fs >= 2 ? '<p><b>The whole Advice Engine costs less.</b> Your features add ' + rate(fs) + ' an account; all eight are $2.51, with every SOA and client review and Client Portal included.' + (sized ? ' That saves about ' + money(banded(fs - L.AE) * (X.year ? 1 - YEAR : 1)) + ' a month.' : '') + '</p><button type="button" class="sx-btn" data-tk="ae:">Take it all</button>'
      : '<p><b>Or take the whole Advice Engine for $2.51 an account.</b> All eight features, plus every SOA and client review and Client Portal.</p><button type="button" class="sx-btn ghost" data-tk="ae:">Take it all</button>';
    // Your Bunya
    var L1 = [], L2 = [], line = function(a, b, cls){ return '<div class="' + (cls || '') + '"><dt>' + a + '</dt><dd>' + b + '</dd></div>'; };
    var what = s.ae ? 'Command Centre and the whole Advice Engine' : 'Command Centre', known = sized || X.own;
    if (X.own) {
      if (c.term) L1.push(line('Bunya, to own <small>' + what + ', ' + money(c.own) + ' over ' + c.term + ' months</small>', money(c.instal)));
      L1.push(line('Support and updates <small>email support</small>', money(c.care)));
    } else L1.push(line('Bunya fee <small>' + (sized ? n.toLocaleString('en-AU') + ' accounts × ' + rate(c.r) + (c.atMin ? ', the $500 minimum' : '') : 'choose your accounts') + '</small>', sized ? money(c.fee) : rate(c.r) + ' an account'));
    if (L.every(s) && Object.keys(s.add).length) L1.push(line('Every app', money(c.apps)));
    else L.APPS.forEach(function(a){ if (s.add[a[0]]) L1.push(line(a[1], L.inAE(s, a[0]) ? 'Included' : money(a[2]))); });
    if (X.smm) L1.push(line('Broadcast HQ + social media, done for you', money(SMM)));
    L1.push(line(lvlName(), shapeIn() ? 'Included' : money(lvlP())));
    if (X.fc) L1.push(line('SEO &amp; AI Search', money(FC)));
    if (X.fcp) L1.push(line('SEO &amp; AI Search Plus', money(FCP)));
    if (X.ads) L1.push(line('Google Ads, managed <small>ad spend billed at cost</small>', money(ADS)));
    var per = function(v){ return known ? money(YR() ? v * 12 : v) : '—'; };
    L1.push(line((c.ptOn ? 'Paid to Bunya, a ' : 'A ') + (YR() ? 'year' : 'month') + (X.own && c.term ? ' for ' + c.term + ' months' : ''), per(c.monthly), 'tot us'));
    if (freeMonth() && known && !YR()) L1.push(line('Your first month <small>with ' + LVN[lvl()] + ' included</small>', money(c.monthly - lvlP())));
    if (X.own && c.term) L1.push(line('Then, a month', money(c.after)));
    var L3 = [];
    if (c.ptOn) {
      ptLines(s).forEach(function(l){ L3.push(line(l[0] + (l[2] ? ' <small>' + l[2] + (l[1] ? ', billed by them' : '') + '</small>' : ''), l[1] ? 'about ' + money(YR() ? l[1] * 12 : l[1]) : '$0')); });
      L3.push(line('Paid to partners, about', money(YR() ? c.pt * 12 : c.pt)));
    }
    if (X.own && !c.term) L2.push(line('Bunya, to own <small>' + what + ', any size up to 1,500 accounts</small>', money(c.own)));
    L2.push(line('Standard setup', X.own ? 'Included' : money(SETUP)));
    if (X.brand) L2.push(line(BRAND[X.brand][0], money(BRAND[X.brand][1])));
    if (X.docs) L2.push(line('Brand Document Pack, by our designer', money(DOCS)));
    else L2.push(line('AI-made document pack', 'Included'));
    if (X.coll) L2.push(line('Client Collateral', money(COLL)));
    if (X.web) L2.push(line('Website design', money(WEB)));
    if ((X.docs || X.coll || X.web) && !X.brand && !X.ownbrand) L2.push(line('<small>Needs a brand kit, guidelines or refresh</small>', ''));
    L2.push(line('Once', money(c.once), 'tot us'));
    var use = s.ae ? '' : '<p class="byo-dim">As you use them: client reviews 97c each' + (s.feat.soa ? '.' : ', and SOAs we draft for you $153 each.') + '</p>';
    var ms = msCost(s), M = [], ppl = function(v){ return v + (v === 1 ? ' person' : ' people'); };
    var step = function(label, key, v, lo, hi, by){ return '<div class="byo-pt-u"><span>' + label + '</span><span class="byo-pt-step"><button type="button" data-' + key + '="-' + by + '" aria-label="Fewer"' + (v <= lo ? ' disabled' : '') + '>−</button><output aria-live="polite">' + v + '</output><button type="button" data-' + key + '="' + by + '" aria-label="More"' + (v >= hi ? ' disabled' : '') + '>+</button></span></div>'; };
    M.push(line('Microsoft 365 licences <small>Business Standard or Premium, the plan your firm has today</small>', 'As today'));
    M.push(line('Power Apps Premium <small>' + ppl(ms.p) + ' × about $29.90</small>', 'about ' + money(ms.pa)));
    M.push(line('AI credits <small>pay as you go, in your own tenant</small>', 'from about ' + money(ms.ai)));
    if (ms.portal) M.push(line('Client Portal on Power Pages <small>pay as you go: ' + ms.cu + ' clients signing in × about $5.50</small>', 'about ' + money(ms.pp)));
    if (s.add.voice) M.push(line('Teams Phone <small>for Bunya Voice, ' + ppl(ms.p) + ' × about $12</small>', 'about ' + money(ms.tp)));
    M.push(line('Paid to Microsoft, about', money(ms.total) + ' a month', 'tot'));
    $('byo-ms').innerHTML = step('How many people will use Bunya?', 'msu', ms.p, 1, 200, 1) +
      (ms.portal ? step('Clients signing in to the portal each month?', 'mcu', ms.cu, 0, 5000, 10) + '<p class="byo-dim">Microsoft charges the portal only for each client who signs in that month.</p>' : '') +
      '<dl class="byo-dl">' + M.join('') + '</dl>';
    // 17 Nov 2026 (Lee): a cleaner Your Bunya, broken up by who you pay
    var H = function(t){ return '<p class="byo-dl-h">' + t + '</p>'; }, DL = function(a){ return '<dl class="byo-dl">' + a.join('') + '</dl>'; };
    var LM = [line('Microsoft licences and usage <small>' + ppl(ms.p) + (ms.portal ? ', client portal' : '') + ' · see step 8</small>', 'about ' + money(YR() ? ms.total * 12 : ms.total))];
    var LA = [line('All in, about <small>Bunya' + (c.ptOn ? ', partners' : '') + ' and Microsoft</small>', known ? money(YR() ? (c.monthly + (c.pt || 0) + ms.total) * 12 : c.monthly + (c.pt || 0) + ms.total) + (YR() ? ' a year' : ' a month') : '—', 'tot')];
    $('byo-lines').innerHTML = H('Paid to Bunya') + DL(L1) + (L3.length ? H('Paid to partners') + DL(L3) : '') + H('Paid to Microsoft') + DL(LM) + DL(LA) + H('Once') + DL(L2) + use;
    $('byo-live').innerHTML = ['Launch support: a named engineer for ' + (s.ae ? 45 : 30) + ' days', 'Licensee Green-Light Pack', 'Team Quick-Start Kit', 'Email support and every update', X.own ? 'Shape for your first month' : 'Bunya Shape, included'].map(function(t){ return '<li>' + t + '</li>'; }).join('');
    paintQuote(c);
    // Bottom bar
    $('byo-r').textContent = X.own ? money(c.term ? c.instal : c.own) : rate(c.r);
    $('byo-r-u').textContent = X.own ? (c.term ? 'a month for ' + c.term + ' months, to own it' : 'once, to own it') : 'an account a month';
    $('byo-m').innerHTML = known ? (YR() ? money(c.monthly * 12) + '<em> a year</em>' : money(c.monthly) + '<em> a month</em>') : 'Your month';
    var bits = [];
    if (X.own) bits.push('Support and updates ' + money(CARE));
    if (c.apps) bits.push('+ ' + money(c.apps) + ' apps');
    if (X.smm) bits.push('+ ' + money(SMM) + ' Broadcast HQ + social media');
    if (!shapeIn()) bits.push('+ ' + money(lvlP()) + ' ' + LVN[lvl()] + (lvl() === 'team' ? ' for ' + bm() + (bm() === 1 ? ' month' : ' months') : ''));
    if (X.fc) bits.push('+ ' + money(FC) + ' SEO & AI Search');
    if (X.fcp) bits.push('+ ' + money(FCP) + ' SEO & AI Search Plus');
    if (X.ads) bits.push('+ ' + money(ADS) + ' Google Ads');
    if (c.pt) bits.push('+ about ' + money(YR() ? c.pt * 12 : c.pt) + ' to partners');
    var svc = c.svc;
    if (svc) bits.push('+ ' + money(svc) + ' once');
    $('byo-m-d').textContent = X.own ? (c.term ? money(c.instal) + ' a month for ' + c.term + ' months, then ' + money(c.after) + ' a month' : money(c.own) + ' once') + ' · ' + bits.join(' · ') : (sized ? n.toLocaleString('en-AU') + ' accounts × ' + rate(c.r) + (c.atMin ? ' (the $500 minimum)' : ' = ' + money(c.fee)) : 'Choose your number of client accounts') + (bits.length ? ' · ' + bits.join(' · ') : '');
    var now = { r: X.own ? 0 : c.r, m: c.monthly - (X.own ? 0 : c.fee), o: c.once, own: !!X.own }, note = '';
    if (was && was.own !== now.own) was = null;
    if (was && Math.abs(now.r - was.r) > .001) note = (now.r > was.r ? '+' : '−') + cents(Math.abs(now.r - was.r)) + ' an account';
    else if (was && now.m !== was.m) note = (now.m > was.m ? '+' : '−') + money(Math.abs(now.m - was.m)) + ' a month';
    else if (was && now.o !== was.o) note = (now.o > was.o ? '+' : '−') + money(Math.abs(now.o - was.o)) + ' once';
    was = now;
    if (note) { var ch = $('byo-chg'); ch.textContent = note; ch.classList.add('on'); clearTimeout(chgT); chgT = setTimeout(function(){ ch.classList.remove('on'); }, 2200); }
  }

  // Partner tools: ask which one, under the features that need it
  function paintPT(s, c){
    var el = $('byo-pt'), ks = ptKeys(s);
    el.hidden = !ks.length && !s.feat.pf;
    if (el.hidden) { el.innerHTML = ''; return; }
    var h = '<p class="byo-pt-h"><b>Partner tools</b>Some features use a partner’s tool. Our partners bill your practice directly, so their cost isn’t in your Bunya price.</p>';
    ks.forEach(function(k){
      var d = PT[k], pick = ptPick(k);
      h += '<div class="byo-pt-r"><p class="byo-pt-n">' + d[0] + '<span>Which tool will you use?</span></p><div class="byo-pt-o" role="radiogroup" aria-label="' + d[0] + ': which tool">' +
        d[1].concat([['have', 'We already have one', 'Adds nothing']]).map(function(o){
          var sel = pick === o[0];
          return '<button type="button" role="radio" aria-checked="' + sel + '" class="byo-pt-b' + (sel ? ' on' : '') + '" data-pt="' + k + ':' + o[0] + '"' + (o[3] ? ' disabled' : '') + '><b>' + o[1] + '</b><small>' + o[2] + '</small></button>';
        }).join('') + '</div>';
      if (k === 'mod' && pick === 'rm') {
        var u = ptUsers();
        h += '<div class="byo-pt-u"><span>How many RetireMap users?</span><span class="byo-pt-step"><button type="button" data-ptu="-1" aria-label="One fewer user"' + (u <= 1 ? ' disabled' : '') + '>−</button><input type="number" class="byo-pt-in" min="1" max="50" inputmode="numeric" value="' + u + '" aria-label="RetireMap users"><button type="button" data-ptu="1" aria-label="One more user">+</button></span><em>' + u + ' × ' + money(rmRate(u)) + ' = about ' + money(u * rmRate(u)) + ' a month</em></div>';
      }
      h += '</div>';
    });
    if (s.feat.pf) h += '<div class="byo-pt-r"><p class="byo-pt-n">Portfolio<span>Reads your clients’ accounts from CFS Edge and HUB24. No extra cost to show yet.</span></p></div>';
    if (ks.length) h += '<p class="byo-pt-t">Paid to partners: <b>' + (c.pt ? 'about ' + money(c.pt) + ' a month' : 'nothing extra') + '</b></p>';
    el.innerHTML = h;
  }

  // Email me this quote: everything in the build, prefilled
  function quoteOf(c){
    var s = c.s, feats = s.ae ? ['The whole Advice Engine (all eight features)'] : L.FEAT.filter(function(f){ return s.feat[f[0]]; }).map(function(f){ return f[1] + ' +' + cents(f[2]); });
    var apps = L.APPS.filter(function(a){ return s.add[a[0]]; }).map(function(a){ return a[1] + (L.inAE(s, a[0]) ? ' (included)' : ' ' + money(a[2]) + ' a month'); });
    var yours = [];
    if (X.brand) yours.push(BRAND[X.brand][0] + ' ' + money(BRAND[X.brand][1]) + ' once'); else yours.push('AI brand kit, from your website (included)');
    if (X.docs) yours.push('Brand Document Pack, by our designer ' + money(DOCS) + ' once'); else yours.push('AI-made document pack (included)');
    if (X.coll) yours.push('Client Collateral ' + money(COLL) + ' once');
    if (X.web) yours.push('Website design ' + money(WEB) + ' once');
    if (X.fc) yours.push('SEO & AI Search ' + money(FC) + ' a month');
    if (X.fcp) yours.push('SEO & AI Search Plus ' + money(FCP) + ' a month');
    if (X.smm) yours.push('Broadcast HQ + social media marketing, done for you ' + money(SMM) + ' a month');
    if (X.ads) yours.push('Google Ads managed ' + money(ADS) + ' a month, plus ad spend at cost');
    if ((X.docs || X.coll || X.web) && !X.brand) yours.push(X.ownbrand ? 'Has its own brand guidelines (to check)' : 'Needs a brand kit, guidelines or refresh first');
    var others = ptLines(s).map(function(l){ return l[0] + (l[1] ? ', about ' + money(l[1]) + ' a month' : ''); });
    if (s.feat.pf) others.push('Portfolio reads from CFS Edge and HUB24');
    var more = [];
    more.push(shapeIn() ? 'Shape, included with your subscription' : LVN[lvl()] + ' ' + money(lvlP()) + ' a month' + (freeMonth() ? ', first month included' : '') + (lvl() === 'team' ? ' for ' + bm() + (bm() === 1 ? ' month' : ' months') + ' (' + money(bm() * LV.team) + ')' : ''));
    return {
      households: sized ? n : null, pay: X.own ? 'own, ' + (c.term ? 'over ' + c.term + ' months' : 'in full') : YR() ? 'yearly' : 'monthly',
      rows: (window.byoBrand ? [['Firm website', window.byoBrand.site]] : []).concat([['Accounts', sized ? n.toLocaleString('en-AU') + ' client accounts' : 'Not chosen yet'],
             X.own ? ['How you pay', 'Own it, ' + (c.term ? 'over ' + c.term + ' months' : 'paid in full') + ', setup included'] : ['How you pay', 'Subscribe' + (YR() ? ', paying yearly' : ', paying monthly')],
             ['Command Centre', X.own ? 'Yours to own' : '$3 an account a month'],
             ['Advice Engine', feats.length ? feats.join(', ') : 'None yet'],
             ['Apps', apps.length ? apps.join(', ') : 'None'],
             ['Make it yours', yours.join(', ')]]).concat(others.length ? [['Partner tools (they bill you)', others.join(', ')]] : []).concat(more.length ? [['Support and build', more.join(', ')]] : []),
      totals: (X.own ? [['Bunya, to own', money(c.own) + (c.term ? ', as ' + money(c.instal) + ' a month for ' + c.term + ' months' : ' once')],
               ['Support and updates (email support)', money(c.care) + ' a month'],
               [(c.ptOn ? 'Paid to Bunya, a month' : 'A month') + (c.term ? ' for ' + c.term + ' months' : ''), money(c.monthly)]].concat(c.term ? [['Then, a month', money(c.after)]] : [])
               .concat(c.ptOn ? [['Paid to partners, about', money(c.pt)]] : []).concat([['Paid to Microsoft, about', money(msCost(c.s).total) + ' a month, ' + msu() + ' people'], ['All in, about', money(c.monthly + (c.pt || 0) + msCost(c.s).total) + ' a month']])
               .concat([['Once', money(c.once) + (c.term ? ' (setup included)' : ' (Bunya to own, setup included' + (c.svc ? ', and extras' : '') + ')')]]) : null) || [['Price per account', rate(c.r) + ' a month' + (YR() ? ', paying yearly' : '')],
               [(c.ptOn ? 'Paid to Bunya, ' : '') + (X.year ? 'a year' : 'a month').replace(/^a/, c.ptOn ? 'a' : 'A'), sized ? (X.year ? money(c.monthly * 12) : money(c.monthly)) : 'Depends on your accounts']]
               .concat(c.ptOn ? [['Paid to partners, about', money(X.year ? c.pt * 12 : c.pt)]] : []).concat([['Paid to Microsoft, about', money(msCost(c.s).total) + ' a month, ' + msu() + ' people'], ['All in, about', sized ? money((c.monthly + (c.pt || 0) + msCost(c.s).total) * (X.year ? 12 : 1)) : 'Depends on your accounts']]).concat([
               ['Once', money(c.once) + ' (setup ' + money(SETUP) + (c.once > SETUP ? ' and extras' : '') + ')']]),
      usage: s.ae ? 'Every SOA and client review included.' : 'Client reviews 97c each' + (s.feat.soa ? '.' : '; SOAs we draft for you $153 each.')
    };
  }
  function paintQuote(c){
    var qt = quoteOf(c), row = function(r){ return '<div><dt>' + r[0] + '</dt><dd>' + r[1].replace(/&(?!amp;)/g, '&amp;') + '</dd></div>'; };
    $('byo-q-sum').innerHTML = '<dl>' + qt.rows.map(row).join('') + '</dl><dl class="t">' + qt.totals.map(row).join('') + '</dl><p>' + qt.usage + ' Draft prices, A$ ex GST.</p>';
    var f = $('byo-quote'); if (f) f.elements.quote.value = JSON.stringify(qt);
    var d = $('byo-demo'); if (d) d.elements.build.value = JSON.stringify(qt);
    var s = c.s, picks = s.ae ? ['the whole Advice Engine'] : L.FEAT.filter(function(x){ return s.feat[x[0]]; }).map(function(x){ return x[1]; });
    L.APPS.forEach(function(a){ if (s.add[a[0]]) picks.push(a[1]); });
    var line = (sized ? n.toLocaleString('en-AU') + ' accounts · ' : '') + 'Command Centre' + (picks.length ? ', ' + picks.join(', ') : '') + ' · ' + rate(c.r) + ' an account a month' + (sized ? ' · ' + money(c.monthly) + ' a month' : '');
    if (X.own) line = 'Own it, ' + (c.term ? 'over ' + c.term + ' months' : 'paid in full') + ' · ' + (s.ae ? 'Command Centre and the whole Advice Engine' : 'Command Centre') + L.APPS.filter(function(a){ return s.add[a[0]]; }).map(function(a){ return ', ' + a[1]; }).join('') + ' · ' + money(c.own) + ' · ' + money(c.monthly) + ' a month';
    $('byo-q-line').textContent = X.own ? '· Own it, ' + money(c.own) + (c.term ? ' over ' + c.term + ' months' : '') : '· ' + rate(c.r) + ' an account' + (sized ? ', ' + money(c.monthly) + ' a month' : '');
    $('byo-d-line').textContent = 'Your build: ' + line;
  }

  // Pop-ups: Email me this quote, and Book a demo. Contact details typed in one fill the other (sessionStorage
  // 'bunya.contact'); the firm comes from the website lookup when there is one; the demo's accounts and "what should
  // we show you" come from the build. Not connected yet: on the live site each sends to the team (and the quote emails the visitor).
  var QF = $('byo-quote'), DF = $('byo-demo'), lastFocus = null, CF = ['name', 'email', 'phone', 'firm'];
  [QF, DF].forEach(function(f){ TAGS.forEach(function(k){ if (tags[k]) f.elements[k].value = tags[k]; }); });
  function contact(){ try { return JSON.parse(sessionStorage.getItem('bunya.contact') || '{}') || {}; } catch (e) { return {}; } }
  function fill(f){
    var ct = contact();
    CF.forEach(function(k){ if (!f.elements[k].value && ct[k]) f.elements[k].value = ct[k]; });
    if (!f.elements.firm.value && window.byoBrand && window.byoBrand.found) f.elements.firm.value = window.byoBrand.firm;
    if (f === DF) {
      var s = L.read(), on = { cc: true, ae: s.ae || Object.keys(s.feat).length > 0, brand: !!(X.brand || X.docs || X.coll || X.web || X.fc || X.fcp || window.byoBrand) };
      L.APPS.forEach(function(a){ if (s.add[a[0]]) on[a[0]] = true; });
      if (!f.dataset.touched) [].forEach.call(f.querySelectorAll('[name=show]'), function(c){ c.checked = !!on[c.value]; });
      if (!f.elements.households.value && sized) f.elements.households.value = n;
    }
  }
  [QF, DF].forEach(function(f){
    f.addEventListener('input', function(e){
      if (CF.indexOf(e.target.name) > -1) { var ct = contact(); ct[e.target.name] = e.target.value; try { sessionStorage.setItem('bunya.contact', JSON.stringify(ct)); } catch (x) {} }
      if (e.target.name === 'show') f.dataset.touched = '1';
    });
  });
  function openModal(id){
    var m = $(id), f = m.querySelector('form');
    paintQuote(calc()); fill(f);
    lastFocus = document.activeElement; m.hidden = false; document.documentElement.classList.add('byo-lock');
    var first = [].filter.call(f.querySelectorAll('input[required]'), function(x){ return !x.value; })[0] || f.querySelector('button[type=submit]');
    setTimeout(function(){ first.focus(); }, 30);
    (window.dataLayer = window.dataLayer || []).push({ event: id === 'byo-mq' ? 'byo_quote_open' : 'byo_demo_open' });
  }
  function closeModal(){
    var m = document.querySelector('.byo-modal:not([hidden])'); if (!m) return;
    m.hidden = true; document.documentElement.classList.remove('byo-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  [].forEach.call(document.querySelectorAll('.byo-modal'), function(m){
    m.addEventListener('click', function(e){ if (e.target === m || e.target.closest('[data-close]')) closeModal(); });
  });
  addEventListener('keydown', function(e){ if (e.key === 'Escape') closeModal(); });
  function check(f, emailMsg){
    var el = f.elements;
    if (!el.name.value.trim()) return 'Please add your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.email.value.trim())) return emailMsg;
    if ((el.phone.value.match(/\d/g) || []).length < 8) return 'Please add a phone number we can reach you on.';
    if (!el.firm.value.trim()) return 'Please add your firm’s name.';
    return '';
  }
  function sent(f, ev){
    var c = calc();
    (window.dataLayer = window.dataLayer || []).push({ event: ev, byo_rate: Math.round(c.r * 100) / 100, byo_households: sized ? n : 0, byo_monthly: sized ? Math.round(c.monthly) : 0, byo_optin: f.elements.optin.checked });
    f.querySelector('.byo-q-done').hidden = false; f.querySelector('button[type=submit]').disabled = true;
  }
  QF.addEventListener('submit', function(e){
    e.preventDefault();
    var err = check(QF, 'Please add a work email we can send your quote to.');
    QF.querySelector('.byo-q-err').textContent = err; if (!err) sent(QF, 'byo_quote_submit');
  });
  DF.addEventListener('submit', function(e){
    e.preventDefault();
    var err = check(DF, 'Please add a work email we can reach you on.');
    DF.querySelector('.byo-q-err').textContent = err; if (!err) sent(DF, 'byo_demo_submit');
  });

  // Input
  document.addEventListener('click', function(e){
    var gh = e.target.closest('.byo-col > .pr-gh');
    if (gh && !e.target.closest('a')) { openStep(gh.parentNode.id); return; }
    if (e.target.closest('[data-quote]')) { e.preventDefault(); openModal('byo-mq'); return; }
    // Book a demo on this page (our buttons, the menu's, and any link to booking.html) opens the pop-up, prefilled
    if (e.target.closest('[data-demo], a[href="booking.html"], a.n3-demo')) { e.preventDefault(); openModal('byo-md'); return; }
    if (e.target.closest('[data-ownbrand]')) { X.ownbrand = !X.ownbrand; saveX(); paint(); return; }
    var refocus = function(sel){ var el = document.querySelector(sel); if (el && !el.disabled) el.focus(); };
    var pt = e.target.closest('[data-pt]');
    if (pt) { var pp = pt.dataset.pt.split(':'); X.pt = X.pt || {}; X.pt[pp[0]] = pp[1]; saveX(); paint(); refocus('[data-pt="' + pt.dataset.pt + '"]'); return; }
    var cu = e.target.closest('[data-mcu]');
    if (cu && !cu.disabled) { X.mcu = Math.max(0, Math.min(5000, mcu() + +cu.dataset.mcu)); saveX(); paint(); refocus('[data-mcu="' + cu.dataset.mcu + '"]'); return; }
    var mu = e.target.closest('[data-msu]');
    if (mu && !mu.disabled) { X.msu = Math.max(1, Math.min(200, msu() + +mu.dataset.msu)); saveX(); paint(); refocus('[data-msu="' + mu.dataset.msu + '"]'); return; }
    var bb = e.target.closest('[data-bm]');
    if (bb && !bb.disabled) { X.bm = Math.max(1, Math.min(12, bm() + +bb.dataset.bm)); saveX(); paint(); refocus('[data-bm="' + bb.dataset.bm + '"]'); return; }
    var pu = e.target.closest('[data-ptu]');
    if (pu && !pu.disabled) { X.pt = X.pt || {}; X.pt.users = Math.max(1, Math.min(50, ptUsers() + +pu.dataset.ptu)); saveX(); paint(); refocus('[data-ptu="' + pu.dataset.ptu + '"]'); return; }
    var md = e.target.closest('[data-mode]');
    if (md) {
      X.own = md.dataset.mode === 'own'; saveX(); paint();
      if (md.getAttribute('role') !== 'radio') { var tb = document.querySelector('.byo-mode'); if (tb) tb.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); }
      return;
    }
    var tm = e.target.closest('[data-term]');
    if (tm) { X.term = +tm.dataset.term; X.own = true; saveX(); paint(); return; }
    var ow = e.target.closest('[data-tk^="own:"]');
    if (ow) { e.preventDefault(); if ((ow.dataset.tk === 'own:ae') !== L.read().ae) { if (L.toggle('ae', '')) film(ow.dataset.tk === 'own:ae' ? 'ae' : 'base'); } return; }
    var bl = e.target.closest('[data-bill]');
    if (bl) { X.year = bl.dataset.bill === 'year'; saveX(); paint(); return; }
    var b = e.target.closest('[data-hh]');
    if (b) { n = +b.dataset.hh; sized = true; saveN(); paint(); film('size'); return; }
    b = e.target.closest('[data-tk]'); if (!b || b.disabled) return;
    e.preventDefault();
    var t = b.dataset.tk.split(':'), k = t[1];
    if (t[0] === 'feat' || t[0] === 'add') { if (L.toggle(t[0], k)) film(k); return; }
    if (t[0] === 'ae') { if (L.toggle('ae', '')) film('ae'); return; }
    if (t[0] === 'lvl') { X.lvl = k; saveX(); paint(); if (X.lvl) film(b.closest('.pr-row').dataset.film || 'support'); return; }
    if (t[0] === 'brand') X.brand = k === 'none' ? '' : k;
    else { X[k] = !X[k]; if (X[k] && k === 'fc') X.fcp = false; if (X[k] && k === 'fcp') X.fc = false;
      // 17 Nov 2026 (Lee): the two Broadcast HQs are one or the other
      if (X[k] && k === 'smm' && L.read().add.bhq) { saveX(); L.toggle('add', 'bhq'); } }
    if (t[0] === 'brand' || X[k]) film(b.closest('.pr-row').dataset.film || 'yours');
    if (t[0] === 'brand' && k !== 'none') push('brand');
    saveX(); paint();
  });
  document.addEventListener('change', function(e){
    if (!e.target.classList.contains('byo-pt-in')) return;
    var u = Math.round(+e.target.value); X.pt = X.pt || {}; X.pt.users = Math.max(1, Math.min(50, u || 1)); saveX(); paint();
    var el = document.querySelector('.byo-pt-in'); if (el && document.activeElement === document.body) el.focus();
  });
  $('byo-hh').addEventListener('input', function(){ n = +this.value; sized = true; saveN(); paint(); });
  document.addEventListener('keydown', function(e){ var gh = e.target.closest && e.target.closest('.byo-col > .pr-gh'); if (gh && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openStep(gh.parentNode.id); } });
  document.addEventListener('bunya:build', function(e){ var d = e.detail || {}; if (d.key === 'bhq' && d.on && X.smm) { X.smm = false; saveX(); } paint(); });
  document.addEventListener('bunya:brand', function(){ if (window.byoBrand && window.byoBrandAsked) { keyNow = ''; film('yours'); } push(); paintQuote(calc()); var f = $('byo-quote'); if (window.byoBrand && f && !f.elements.firm.value && window.byoBrand.found) f.elements.firm.value = window.byoBrand.firm; });
  addEventListener('storage', paint);
  paint();
})();
