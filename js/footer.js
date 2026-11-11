/* Single-source site footer for the Bunya website. Needs <div id="site-footer"></div>.
   10 Nov 2026: follows Build your Bunya, the same as the menu: the base (Command Centre), the features (Advice Engine),
   the add-ons (Apps), then Build your Bunya. Company links sit in the bottom line. Product links go to each product's
   page (window.BUNYA_PAGES in js/nav3.js). Old-model pages are not linked from here. */
(function () {
  var P = function (k, t) { return '<a href="' + ((window.BUNYA_PAGES || {})[k] || 'index.html#p=' + k) + '">' + t + '</a>'; };
  var F = function (k, t) { return '<a href="' + ((window.BUNYA_FEATURE_PAGES || {})[k] || 'advice-engine.html#' + k) + '">' + t + '</a>'; };
  var FOOTER = '<footer class="site"><div class="container"><div class="fcols">' +
    '<div><div class="logo"><img src="assets/84374dbcdaa8.svg" alt="Bunya AI" class="logo-img"></div>' +
      '<p class="tagline">Less admin, more advice. Bunya AI builds Bunya Command Centre, the practice operating system for Australian financial advice firms. Your team approves every step.</p>' +
      '<a href="mailto:info@bunya.ai">info@bunya.ai</a><a href="tel:1300286922">1300 286 922</a></div>' +
    '<div><h4>Command Centre</h4><a href="command-centre.html">Overview</a>' + P('notes', 'Meeting Notes') + P('reviews', 'Review Packs') + P('care', 'Care') + P('shape', 'Bunya Shape') + '</div>' +
    '<div><h4>Advice Engine</h4><a href="advice-engine.html">Overview</a>' + F('ff', 'Fact find') + F('pf', 'Portfolio') + F('ins', 'Insurance needs') + F('mod', 'Strategy and modelling') + F('cmp', 'Platform comparisons') + F('soa', 'SOA generator') + F('aud', 'File Audit') + '</div>' +
    '<div><h4>Apps</h4>' + P('portal', 'Client Portal') + P('bhq', 'Broadcast HQ') + P('field', 'Field Notes') + P('rev', 'Revenue Import') + P('voice', 'Bunya Voice') + P('vault', 'Bunya Vault') + '</div>' +
    '<div><h4>Pricing and getting started</h4><a href="build.html">Build yours</a><a href="pricing.html">Pricing</a><a href="how-it-works.html">How it works</a>' + P('svc', 'Make it yours') + '<a href="website-marketing.html">Website and marketing</a><a href="getting-started.html">Getting started</a><a href="case-studies.html">Customer stories</a><a href="blog.html">Insights</a><a href="booking.html">Book a demo</a></div>' +
    '<div class="fine"><span>&copy; 2026 Bunya AI Pty Ltd · ABN 39 700 067 545</span>' +
      '<span><a href="about.html">About</a> · <a href="security-your-data.html">Security &amp; your data</a> · <a href="faq.html">FAQs</a> · <a href="booking.html#contact">Contact</a></span></div>' +
  '</div></div></footer>';

  function mount() {
    var slot = document.getElementById('site-footer');
    if (slot) slot.outerHTML = FOOTER;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
