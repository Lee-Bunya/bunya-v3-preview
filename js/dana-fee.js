/* Fee consent (fee-consent.html), Dana 20 Nov 2026 (design pass).
   The opening film (small in a big frame) is replaced by the same live "Reviews and fees" screen as Review Packs
   (js/dana-rp.js and css/dana-rp.css, shared, unchanged): the Calder renewal is sent and Outlook confirms it.
   This only relabels the window bar for this page. */
(function () {
  'use strict';
  var lab = document.querySelector('.dx-dev-feat [data-bar]');
  if (lab) lab.textContent = 'Fee consent · Reviews and fees';
})();

/* Dana (20 Nov 2026): more than one question, answered from what this page already says */
(function () {
  'use strict';
  var fq = document.querySelector('#faq .hb-faq');
  if (!fq || fq.querySelector('[data-fee]')) return;
  [['Who is reminded, and when?', 'The right person in your team, while the client’s renewal window is open, so nothing lapses.'],
   ['Where is the signed consent kept?', 'On the client’s record, with the date it was signed, so it’s there when you need to show it.'],
   ['What does it cost?', 'Fee consent is included with Command Centre, from $3 per account a month.']].forEach(function (x) {
    var d = document.createElement('details'); d.setAttribute('data-fee', '');
    d.innerHTML = '<summary>' + x[0] + '<i></i></summary><p>' + x[1] + '</p>';
    fq.appendChild(d);
  });
})();
