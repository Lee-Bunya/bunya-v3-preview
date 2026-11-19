/* Build-as-you-read journey (Dana, 19 Nov 2026), from Lee's request:
   "make it a journey for them as soon as they jump on the site to start 'building their own system'…
    at the same time, they read about each feature and decide if they should add it to their build."

   It sits on top of the shortlist v3 already keeps (window.bunyaList in js/nav3.js, saved as 'bunya.build'),
   so the menu's "Your Bunya" pill, every "Add to your Bunya" button and Build your Bunya stay in step.
   1. Home: a five-step "Build your Bunya as you read" strip straight after the opening section.
   2. Every other page (not Pricing or Build): a build bar that follows you down the page, shows your steps
      and running price, and offers to add the feature or app you're reading about.
   Styling: css/dana-journey.css. If this file doesn't load, the pages work exactly as before. */
(function () {
  'use strict';
  var L = window.bunyaList;
  if (!L) return;
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (page === 'build.html' || page === 'pricing.html' || page === 'build-daniel.html') return;

  var APP_PAGES = { 'client-portal.html': 'portal', 'broadcast-hq.html': 'bhq', 'field-notes.html': 'field', 'bunya-voice.html': 'voice' };
  var CC_PAGES = /^(command-centre|meeting-notes|review-packs|fee-consent|care|bunya-shape|bunya-portal|how-it-works)\.html$/;
  var YOURS_PAGES = /^(brand-website-marketing|website-marketing|client-collateral)\.html$/;
  var featPage = {};
  Object.keys(window.BUNYA_FEATURE_PAGES || {}).forEach(function (k) { featPage[(window.BUNYA_FEATURE_PAGES[k] || '').split('#')[0]] = k; });

  function money(v) { return '$' + Math.round(v).toLocaleString('en-AU'); }
  function rateTxt(v) { return '$' + (Math.round(v * 100) / 100).toFixed(2); }
  function cents(v) { return v < 1 ? Math.round(v * 100) + 'c' : '$' + v.toFixed(2); }
  function featName(k) { var x = L.FEAT.filter(function (f) { return f[0] === k; })[0]; return x ? x : null; }
  function appRow(k) { return L.APPS.filter(function (a) { return a[0] === k; })[0]; }
  function buildHref() { var q = L.handover().toString(); return 'build.html' + (q ? '?' + q : ''); }
  function openApps(e) {
    var b = document.querySelector('.n3-main [data-n3="apps"]');
    if (b && getComputedStyle(b).display !== 'none') { e.preventDefault(); b.click(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  }

  function state() {
    var s = L.read(), nf = s.ae ? L.FEAT.length : Object.keys(s.feat).length, na = Object.keys(s.add).length;
    return {
      s: s, nf: nf, na: na, rate: L.rate(s), apps: L.apps(s),
      feat: s.ae ? 'All 8 features' : nf ? nf + (nf === 1 ? ' feature' : ' features') + ' · +' + cents(L.rate(s) - L.BASE) : 'None yet',
      app: na ? na + (na === 1 ? ' app' : ' apps') + ' · ' + money(L.apps(s)) + ' a month' : 'None yet'
    };
  }

  /* Which step the page belongs to, and the one thing on it you could add */
  var step = page === 'index.html' ? 0 : CC_PAGES.test(page) ? 1 : (featPage[page] || page === 'advice-engine.html') ? 2 : APP_PAGES[page] || page === 'bunya-vault.html' ? 3 : YOURS_PAGES.test(page) ? 4 : 0;
  var item = null;
  if (featPage[page]) { var fr = featName(featPage[page]); if (fr) item = { kind: 'feat', key: fr[0], name: fr[1], price: '+' + cents(fr[2]) + ' an account' }; }
  else if (page === 'advice-engine.html') item = { kind: 'ae', key: '', name: 'the whole Advice Engine', price: '+$' + L.AE.toFixed(2) + ' an account' };
  else if (APP_PAGES[page]) { var ar = appRow(APP_PAGES[page]); if (ar) item = { kind: 'add', key: ar[0], name: ar[1], price: money(ar[2]) + ' a month' }; }

  var STEPS = [
    { n: 1, t: 'Command Centre', href: 'command-centre.html', go: 'What’s in it' },
    { n: 2, t: 'Advice Engine features', href: 'advice-engine.html', go: 'Choose features' },
    { n: 3, t: 'Apps', href: 'client-portal.html', go: 'Add apps', apps: true },
    { n: 4, t: 'Make it yours', href: 'brand-website-marketing.html', go: 'See the options' },
    { n: 5, t: 'Your price', href: 'build.html', go: 'See your price', price: true }
  ];
  function status(n, st) {
    return n === 1 ? 'Included in every Bunya' : n === 2 ? st.feat : n === 3 ? st.app : n === 4 ? 'AI brand kit included' : rateTxt(st.rate) + ' an account a month';
  }
  function done(n, st) { return n === 1 || n === 4 || (n === 2 && st.nf) || (n === 3 && st.na); }

  /* 1. Home: the journey strip */
  var hero = document.querySelector('.v5-hero');
  if (hero && page === 'index.html') {
    var sec = document.createElement('section');
    sec.className = 'dx-journey';
    sec.setAttribute('aria-labelledby', 'dx-journey-h');
    sec.innerHTML = '<div class="dx-j-in"><div class="dx-j-head"><span class="dx-j-k">Start here</span>' +
      '<h2 id="dx-journey-h">Build your Bunya <span>as you read.</span></h2>' +
      '<p>Command Centre is in. Read about each feature and app, add what your firm needs, and your price updates as you go.</p></div>' +
      '<ol class="dx-j-steps">' + STEPS.map(function (x) {
        return '<li data-step="' + x.n + '"><a href="' + x.href + '"' + (x.apps ? ' data-apps' : '') + (x.price ? ' data-price' : '') + '>' +
          '<span class="dx-j-n" aria-hidden="true">' + x.n + '</span><b>' + x.t + '</b><small data-status></small><em>' + x.go + ' <i aria-hidden="true">→</i></em></a></li>';
      }).join('') + '</ol></div>';
    hero.insertAdjacentElement('afterend', sec);
    sec.querySelector('[data-apps]').addEventListener('click', openApps);
  }

  /* 2. The build bar */
  var bar = document.createElement('aside');
  bar.className = 'dx-bar';
  bar.setAttribute('aria-label', 'Your Bunya build');
  bar.innerHTML = '<div class="dx-bar-in">' +
    '<a class="dx-bar-me" href="build.html"><span class="dx-bar-k">Your Bunya</span><b data-rate></b><small data-apps></small></a>' +
    '<ol class="dx-bar-steps">' + STEPS.slice(0, 4).map(function (x) {
      return '<li data-step="' + x.n + '"><a href="' + x.href + '"' + (x.apps ? ' data-apps' : '') + ' title="' + x.t + '"><span aria-hidden="true">' + x.n + '</span><em>' + x.t + '</em></a></li>';
    }).join('') + '</ol>' +
    (item ? '<button type="button" class="dx-bar-add" data-add></button>' : '') +
    '<a class="dx-bar-go" data-go href="build.html">See your price <i aria-hidden="true">→</i></a>' +
    '<button type="button" class="dx-bar-x" aria-label="Hide the build bar" data-x>×</button></div>' +
    '<button type="button" class="dx-bar-pill" data-open aria-label="Show your Bunya build"><span>Your Bunya</span><b data-rate></b></button>';
  document.body.appendChild(bar);
  if (step) bar.querySelector('.dx-bar-steps [data-step="' + step + '"]').classList.add('here');
  var appsLink = bar.querySelector('.dx-bar-steps [data-apps]');
  if (appsLink) appsLink.addEventListener('click', openApps);

  var addBtn = bar.querySelector('[data-add]');
  if (addBtn) addBtn.addEventListener('click', function () { L.toggle(item.kind, item.key); });

  var mini = false;
  try { mini = sessionStorage.getItem('dx-bar-mini') === '1'; } catch (e) {}
  function setMini(v) { mini = v; bar.classList.toggle('mini', v); try { sessionStorage.setItem('dx-bar-mini', v ? '1' : '0'); } catch (e) {} }
  bar.querySelector('[data-x]').addEventListener('click', function () { setMini(true); });
  bar.querySelector('[data-open]').addEventListener('click', function () { setMini(false); });
  setMini(mini);

  function paint() {
    var st = state();
    [].forEach.call(document.querySelectorAll('.dx-journey [data-step], .dx-bar [data-step]'), function (li) {
      var n = +li.dataset.step;
      var d = !!done(n, st);
      li.classList.toggle('done', d);
      var tile = li.querySelector('.dx-j-n, .dx-bar-steps span');
      if (tile) tile.textContent = d ? '✓' : String(n);
      var sm = li.querySelector('[data-status]');
      if (sm) sm.textContent = status(n, st);
    });
    [].forEach.call(document.querySelectorAll('.dx-journey [data-price], .dx-bar [data-go], .dx-bar-me'), function (a) { a.href = buildHref(); });
    [].forEach.call(bar.querySelectorAll('[data-rate]'), function (b) { b.textContent = rateTxt(st.rate) + ' an account'; });
    var ap = bar.querySelector('[data-apps]');
    if (ap) ap.textContent = st.na ? '+ ' + money(st.apps) + ' a month for apps' : 'Command Centre included';
    if (addBtn) {
      var on = L.has(item.kind, item.key);
      addBtn.classList.toggle('on', on);
      addBtn.setAttribute('aria-pressed', String(on));
      addBtn.innerHTML = on ? '<i aria-hidden="true">✓</i> <span class="dx-long">' + cap(item.name) + ' is in your build</span><span class="dx-short">Added</span>'
        : '<i aria-hidden="true">+</i><span class="dx-add-t">Add<span class="dx-long"> ' + item.name + ' <small>' + item.price + '</small></span></span>';
    }
  }
  function cap(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  document.addEventListener('bunya:build', paint);
  window.addEventListener('storage', function (e) { if (e.key === 'bunya.build') paint(); });
  paint();

  /* Show the bar once the visitor starts reading (past the opening section) */
  var shown = false;
  function onScroll() {
    var y = window.scrollY || 0, h = (document.querySelector('main > section') || {}).offsetHeight || 500;
    var nearEnd = (window.innerHeight + y) > (document.documentElement.scrollHeight - 260);
    var v = y > Math.min(h * 0.6, 520) && !nearEnd;
    if (v !== shown) { shown = v; bar.classList.toggle('show', v); document.body.classList.toggle('dx-bar-on', v); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
