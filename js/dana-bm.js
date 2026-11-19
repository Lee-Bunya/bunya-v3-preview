/* Make it yours (brand-website-marketing.html), Dana 20 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-bm.css.
   The hero visual was "Aa" and three floating squares in an empty panel. It now shows the product: Aynub Financial's
   documents from its Brand Document Pack fanned out, with its logo and palette (the same made-up practice as the
   example further down the page). Clicking it goes to that example. */
(function () {
  'use strict';
  var vis = document.querySelector('.hb-pvis');
  if (!vis) return;
  var D = 'assets/aynub/docs/';
  var PAL = [['Plum', '#772A53'], ['Sage', '#678D6C'], ['Ivory', '#F7F5F0'], ['Ink', '#2A2230'], ['Afterglow', '#FC7D23']];
  var fan = document.createElement('a');
  fan.className = 'bm-fan';
  fan.href = '#example';
  fan.setAttribute('aria-label', 'Aynub Financial’s documents from its Brand Document Pack: a Statement of Advice, a welcome pack, an annual review and an advice proposal, all in one look. A fictional example. See it on a firm.');
  fan.innerHTML =
    '<span class="bm-glow" aria-hidden="true"></span>' +
    '<span class="bm-doc p l2"><img src="' + D + 'welcome/1.webp?v=6" alt=""></span>' +
    '<span class="bm-doc p l1"><img src="' + D + 'soa/1.webp?v=6" alt=""></span>' +
    '<span class="bm-doc p r2"><img src="' + D + 'proposal/2.webp" alt=""></span>' +
    '<span class="bm-doc p r1"><img src="' + D + 'proposal/1.webp?v=6" alt=""></span>' +
    '<span class="bm-doc w c"><img src="' + D + 'annual/1.webp?v=6" alt=""></span>' +
    '<span class="bm-chip bm-logo" aria-hidden="true"><img src="assets/aynub/aynub-lockup-financial-on-light.png" alt=""></span>' +
    '<span class="bm-chip bm-pal" aria-hidden="true">' + PAL.map(function (c) { return '<i style="background:' + c[1] + '" title="' + c[0] + '"></i>'; }).join('') + '<small>Your colours, everywhere</small></span>' +
    '<span class="bm-chip bm-pack" aria-hidden="true"><b>Brand Document Pack</b><small>SOAs, reviews and client documents, in your brand</small></span>';
  /* new covers (20 Nov 2026): make sure the example thumbnails further down show them, not a saved older copy */
  /* this page shows its own SOA cover (docs/soa/1-brand.webp); other pages keep the original soa/1.webp. That covers the
     example thumbnail here and the full-screen reader when it's opened from this page. */
  function brandSoa(im) { var m = im.getAttribute('src') || ''; if (/aynub\/docs\/soa\/1\.webp/.test(m)) im.setAttribute('src', m.replace(/soa\/1\.webp(\?[^"']*)?/, 'soa/1-brand.webp')); }
  [].forEach.call(document.querySelectorAll('img'), brandSoa);
  if ('MutationObserver' in window) new MutationObserver(function (ms) {
    ms.forEach(function (m) {
      if (m.type === 'attributes' && m.target.tagName === 'IMG') brandSoa(m.target);
      [].forEach.call(m.addedNodes || [], function (n) { if (n.nodeType !== 1) return; if (n.tagName === 'IMG') brandSoa(n); [].forEach.call(n.querySelectorAll ? n.querySelectorAll('img') : [], brandSoa); });
    });
  }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['src'] });
  [].forEach.call(document.querySelectorAll('img[src*="assets/aynub/docs/"]'), function (im) {
    var m = im.getAttribute('src'); if (/\/(welcome|proposal|annual|sustainable|portfolio)\/1\.webp$/.test(m)) im.setAttribute("src", m + "?v=6");
  });
  var old = vis.querySelector('.hb-type'); if (old) old.classList.add('bm-hidden');
  vis.appendChild(fan);
  vis.classList.add('bm-on');

  /* Dana (20 Nov 2026): the colour names and hex codes on the darker swatches (Plum, Sage, Ink) read in white */
  [].forEach.call(document.querySelectorAll('.pp-kit .sw > span'), function (sp) {
    var c = (sp.getAttribute('style') || '').match(/#([0-9a-f]{6})/i); if (!c) return;
    var n = parseInt(c[1], 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    if (0.299 * r + 0.587 * g + 0.114 * b < 150) sp.classList.add('bm-dk');
  });
  /* a more considered line under the Aynub logo than "Plan backwards. Live forwards." */
  var tag = document.querySelector('.pp-kit .lg span'); if (tag) tag.textContent = 'Considered advice for the life you’re building.';
})();
