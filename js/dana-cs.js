/* Case studies (case-studies.html), Dana 20 Nov 2026. Styling: css/dana-cs.css.
   - Charlotte's quote sits on a deep-teal card; Kane's on a white card beside it.
   - "Read the story" becomes a button.
   - "What each story covers": three different icons (it was the same sparkle three times), numbered 01 to 03.
   - Questions headline: "Questions, answered." with the teal second half, as on every other page. */
(function () {
  'use strict';
  var q = document.querySelectorAll('.cs-quote');
  if (q[0]) q[0].classList.add('cs-deep');
  /* Dana (20 Nov 2026): Charlotte from her Falcon portrait, set further back so she matches Tom, in both the story photo
     and her quote circle. Page-specific copies; the shared photos elsewhere are unchanged. */
  var st = document.querySelector('img[src*="falcon-story-crop"]'); if (st) st.src = 'assets/falcon-story-crop-cs.webp?v=4';
  var fc = document.querySelector('.cs-quote img[src*="falcon-charlotte-face"]'); if (fc) fc.src = 'assets/falcon-charlotte-face-cs.webp';
  var fl = document.querySelector('.cs-logo[alt^="Falcon"]'); if (fl) fl.classList.add('cs-falcon');
  if (q[1]) q[1].classList.add('cs-light');

  [].forEach.call(document.querySelectorAll('.cs-go'), function (g) {
    g.innerHTML = 'Read the story<i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></i>';
  });

  var ICONS = [
    '<svg viewBox="0 0 24 24"><path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/></svg>',
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>',
    '<svg viewBox="0 0 24 24"><path d="M4 20h16"/><path d="M7 16v-4M12 16V8M17 16V5"/></svg>'
  ];
  var sec = document.getElementById('h-covers');
  sec = sec && sec.closest('.sx-sec');
  if (sec) {
    sec.classList.add('cs-covers');
    [].forEach.call(sec.querySelectorAll('.sx-tile'), function (t, i) {
      var ic = t.querySelector('.dx-ico');
      if (ic && ICONS[i]) ic.innerHTML = ICONS[i];
      t.insertAdjacentHTML('afterbegin', '<span class="cs-n" aria-hidden="true">0' + (i + 1) + '</span>');
    });
  }
  var h = document.getElementById('h-faq');
  if (h && /Straight answers/.test(h.textContent)) h.innerHTML = 'Questions, <span>answered.</span>';
})();
