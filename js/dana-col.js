/* Client Collateral (client-collateral.html), Dana 20 Nov 2026 (design pass). Styling: css/dana-col.css.
   - "Three documents. One look.": each card shows its document, built in HTML in Aynub Financial's look (the made-up
     practice used on Make it yours), so the set reads as one family.
   - The questions sit above the closing section, as on every other page, headed "Questions, answered." */
(function () {
  'use strict';
  var LOGO = '<img class="cl-logo" src="assets/aynub/aynub-lockup-financial-on-light.png" alt="">';
  var DOCS = [
    '<span class="cl-doc"><span class="cl-top">' + LOGO + '<small>Version 4 · 2026</small></span><span class="cl-kick">Financial Services Guide</span><i class="cl-rule"></i>' +
      '<b class="cl-title">Who we are and how we help.</b><span class="cl-lines"><i></i><i></i><i class="s"></i></span>' +
      '<span class="cl-rows"><span>Our advisers</span><span>Our services</span><span>How we are paid</span><span>Making a complaint</span></span></span>',
    '<span class="cl-doc"><span class="cl-top">' + LOGO + '<small>Fee guide · 2026</small></span><span class="cl-kick">Fee guide</span><i class="cl-rule"></i>' +
      '<b class="cl-title">Our fees, in plain English.</b>' +
      '<span class="cl-fees"><span><em>Initial advice</em><strong>$3,300</strong></span><span><em>Ongoing advice</em><strong>$2,750 <small>a year</small></strong></span><span><em>Review only</em><strong>$990</strong></span></span></span>',
    '<span class="cl-doc"><span class="cl-top">' + LOGO + '<small>Our services</small></span><span class="cl-kick">Service brochure</span><i class="cl-rule"></i>' +
      '<b class="cl-title">Advice for the life you’re building.</b><span class="cl-photo"></span></span>'
  ];
  var cards = document.querySelectorAll('#set .wm-card');
  [].forEach.call(cards, function (c, i) {
    if (!DOCS[i] || c.querySelector('.cl-stage')) return;
    var st = document.createElement('span');
    st.className = 'cl-stage'; st.setAttribute('aria-hidden', 'true');
    st.innerHTML = '<span class="cl-back"></span>' + DOCS[i];
    c.insertBefore(st, c.firstChild);
    c.classList.add('cl-card');
  });
  var set = document.querySelector('#set'); if (set) set.classList.add('cl-on');

  /* questions above the closing section */
  var fq = document.querySelector('#h-faq'), end = document.querySelector('.sx-end');
  if (fq) {
    fq.innerHTML = 'Questions, <span>answered.</span>';
    var sec = fq.closest('section');
    if (sec && end && sec.compareDocumentPosition(end) & Node.DOCUMENT_POSITION_PRECEDING) end.parentNode.insertBefore(sec, end);
  }
})();

/* Dana (20 Nov 2026): the two price cards. "Client Collateral" becomes a deep-teal price card with its own button;
   "It's the first thing a client reads" gets an icon tile for each reason. */
(function () {
  'use strict';
  var two = document.querySelector('.wm-prices.wm-two');
  if (!two || two.classList.contains('cl-pr')) return;
  var pick = two.querySelector('.wm-card.pick'), why = two.querySelector('.wm-card:not(.pick)');
  if (pick) {
    var pr = pick.querySelector('.pr');
    if (pr) pr.insertAdjacentHTML('beforeend', '<small>once<br>for the whole set</small>');
    var sm = pick.querySelector('.sm');
    var go = document.createElement('a');
    go.className = 'cl-go'; go.href = 'build.html?coll=1'; go.innerHTML = 'Add it to your Bunya<i></i>';
    pick.insertBefore(go, sm || null);
  }
  if (why) {
    var I = [
      '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
      '<circle cx="12" cy="12" r="9"/><path d="M14.8 9.2c-.5-.8-1.5-1.3-2.8-1.3-1.7 0-2.8.8-2.8 2s1 1.7 2.8 2.1c1.9.4 2.9 1 2.9 2.2s-1.2 2.1-2.9 2.1c-1.4 0-2.5-.6-3-1.5M12 6.5v1.4M12 16.3v1.2"/>',
      '<path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M16 6l-4-4-4 4M12 2v13"/>',
      '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>'
    ];
    [].forEach.call(why.querySelectorAll('li'), function (li, i) {
      var sv = li.querySelector('svg'); if (!sv || !I[i]) return;
      var t = document.createElement('i'); t.className = 'cl-ri';
      t.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + I[i] + '</svg>';
      li.replaceChild(t, sv);
    });
    var set = document.createElement('span'); set.className = 'cl-set'; set.setAttribute('aria-hidden', 'true');
    set.innerHTML = '<small>One set, one look</small><span><em>FSG</em><em>Fee guide</em><em>Brochure</em></span>';
    why.appendChild(set);
  }
  two.classList.add('cl-pr');
})();
