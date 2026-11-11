/* Single-source site navigation for the Bunya website (v3: Command Centre dropdown holds the core, agents and apps).
 * Each page needs <div id="site-nav"></div> and <body data-nav="cc|sol|gs|cs|res"> for the active item.
 * Same API as the production nav.js, so it ports straight into Production/marketing.
 */
(function () {
  var caret = '<svg class="caret" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 4 L6 8 L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var foot = '<div class="mega-foot"><div><span>New to Bunya? Start with a demo: one meeting to see Command Centre and talk through your firm.</span><a href="booking.html">Book a demo →</a></div></div>';

  var HEADER = '<header class="nav">' +
  '<div class="nav-inner">' +
    '<a href="index.html" class="logo"><img src="assets/71cabd5c4963.png" alt="Bunya AI home" class="logo-img"></a>' +
    '<button class="menu-btn" aria-label="Open menu" aria-controls="mMenu" aria-expanded="false">&#8801;</button>' +
    '<nav class="nav-links" aria-label="Main">' +
      '<button class="nav-trigger" data-key="cc" aria-expanded="false" aria-controls="mega-cc">Command Centre ' + caret + '</button>' +
      '<button class="nav-trigger" data-key="sol" aria-expanded="false" aria-controls="mega-sol">Solutions ' + caret + '</button>' +
      '<a href="getting-started.html" data-key="gs">Getting started</a>' +
      '<a href="case-studies.html" data-key="cs">Customer stories</a>' +
      '<button class="nav-trigger" data-key="res" aria-expanded="false" aria-controls="mega-res">Resources ' + caret + '</button>' +
      '<a href="booking.html" class="nav-cta">Book a demo</a>' +
    '</nav>' +
  '</div>' +

  // Command Centre: the core, the agents and the apps
  '<div class="mega" id="mega-cc" role="region" aria-label="Command Centre">' +
    '<div class="mega-body mega-cols">' +
      '<div><p class="mega-label">The core</p>' +
        '<a class="mega-link" href="command-centre-showcase.html"><strong>Command Centre</strong><span>One record and one workflow, from first meeting to implemented advice.</span></a>' +
        '<a class="mega-link" href="ai-workflows-integrations.html"><strong>Connections</strong><span>Microsoft 365, investment platforms and the tools you already use.</span></a>' +
        '<a class="mega-link" href="security-your-data.html"><strong>Security &amp; your data</strong><span>Built in your own Microsoft 365, with every approval on the record.</span></a>' +
      '</div>' +
      '<div><p class="mega-label">Agents</p>' +
        '<div class="mega-agents">' +
        '<a class="mega-agent" href="agent-file-notes.html"><span class="mg g-a"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/></svg></span>File notes</a>' +
        '<a class="mega-agent" href="agent-fact-find.html"><span class="mg g-b"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11"/><path d="M3.5 6l1.5 1.5L7.5 5M3.5 12l1.5 1.5L7.5 11M3.5 18l1.5 1.5L7.5 17"/></svg></span>Fact find</a>' +
        '<a class="mega-agent" href="agent-soa-request-pack.html"><span class="mg g-c"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/></svg></span>SoA request pack</a>' +
        '<a class="mega-agent" href="agent-modelling.html"><span class="mg g-d"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16"/><path d="M5 15l4-4 3 3 6-7"/><path d="M15 7h3v3"/></svg></span>Modelling</a>' +
        '<a class="mega-agent" href="agent-review-prep.html"><span class="mg g-e"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16M9 3v4M15 3v4"/></svg></span>Review prep</a>' +
        '<a class="mega-agent" href="agent-ask-the-file.html"><span class="mg g-a"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/><path d="M10 9a2 2 0 1 1 2.5 2c-.4.1-.5.4-.5.8M12 13.5h.01"/></svg></span>Ask the file</a>' +
        '</div>' +
        '<a class="text-link mega-all" href="agents.html">All agents →</a>' +
      '</div>' +
      '<div><p class="mega-label">Apps</p>' +
        '<p class="mega-sub">Grow the practice</p><div class="mega-agents mega-apps">' +
        '<a class="mega-agent" href="broadcast-hq.html"><span class="mg g-a"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h3l8 5V5L7 10z"/><path d="M18 9.5a3.5 3.5 0 0 1 0 5"/></svg></span>Broadcast HQ</a>' +
        '<a class="mega-agent" href="apps.html#app-sales"><span class="mg g-b"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l4-4 4 2 3-2 7 4"/><path d="M7 7v6l5 5 3-3M10 13l3 3M13 11l3 3"/><path d="M3 11v4M21 11v4"/></svg></span>Sales app</a>' +
        '</div>' +
        '<p class="mega-sub">Run the business</p><div class="mega-agents mega-apps">' +
        '<a class="mega-agent" href="apps.html#app-people"><span class="mg g-c"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="9" r="3"/><circle cx="16.5" cy="10" r="2.5"/><path d="M3 19a5 5 0 0 1 10 0M13.5 19a4 4 0 0 1 7.5-1.5"/></svg></span>People app</a>' +
        '<a class="mega-agent" href="apps.html#app-finance"><span class="mg g-d"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg></span>Finance app</a>' +
        '<a class="mega-agent" href="apps.html#app-vault"><span class="mg g-e"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/></svg></span>Bunya Vault</a>' +
        '</div>' +
        '<a class="text-link mega-all" href="apps.html">All apps →</a>' +
        '<p class="mega-note">Agents do one advice job each. Apps are separate workspaces for the rest of the practice.</p>' +
      '</div>' +
    '</div>' + foot +
  '</div>' +

  // Solutions
  '<div class="mega" id="mega-sol" role="region" aria-label="Solutions">' +
    '<div class="mega-body">' +
      '<div class="mega-head"><p class="mega-label">Solutions · follow the advice journey</p><a class="text-link" href="index.html#journey">See the whole journey →</a></div>' +
      '<div class="mega-journey">' +
        '<a href="client-onboarding.html"><span class="n">01 · Start</span><strong>Client onboarding</strong><span>Every new client, start to finish, with an owner at each step.</span></a>' +
        '<a href="soa-preparation.html"><span class="n">02 · Prepare</span><strong>SoA preparation &amp; paraplanning</strong><span>Clear the prework between the strategy meeting and the SoA.</span></a>' +
        '<a href="advice-implementation.html"><span class="n">03 · Implement</span><strong>Advice implementation</strong><span>From sign-off to advice in place, with nothing left hanging.</span></a>' +
        '<a href="reviews-fee-consent.html"><span class="n">04 · Every year</span><strong>Client reviews &amp; fee consent</strong><span>Reviews that start on time, with consent tracked every cycle.</span></a>' +
      '</div>' +
      '<a class="mega-across" href="compliance-evidence.html"><span class="k">Across every stage</span><strong>Compliance &amp; evidence</strong><span>When someone asks what was done, the evidence is already there.</span></a>' +
      '<div class="mega-practice"><span class="k">Running the practice</span>' +
        '<a href="broadcast-hq.html">Marketing</a><a href="apps.html#app-sales">New business</a><a href="apps.html#app-people">Your team</a><a href="apps.html#app-finance">Finance &amp; BAS</a><a href="apps.html#app-vault">Logins</a>' +
        '<a class="all" href="apps.html">All apps →</a></div>' +
    '</div>' + foot +
  '</div>' +

  // Resources
  '<div class="mega" id="mega-res" role="region" aria-label="Resources">' +
    '<div class="mega-body mega-cols">' +
      '<div><p class="mega-label">Learn</p>' +
        '<a class="mega-link" href="faq.html"><strong>FAQs</strong><span>Straight answers about Bunya, AI and your data.</span></a>' +
        '<a class="mega-link" href="guides.html"><strong>Guides &amp; videos</strong><span>Practical guides for advice firms, and short how-to videos.</span></a>' +
        '<a class="mega-link" href="cost-calculator.html"><strong>Tools &amp; calculators</strong><span>Test your own assumptions on cost and capacity.</span></a>' +
      '</div>' +
      '<div><p class="mega-label">Company</p>' +
        '<a class="mega-link" href="about.html"><strong>About Bunya AI</strong><span>Why we exist, who we are and what you can hold us to.</span></a>' +
        '<a class="mega-link" href="contact.html"><strong>Contact</strong><span>info@bunya.ai · 1300 286 922</span></a>' +
      '</div>' +
      '<a class="mega-feature light" href="cost-calculator.html"><span class="k">Cost &amp; capacity calculator</span><span class="t">How much capacity could your team get back?</span><span class="b">Open the calculator ↗</span></a>' +
    '</div>' + foot +
  '</div>' +
  '</header><div class="nav-scrim" aria-hidden="true"></div>';

  var MOBILE = '<div class="m-overlay" id="mMenu" role="dialog" aria-modal="true" aria-label="Site navigation" inert>' +
    '<div class="m-top"><a href="index.html" class="logo"><img src="assets/84374dbcdaa8.svg" alt="Bunya AI home" class="logo-img"></a><button class="m-close" aria-label="Close menu">&#10005;</button></div>' +
    '<nav class="m-scroll" aria-label="Mobile navigation">' +
      '<details class="m-group"><summary>Command Centre</summary>' +
        '<a href="command-centre-showcase.html">Command Centre</a><a href="ai-workflows-integrations.html">Connections</a><a href="security-your-data.html">Security &amp; your data</a>' +
        '<p class="m-sub">Agents</p>' +
        '<a href="agents.html">All agents<small>One advice job each, approved by your team</small></a><a href="agent-file-notes.html">File notes</a><a href="agent-fact-find.html">Fact find</a><a href="agent-modelling.html">Modelling</a>' +
        '<p class="m-sub">Apps</p>' +
        '<a href="apps.html">All apps<small>Grow the practice, and run the business</small></a><a href="broadcast-hq.html">Broadcast HQ</a><a href="apps.html#app-sales">Sales app</a><a href="apps.html#app-people">People app</a><a href="apps.html#app-finance">Finance app</a><a href="apps.html#app-vault">Bunya Vault</a>' +
      '</details>' +
      '<details class="m-group"><summary>Solutions</summary>' +
        '<a href="client-onboarding.html"><span class="num">01</span>Client onboarding</a><a href="soa-preparation.html"><span class="num">02</span>SoA preparation &amp; paraplanning</a>' +
        '<a href="advice-implementation.html"><span class="num">03</span>Advice implementation</a><a href="reviews-fee-consent.html"><span class="num">04</span>Client reviews &amp; fee consent</a>' +
        '<p class="m-sub">Across every stage</p><a href="compliance-evidence.html">Compliance &amp; evidence</a>' +
        '<p class="m-sub">Running the practice</p><a href="apps.html">Apps<small>Marketing, new business, your team, your books and your logins</small></a>' +
      '</details>' +
      '<a href="getting-started.html" class="m-direct">Getting started</a>' +
      '<a href="case-studies.html" class="m-direct">Customer stories</a>' +
      '<details class="m-group"><summary>Resources</summary>' +
        '<a href="faq.html">FAQs</a><a href="guides.html">Guides &amp; videos</a><a href="cost-calculator.html">Tools &amp; calculators</a>' +
        '<p class="m-sub">Company</p><a href="about.html">About Bunya AI</a><a href="contact.html">Contact</a>' +
      '</details>' +
    '</nav>' +
    '<div class="m-cta"><a href="booking.html">Book a demo</a></div>' +
  '</div>';

  function mount() {
    var slot = document.getElementById('site-nav');
    if (!slot) return;
    slot.innerHTML = HEADER + MOBILE;

    var header = slot.querySelector('header.nav');
    var triggers = [].slice.call(slot.querySelectorAll('.nav-trigger'));
    var scrim = slot.querySelector('.nav-scrim');
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var timer = null, hoverAt = 0;

    // Active top-level item from <body data-nav="...">
    var active = document.body.getAttribute('data-nav');
    if (active) slot.querySelectorAll('.nav-links [data-key="' + active + '"]').forEach(function (el) { el.classList.add('active'); });

    function open(btn) {
      clearTimeout(timer);
      var target = btn ? document.getElementById(btn.getAttribute('aria-controls')) : null;
      var switching = target && slot.querySelector('.mega.open') && !target.classList.contains('open');
      header.classList.toggle('nav-switching', !!switching);
      if (switching) setTimeout(function () { header.classList.remove('nav-switching'); }, 40);
      triggers.forEach(function (t) {
        var on = t === btn;
        t.setAttribute('aria-expanded', on ? 'true' : 'false');
        document.getElementById(t.getAttribute('aria-controls')).classList.toggle('open', on);
      });
      scrim.classList.toggle('show', !!btn);
    }
    function closeAll() { open(null); }

    triggers.forEach(function (t) {
      t.addEventListener('click', function () {
        var isOpen = t.getAttribute('aria-expanded') === 'true';
        if (isOpen && Date.now() - hoverAt > 500) closeAll(); else open(t);
      });
      if (canHover) t.addEventListener('mouseenter', function () {
        if (t.getAttribute('aria-expanded') !== 'true') { hoverAt = Date.now(); open(t); }
      });
    });
    if (canHover) {
      header.addEventListener('mouseleave', function () { timer = setTimeout(closeAll, 180); });
      header.addEventListener('mouseenter', function () { clearTimeout(timer); });
      slot.querySelectorAll('.nav-links > a, .logo').forEach(function (a) { a.addEventListener('mouseenter', closeAll); });
    }
    scrim.addEventListener('click', closeAll);

    // Mobile overlay
    var menu = document.getElementById('mMenu');
    var btn = slot.querySelector('.menu-btn');
    function openMenu() { menu.inert = false; menu.classList.add('open'); document.body.classList.add('menu-open'); btn.setAttribute('aria-expanded', 'true'); menu.querySelector('.m-close').focus(); }
    function closeMenu() {
      if (!menu.classList.contains('open')) return;
      menu.classList.remove('open'); document.body.classList.remove('menu-open'); btn.setAttribute('aria-expanded', 'false'); menu.inert = true; btn.focus();
    }
    btn.addEventListener('click', openMenu);
    menu.querySelector('.m-close').addEventListener('click', closeMenu);
    menu.addEventListener('click', function (e) { if (e.target.closest('a[href]')) closeMenu(); });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      closeAll(); closeMenu();
    });
    window.addEventListener('resize', function () { if (getComputedStyle(btn).display === 'none') closeMenu(); else closeAll(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
