/* Booking (booking.html), Dana 20 Nov 2026. Styling: css/dana-ct.css.
   - Form: kicker and two-tone headline; the "what would you like to see" choices get a tick when picked.
   - "Prefer to talk first?" becomes call and email buttons.
   - Questions headline: "Questions, answered." */
(function () {
  'use strict';
  var form = document.querySelector('.ct-form'), h = form && form.querySelector('h2');
  if (h && !h.querySelector('span')) {
    h.insertAdjacentHTML('beforebegin', '<span class="sx-k ct-kick">Your demo</span>');
    h.innerHTML = 'Book your <span>demo.</span>';
  }
  var talk = document.querySelector('.ct-talk');
  if (talk && !talk.querySelector('.ct-btns')) {
    talk.insertAdjacentHTML('beforeend', '<div class="ct-btns"><a class="ct-b call" href="tel:1300286922"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>1300 286 922</a><a class="ct-b mail" href="mailto:info@bunya.ai"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>info@bunya.ai</a></div>');
    var p = talk.querySelector('p'); if (p) p.textContent = 'Call or email the team and we’ll arrange the demo with you. An Australian team, Monday to Friday.';
  }
  [].forEach.call(document.querySelectorAll('main h2'), function (x) { if (/Straight answers/.test(x.textContent)) x.innerHTML = 'Questions, <span>answered.</span>'; });
})();

/* Dana (20 Nov 2026): the demo card gets a deep-teal header band with Bunya's rings */
(function () {
  'use strict';
  var form = document.querySelector('.ct-form');
  if (!form || form.querySelector('.ct-head')) return;
  var head = document.createElement('div'); head.className = 'ct-head';
  head.innerHTML = '<svg class="ct-rings" viewBox="0 0 800 800" aria-hidden="true"><g class="a"><circle cx="400" cy="400" r="380"/><circle class="n" cx="20" cy="400" r="9"/></g><g class="b"><circle class="d" cx="400" cy="400" r="300"/><circle class="n t" cx="400" cy="100" r="8"/></g><g class="c"><circle class="g" cx="400" cy="400" r="220"/><circle class="n y" cx="180" cy="400" r="8"/></g></svg>';
  ['.ct-kick', 'h2', '.ct-sub'].forEach(function (s) { var el = form.querySelector(s); if (el) head.appendChild(el); });
  head.insertAdjacentHTML('beforeend', '<ul class="ct-perks"><li>See it with example data</li><li>Talk through your firm</li><li>Leave with next steps</li></ul>');
  form.insertBefore(head, form.firstChild);
})();
