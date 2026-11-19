/* Security & your data (security-your-data.html), Dana 20 Nov 2026 (design pass). Styling: css/dana-sec.css.
   1. Questions headline: "Questions, answered." with the teal second half, as on every other page.
   2. The Bunya card beside the Microsoft 365 diagram gets the Bunya mark, like the Microsoft tiles have their icons. */
(function () {
  'use strict';
  var h = document.getElementById('h-faq');
  if (h && /Straight answers/.test(h.textContent)) h.innerHTML = 'Questions, <span>answered.</span>';
  var b = document.querySelector('.sx-bunya');
  if (b && !b.querySelector('.sec-mark')) {
    var m = document.createElement('span'); m.className = 'sec-mark'; m.setAttribute('aria-hidden', 'true');
    b.insertBefore(m, b.firstChild); b.classList.add('sec-on');
  }

  /* 3. "Your firm's Microsoft 365" diagram, livelier (Dana, 20 Nov 2026): rings behind the tenancy, a "your data stays
     here" badge, and a lock on the connection to Bunya. Styling: css/dana-sec.css. */
  var map = document.querySelector('.sx-map'), ten = map && map.querySelector('.sx-tenant'), link = map && map.querySelector('.sx-link');
  if (map) {
    map.classList.add('sec-map');
    if (ten && !ten.querySelector('.sec-rings')) {
      var r = document.createElement('span'); r.className = 'sec-rings'; r.setAttribute('aria-hidden', 'true');
      r.innerHTML = '<svg viewBox="0 0 800 800"><g class="a"><circle cx="400" cy="400" r="380"/><circle class="n" cx="20" cy="400" r="7"/></g><g class="b"><circle class="d" cx="400" cy="400" r="300"/><circle class="n t" cx="400" cy="100" r="6"/></g><g class="c"><circle class="g" cx="400" cy="400" r="220"/><circle class="n y" cx="180" cy="400" r="6"/></g></svg>';
      ten.insertBefore(r, ten.firstChild);
      var hd = ten.querySelector('.sx-tenant-h');
      if (hd) { var bd = document.createElement('span'); bd.className = 'sec-stay'; bd.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/><path d="M9 12l2 2 4-4"/></svg>Your data stays here'; hd.appendChild(bd); }
    }
    if (link && !link.querySelector('.sec-lock')) {
      link.insertAdjacentHTML('beforeend', '<i class="sec-dot" aria-hidden="true"></i><b class="sec-lock" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg></b>');
    }
    var bn = map.querySelector('.sx-bunya');
    if (bn && !bn.querySelector('.sec-tags')) bn.insertAdjacentHTML('beforeend', '<span class="sec-tags"><i>Access agreed with your firm</i><i>Only the work you ask for</i></span>');
  }

  /* 4. "Confirmed in your design": the four plain rows become colour-coded cards joined like steps, each with an icon and
     an "In your design" tick (Dana, 20 Nov 2026). Lee's wording is unchanged. */
  var rows = document.querySelector('[aria-labelledby="h-design"] .sx-rows');
  if (rows && !rows.classList.contains('sec-design')) {
    var IC = [
      '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17"/>',
      '<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/><path d="M12 8v4l2.5 2"/>',
      '<circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="9" r="2.2"/><path d="M6 8.2v7.6M8 6h4a4 4 0 0 1 4 4M18 11.2c0 3.5-3 4.8-6 4.8H8"/>',
      '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3M14 9l2 2"/>'
    ];
    rows.classList.add('sec-design');
    [].forEach.call(rows.children, function (d, k) {
      d.classList.add('sec-c' + k);
      d.insertAdjacentHTML('afterbegin', '<span class="sec-top"><span class="sec-ic"><svg viewBox="0 0 24 24" aria-hidden="true">' + (IC[k] || IC[0]) + '</svg></span><em>0' + (k + 1) + '</em></span>');
      d.insertAdjacentHTML('beforeend', '<span class="sec-ok"><i></i>In your design</span>');
    });
  }
})();
