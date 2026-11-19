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
  [].forEach.call(document.querySelectorAll('img[src*="assets/aynub/docs/"]'), function (im) {
    var m = im.getAttribute('src'); if (/\/(soa|welcome|proposal|annual|sustainable|portfolio)\/1\.webp$/.test(m)) im.setAttribute("src", m + "?v=6");
  });
  var old = vis.querySelector('.hb-type'); if (old) old.classList.add('bm-hidden');
  vis.appendChild(fan);
  vis.classList.add('bm-on');
})();
