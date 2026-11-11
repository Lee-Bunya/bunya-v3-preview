/* Build your Bunya, the site's own page (11 Nov 2026). Markup from tools/v3/build_byo.py; needs js/nav3.js first
   (window.bunyaList = the site's shortlist of features and apps). Households: localStorage 'bunya.hh'.
   Extras (brand, documents, website, Found & Cited, Care Premium, Bunya Build, pay yearly): sessionStorage 'bunya.byo'.
   Prices: Daniel's configurator (draft, A$ ex GST): $500 a month minimum, households above 1,000 16% less, paying yearly
   takes 10% off the Bunya fee, setup $7,249, client reviews 97c each and SOAs drafted for you $153 each on Command Centre. */
(function(){
  'use strict';
  var L = window.bunyaList; if (!L) return;
  var $ = function(id){ return document.getElementById(id); };
  var money = function(v){ return '$' + Math.round(v).toLocaleString('en-AU'); };
  var rate = function(v){ v = Math.round(v * 100) / 100; return '$' + (v % 1 ? v.toFixed(2) : v); };
  var cents = function(v){ var c = Math.round(v * 100); return c < 100 ? c + 'c' : rate(c / 100); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MIN = 500, BAND = 1000, OFF = .16, YEAR = .1, SETUP = 7249, PREM = 1997, BUILD = 12000, FC = 1500, WEB = 8500, DOCS = 12500, DOCS_AE = 4500, SOA = 153, REVIEW = .97;
  var BRAND = { kit: ['Brand kit, checked by our designer', 1800], guide: ['Brand guidelines', 4500], refresh: ['Brand refresh', 7500] };
  var APPN = {}; L.APPS.forEach(function(a){ APPN[a[0]] = a; });

  // State
  var X = {}, n = 500, sized = false;
  try { X = JSON.parse(sessionStorage.getItem('bunya.byo') || '{}') || {}; } catch (e) { X = {}; }
  try { var h = +localStorage.getItem('bunya.hh'); if (h >= 100 && h <= 1500) { n = Math.round(h / 10) * 10; sized = true; } } catch (e) {}
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
    if (q.get('web') || q.get('mkt') || q.get('wm') === '1') X.web = true;
    if (q.get('pay') === 'own') X.own = true;
    saveX();
    history.replaceState(null, '', location.pathname + location.hash);
  })();

  function banded(r){ return r * (Math.min(n, BAND) + Math.max(0, n - BAND) * (1 - OFF)); }
  function calc(){
    var s = L.read(), r = L.rate(s) * (X.year ? 1 - YEAR : 1), raw = banded(r), fee = Math.max(MIN, raw), apps = L.apps(s);
    var extra = (X.prem ? PREM : 0) + (X.build ? BUILD : 0) + (X.fc ? FC : 0);
    var once = SETUP + (X.brand ? BRAND[X.brand][1] : 0) + (X.docs ? (s.ae ? DOCS_AE : DOCS) : 0) + (X.web ? WEB : 0);
    return { s: s, r: r, raw: raw, fee: fee, atMin: raw < MIN, apps: apps, extra: extra, monthly: fee + apps + extra, once: once };
  }

  // The left screen (11 Nov 2026, Lee: "do option 1"): Daniel's Command Centre screens, shown screen-only from
  // build-daniel.html?stage=1 and driven through its window.bbStage hook. Each step and tick shows its screen, in the
  // firm's brand once they add their website. "Watch the film" plays the matching film over it.
  // FILM: [film, caption, line]; VIEW: the screen on Daniel's stage.
  var FILM = {
    size: ['clients-and-accounts', 'Command Centre', 'Every household, with the trusts, SMSFs and companies they own.'],
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
    support: ['bunya-care', 'Care', 'Help when your team needs it, and a Bunya that keeps improving.'],
    build: ['bunya-shape', 'Bunya Build', 'Your roadmap of bigger changes, made with you.'],
    sum: ['meetings-and-tasks', 'Your Bunya', 'Ready for your team, in your Microsoft 365.']
  };
  // Daniel's per-feature and per-app screens are his films (in Bunya's colours), so ticks keep his branded overview
  // screens on show and the feature's own film sits behind "Watch the film".
  var VIEW = { size: 'cc', base: 'cc', ae: 'ae', ff: 'ae', pf: 'ae', ins: 'ae', mod: 'ae', cmp: 'ae', soa: 'ae', aud: 'ae',
    portal: 'apps', bhq: 'apps', field: 'field', rev: 'apps', voice: 'voice', yours: 'brand', docs: 'docs', web: 'services', support: 'support', build: 'build', sum: 'summary' };
  var vid = $('byo-v'), img = $('byo-i'), screen = $('byo-screen'), frameEl = $('byo-stage'), watch = $('byo-watch');
  var stage = null, keyNow = 'base', pushT = 0;
  function stageState(view){
    var s = L.read(), o = { n: sized ? n : 500, ae: s.ae, feat: Object.keys(s.feat), add: Object.keys(s.add).filter(function(k){ return k !== 'voice'; }),
      voice: !!s.add.voice, brand: X.brand || '', docs: !!X.docs, web: !!(X.web || X.fc), site: window.byoBrand ? window.byoBrand.site : '' };
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
  function paint(){
    var c = calc(), s = c.s;
    pushSoon();
    // Size
    $('byo-hh').value = n; $('byo-n').textContent = n >= 1500 ? '1,500 or more' : n.toLocaleString('en-AU');
    [].forEach.call(document.querySelectorAll('[data-hh]'), function(b){ b.setAttribute('aria-pressed', String(sized && +b.dataset.hh === n)); });
    // Ticks
    [].forEach.call(document.querySelectorAll('[data-tk]'), function(b){
      var t = b.dataset.tk.split(':'), k = t[1];
      if (t[0] === 'feat') on(b, !!s.feat[k]);
      else if (t[0] === 'ae') on(b, s.ae);
      else if (t[0] === 'add') { var inc = L.inAE(s, k); on(b, !!s.add[k] && !inc, inc); var pc = b.closest('.pr-row').querySelector('.pc'); pc.innerHTML = inc ? '<b>Included</b>' : '<b>' + money(APPN[k][2]) + '</b> a month'; }
      else if (t[0] === 'brand') { var sel = (X.brand || 'none') === k; b.setAttribute('aria-checked', String(sel)); b.classList.toggle('on', sel); b.closest('.pr-row').classList.toggle('on', sel); }
      else if (t[0] === 'x') on(b, !!X[k]);
    });
    [].forEach.call(document.querySelectorAll('[data-bill]'), function(b){ var sel = (b.dataset.bill === 'year') === !!X.year; b.setAttribute('aria-checked', String(sel)); b.classList.toggle('on', sel); });
    if ((X.build || X.own) && !$('byo-more').open) $('byo-more').open = true;
    $('byo-docs-p').textContent = s.ae ? money(DOCS_AE) : money(DOCS);
    // Command Centre usage
    $('byo-usage').innerHTML = s.ae ? 'With the whole Advice Engine, every SOA and client review is included.'
      : 'Client reviews are <b>97c</b> each. ' + (s.feat.soa ? 'Your SOAs are drafted by the SOA generator.' : 'Each SOA we draft for you is <b>$153</b>, or add the SOA generator.');
    // Advice Engine nudge
    var fs = L.featSum(s), alc = L.FEAT.reduce(function(t, f){ return t + f[2]; }, 0);
    $('byo-nudge').innerHTML = s.ae
      ? '<p><b>You have the whole Advice Engine.</b> $2 a household instead of ' + rate(alc) + ', with every SOA and client review, Client Portal and the Brand Document Pack included.</p><button type="button" class="byo-link" data-tk="ae:">Pick features one by one instead</button>'
      : fs >= 2 ? '<p><b>The whole Advice Engine costs less.</b> Your features add ' + rate(fs) + ' a household; all seven are $2, with every SOA and client review, Client Portal and the Brand Document Pack included.' + (sized ? ' That saves about ' + money(banded(fs - 2) * (X.year ? 1 - YEAR : 1)) + ' a month.' : '') + '</p><button type="button" class="sx-btn" data-tk="ae:">Take it all</button>'
      : '<p><b>Or take the whole Advice Engine for $2 a household.</b> All seven features, plus every SOA and client review, Client Portal and the Brand Document Pack.</p><button type="button" class="sx-btn ghost" data-tk="ae:">Take it all</button>';
    // Your Bunya
    var L1 = [], L2 = [], line = function(a, b, cls){ return '<div class="' + (cls || '') + '"><dt>' + a + '</dt><dd>' + b + '</dd></div>'; };
    L1.push(line('Bunya fee <small>' + (sized ? n.toLocaleString('en-AU') + ' households × ' + rate(c.r) + (c.atMin ? ', the $500 minimum' : '') : 'choose your households') + '</small>', sized ? money(c.fee) : rate(c.r) + ' a household'));
    if (L.every(s) && Object.keys(s.add).length) L1.push(line('Every app', money(c.apps)));
    else L.APPS.forEach(function(a){ if (s.add[a[0]]) L1.push(line(a[1], L.inAE(s, a[0]) ? 'Included' : money(a[2]))); });
    if (X.prem) L1.push(line('Care Premium', money(PREM)));
    if (X.build) L1.push(line('Bunya Build', money(BUILD)));
    if (X.fc) L1.push(line('Found &amp; Cited', money(FC)));
    L1.push(line(X.year ? 'A year' : 'A month', sized ? (X.year ? money(c.monthly * 12) : money(c.monthly)) : '—', 'tot'));
    L2.push(line('Standard setup', money(SETUP)));
    if (X.brand) L2.push(line(BRAND[X.brand][0], money(BRAND[X.brand][1])));
    if (X.docs) L2.push(line('Marketing bundle pack', money(s.ae ? DOCS_AE : DOCS)));
    if (X.web) L2.push(line('Website design', money(WEB)));
    L2.push(line('Once', money(c.once), 'tot'));
    var use = s.ae ? '' : '<p class="byo-dim">As you use them: client reviews 97c each' + (s.feat.soa ? '.' : ', and SOAs we draft for you $153 each.') + '</p>';
    $('byo-lines').innerHTML = '<dl class="byo-dl">' + L1.join('') + '</dl><dl class="byo-dl">' + L2.join('') + '</dl>' + use;
    $('byo-live').innerHTML = ['Launch support: a named engineer for ' + (s.ae ? 45 : 30) + ' days', 'Licensee Green-Light Pack', 'Team Quick-Start Kit', 'Your first month of Bunya Build'].map(function(t){ return '<li>' + t + '</li>'; }).join('');
    paintQuote(c);
    // Bottom bar
    $('byo-r').textContent = rate(c.r);
    $('byo-m').innerHTML = sized ? (X.year ? money(c.monthly * 12) + '<em> a year</em>' : money(c.monthly) + '<em> a month</em>') : 'Your month';
    var bits = [];
    if (c.apps) bits.push('+ ' + money(c.apps) + ' apps');
    if (X.prem) bits.push('+ ' + money(PREM) + ' Care Premium');
    if (X.build) bits.push('+ ' + money(BUILD) + ' Bunya Build');
    if (X.fc) bits.push('+ ' + money(FC) + ' Found & Cited');
    var svc = c.once - SETUP;
    if (svc) bits.push('+ ' + money(svc) + ' once');
    $('byo-m-d').textContent = (sized ? n.toLocaleString('en-AU') + ' households × ' + rate(c.r) + (c.atMin ? ' (the $500 minimum)' : ' = ' + money(c.fee)) : 'Choose your number of client households') + (bits.length ? ' · ' + bits.join(' · ') : '');
    var now = { r: c.r, m: c.apps + c.extra, o: svc }, note = '';
    if (was && Math.abs(now.r - was.r) > .001) note = (now.r > was.r ? '+' : '−') + cents(Math.abs(now.r - was.r)) + ' a household';
    else if (was && now.m !== was.m) note = (now.m > was.m ? '+' : '−') + money(Math.abs(now.m - was.m)) + ' a month';
    else if (was && now.o !== was.o) note = (now.o > was.o ? '+' : '−') + money(Math.abs(now.o - was.o)) + ' once';
    was = now;
    if (note) { var ch = $('byo-chg'); ch.textContent = note; ch.classList.add('on'); clearTimeout(chgT); chgT = setTimeout(function(){ ch.classList.remove('on'); }, 2200); }
  }

  // Email me this quote: everything in the build, prefilled
  function quoteOf(c){
    var s = c.s, feats = s.ae ? ['The whole Advice Engine (all seven features)'] : L.FEAT.filter(function(f){ return s.feat[f[0]]; }).map(function(f){ return f[1] + ' +' + cents(f[2]); });
    var apps = L.APPS.filter(function(a){ return s.add[a[0]]; }).map(function(a){ return a[1] + (L.inAE(s, a[0]) ? ' (included)' : ' ' + money(a[2]) + ' a month'); });
    var yours = [];
    if (X.brand) yours.push(BRAND[X.brand][0] + ' ' + money(BRAND[X.brand][1]) + ' once'); else yours.push('AI brand kit (included)');
    if (X.docs) yours.push('Marketing bundle pack ' + money(s.ae ? DOCS_AE : DOCS) + ' once');
    if (X.web) yours.push('Website design ' + money(WEB) + ' once');
    if (X.fc) yours.push('Found & Cited ' + money(FC) + ' a month');
    var more = [];
    if (X.prem) more.push('Care Premium ' + money(PREM) + ' a month');
    if (X.build) more.push('More Bunya Build ' + money(BUILD) + ' a month');
    return {
      households: sized ? n : null, pay: X.year ? 'yearly' : 'monthly',
      rows: (window.byoBrand ? [['Firm website', window.byoBrand.site]] : []).concat([['Households', sized ? n.toLocaleString('en-AU') + ' client households' : 'Not chosen yet'],
             ['Command Centre', '$3 a household a month'],
             ['Advice Engine', feats.length ? feats.join(', ') : 'None yet'],
             ['Apps', apps.length ? apps.join(', ') : 'None'],
             ['Make it yours', yours.join(', ')]]).concat(more.length ? [['Customise', more.join(', ')]] : []),
      totals: [['Price per household', rate(c.r) + ' a month' + (X.year ? ', paying yearly' : '')],
               [X.year ? 'A year' : 'A month', sized ? (X.year ? money(c.monthly * 12) : money(c.monthly)) : 'Depends on your households'],
               ['Once', money(c.once) + ' (setup ' + money(SETUP) + (c.once > SETUP ? ' and extras' : '') + ')']],
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
    var line = (sized ? n.toLocaleString('en-AU') + ' households · ' : '') + 'Command Centre' + (picks.length ? ', ' + picks.join(', ') : '') + ' · ' + rate(c.r) + ' a household a month' + (sized ? ' · ' + money(c.monthly) + ' a month' : '');
    $('byo-q-line').textContent = '· ' + rate(c.r) + ' a household' + (sized ? ', ' + money(c.monthly) + ' a month' : '');
    $('byo-d-line').textContent = 'Your build: ' + line;
  }

  // Pop-ups: Email me this quote, and Book a demo. Contact details typed in one fill the other (sessionStorage
  // 'bunya.contact'); the firm comes from the website lookup when there is one; the demo's households and "what should
  // we show you" come from the build. Not connected yet: on the live site each sends to the team (and the quote emails the visitor).
  var QF = $('byo-quote'), DF = $('byo-demo'), lastFocus = null, CF = ['name', 'email', 'phone', 'firm'];
  [QF, DF].forEach(function(f){ TAGS.forEach(function(k){ if (tags[k]) f.elements[k].value = tags[k]; }); });
  function contact(){ try { return JSON.parse(sessionStorage.getItem('bunya.contact') || '{}') || {}; } catch (e) { return {}; } }
  function fill(f){
    var ct = contact();
    CF.forEach(function(k){ if (!f.elements[k].value && ct[k]) f.elements[k].value = ct[k]; });
    if (!f.elements.firm.value && window.byoBrand && window.byoBrand.found) f.elements.firm.value = window.byoBrand.firm;
    if (f === DF) {
      var s = L.read(), on = { cc: true, ae: s.ae || Object.keys(s.feat).length > 0, brand: !!(X.brand || X.docs || X.web || X.fc || window.byoBrand) };
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
    if (e.target.closest('[data-quote]')) { e.preventDefault(); openModal('byo-mq'); return; }
    // Book a demo on this page (our buttons, the menu's, and any link to booking.html) opens the pop-up, prefilled
    if (e.target.closest('[data-demo], a[href="booking.html"], a.n3-demo')) { e.preventDefault(); openModal('byo-md'); return; }
    var bl = e.target.closest('[data-bill]');
    if (bl) { X.year = bl.dataset.bill === 'year'; saveX(); paint(); return; }
    var b = e.target.closest('[data-hh]');
    if (b) { n = +b.dataset.hh; sized = true; saveN(); paint(); film('size'); return; }
    b = e.target.closest('[data-tk]'); if (!b || b.disabled) return;
    e.preventDefault();
    var t = b.dataset.tk.split(':'), k = t[1];
    if (t[0] === 'feat' || t[0] === 'add') { if (L.toggle(t[0], k)) film(k); return; }
    if (t[0] === 'ae') { if (L.toggle('ae', '')) film('ae'); return; }
    if (t[0] === 'brand') X.brand = k === 'none' ? '' : k;
    else X[k] = !X[k];
    if (t[0] === 'brand' || X[k]) film(b.closest('.pr-row').dataset.film || 'yours');
    if (t[0] === 'brand' && k !== 'none') push('brand');
    saveX(); paint();
  });
  $('byo-hh').addEventListener('input', function(){ n = +this.value; sized = true; saveN(); paint(); });
  document.addEventListener('bunya:build', paint);
  document.addEventListener('bunya:brand', function(){ if (window.byoBrand && window.byoBrandAsked) { keyNow = ''; film('yours'); } push(); paintQuote(calc()); var f = $('byo-quote'); if (window.byoBrand && f && !f.elements.firm.value && window.byoBrand.found) f.elements.firm.value = window.byoBrand.firm; });
  addEventListener('storage', paint);
  paint();
})();
