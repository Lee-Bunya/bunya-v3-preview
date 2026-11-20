/* Contact (contact.html), Dana 20 Nov 2026 (design pass). Styling: css/dana-ct.css.
   Two-tone headlines, route cards in the Command Centre card system with their own teals, "Questions, answered.",
   and the same closing section as every other page. */
(function () {
  'use strict';
  var fh = document.querySelector('#ct-form h2');
  if (fh && !fh.querySelector('span')) fh.innerHTML = 'Send us <span>a message.</span>';
  var fq = document.querySelector('#h-faq');
  if (fq) fq.innerHTML = 'Questions, <span>answered.</span>';
  var HC = ['#11B8B1', '#0A7D79', '#04545B'];
  [].forEach.call(document.querySelectorAll('.ct-routes'), function (g) {
    [].forEach.call(g.querySelectorAll('.ct-route'), function (a, i) { a.style.setProperty('--hc', HC[i % 3]); a.classList.add('ct-card'); });
  });
  /* an icon for each card that says what it is (five were the same sparkle) */
  var IC = {
    demo: '<rect x="3" y="5" width="13" height="12" rx="2.5"/><path d="m16 9.5 5-3v9l-5-3M7 20h5"/>',
    ask: '<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z"/><path d="M9.6 9.6a2.4 2.4 0 1 1 3.4 2.2c-.6.3-1 .8-1 1.4M12 16.2h.01"/>',
    help: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.6"/><path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>',
    faq: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9.8 9.8a2.3 2.3 0 1 1 3.2 2.1c-.6.3-1 .8-1 1.4M12 16h.01"/>',
    start: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    secure: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3M12 14.5v2.5"/>'
  };
  var ORDER = ['demo', 'ask', 'help', 'faq', 'start', 'secure'];
  [].forEach.call(document.querySelectorAll('.ct-route .dx-ico'), function (ic, i) {
    var k = ORDER[i]; if (!k) return;
    ic.innerHTML = '<svg viewBox="0 0 24 24">' + IC[k] + '</svg>'; ic.classList.add('ct-ico');
  });
  var main = document.querySelector('main');
  if (main && !document.querySelector('.sx-end')) {
    var end = document.createElement('section');
    end.className = 'sx-end sx-rv in';
    end.innerHTML = '<h2>See it set up<br><span class="sx-grad">for your firm.</span></h2>' +
      '<p>Book a demo and we’ll walk you through Bunya, or build yours and see your price first.</p>' +
      '<div class="sx-ctas"><a class="sx-btn" href="booking.html">Book a demo</a><a class="sx-btn ghost" href="build.html">Build yours</a></div>';
    ['File note', 'Approved', 'Review due', 'SoA pack ready', 'Fee consent sent', 'Fact find ready', 'Evidence filed', 'Meeting booked', 'Every step', 'Every role'].forEach(function (t, i) {
      var p = document.createElement('span'); p.className = 'dx-pill dx-p' + (i + 1); p.setAttribute('aria-hidden', 'true'); p.textContent = t;
      end.insertBefore(p, end.firstChild);
    });
    main.appendChild(end);
  }
})();
