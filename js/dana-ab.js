/* About (about.html), Dana 20 Nov 2026. Styling: css/dana-ab.css.
   - "What Bunya takes on" on deep teal with Bunya's rings and ticks; "What stays with your people" on white with person marks.
   - The Command Centre card shows the product (the Today screen), peeking in from the right.
   - Commitments numbered 01 to 04; icon tiles in Bunya teals (no yellow).
   - Questions headline: "Questions, answered." */
(function () {
  'use strict';
  var RINGS = '<svg class="ab-rings" viewBox="0 0 800 800" aria-hidden="true"><g class="a"><circle cx="400" cy="400" r="380"/><circle class="n" cx="20" cy="400" r="9"/></g><g class="b"><circle class="d" cx="400" cy="400" r="300"/><circle class="n t" cx="400" cy="100" r="8"/></g><g class="c"><circle class="g" cx="400" cy="400" r="220"/><circle class="n y" cx="180" cy="400" r="8"/></g></svg>';
  var cols = document.querySelectorAll('.ab-split .ab-col');
  if (cols[0] && !cols[0].classList.contains('ab-bunya')) { cols[0].classList.add('ab-bunya'); cols[0].insertAdjacentHTML('afterbegin', RINGS); }
  if (cols[1]) cols[1].classList.add('ab-people');

  var main = document.querySelector('.ab-card.main');
  if (main && !main.querySelector('.ab-peek')) {
    main.insertAdjacentHTML('beforeend', '<span class="ab-peek" aria-hidden="true"><img src="assets/cc/today.webp" alt="" loading="lazy"></span>');
  }

  var hold = document.getElementById('h-hold'), sec = hold && hold.closest('.sx-sec');
  if (sec) { sec.classList.add('ab-hold'); [].forEach.call(sec.querySelectorAll('.sx-tile'), function (t, i) { if (!t.querySelector('.ab-n')) t.insertAdjacentHTML('afterbegin', '<span class="ab-n" aria-hidden="true">0' + (i + 1) + '</span>'); }); }

  [].forEach.call(document.querySelectorAll('h2'), function (h) {
    if (/Straight answers/.test(h.textContent)) h.innerHTML = 'Questions, <span>answered.</span>';
  });
})();

/* Dana (20 Nov 2026): "Bunya takes on / stays with your people", visually richer. Each row gets its own icon and a
   status (Bunya's side: what it has done; your side: whose call it is), with a hand-over token between the cards. */
(function () {
  'use strict';
  var split = document.querySelector('.ab-split');
  if (!split || split.classList.contains('ab-v2')) return;
  split.classList.add('ab-v2');
  var I = {
    note: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h6M10 16h4"/>',
    form: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4v2h6V4M9 11h6M9 15h6"/>',
    soa: '<path d="M6 3h9l3 3v15H6z"/><path d="M9 10h6M9 14h6M9 18h3"/>',
    pack: '<rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V5h6v2M4 12h16"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    clip: '<path d="M20 11.5 12 19.5a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L9.7 17.2a1.7 1.7 0 0 1-2.4-2.4L15 7"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    compass: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    scale: '<path d="M12 4v16M7 20h10M5 8h14M5 8l-2.5 6a3 3 0 0 0 5 0zM19 8l-2.5 6a3 3 0 0 0 5 0z"/>',
    shield: '<path d="M12 3 5 6v6c0 4.4 3 7.4 7 9 4-1.6 7-4.6 7-9V6z"/><path d="m9 12 2 2 4-4"/>',
    pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>'
  };
  var BUNYA = [['note', 'Drafted'], ['form', 'Filled in'], ['soa', 'Drafted'], ['pack', 'Prepared'], ['mail', 'Written'], ['clip', 'Chased']];
  var PEOPLE = [['heart', 'Yours'], ['compass', 'Your call'], ['scale', 'Your call'], ['shield', 'Your call'], ['pen', 'You approve']];
  function rows(col, set) {
    [].forEach.call(col.querySelectorAll('li'), function (li, i) {
      var s = set[i]; if (!s) return;
      li.innerHTML = '<span class="ab-ri" aria-hidden="true"><svg viewBox="0 0 24 24">' + I[s[0]] + '</svg></span><span class="ab-rt">' + li.textContent + '</span><em class="ab-rs">' + s[1] + '</em>';
    });
  }
  var cols = split.querySelectorAll('.ab-col');
  if (cols[0]) rows(cols[0], BUNYA);
  if (cols[1]) rows(cols[1], PEOPLE);
  split.insertAdjacentHTML('beforeend', '<span class="ab-hand" aria-hidden="true"><i><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></i><small>Hands over</small></span>');
})();

/* Dana (20 Nov 2026), round 3: no hand-over token; commitments and good fit with more detail; the details panel redone. */
(function () {
  'use strict';
  var hand = document.querySelector('.ab-hand'); if (hand) hand.remove();
  var svg = function (p) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; };

  /* commitments: an "in practice" detail under each */
  var hold = document.querySelector('.ab-hold');
  var IN = [
    '<span class="ab-ip-k">In practice</span><span class="ab-flow"><i>Walk-through</i><b>›</b><i>Process map</i><b>›</b><i>Where work waits</i></span>',
    '<span class="ab-ip-k">In practice</span><span class="ab-gate"><span class="ab-g-doc">' + svg('<path d="M6 3h9l3 3v15H6z"/><path d="M9 10h6M9 14h6"/>') + '<span><b>Draft SOA · Harper Family</b><small>Prepared by Bunya</small></span></span><span class="ab-g-btn">Approve</span></span>',
    '<span class="ab-ip-k">In practice</span><span class="ab-proof"><i class="ok">✓ Scenario tested with your team</i><i class="gap">Gap logged · owner named</i></span>',
    '<span class="ab-ip-k">In practice</span><span class="ab-m365"><i>Microsoft 365</i><i>Outlook</i><i>Teams</i><i>SharePoint</i></span>'
  ];
  if (hold && !hold.querySelector('.ab-ip')) [].forEach.call(hold.querySelectorAll('.sx-tile'), function (t, i) { if (IN[i]) t.insertAdjacentHTML('beforeend', '<div class="ab-ip">' + IN[i] + '</div>'); });

  /* good fit: badges on each card, an icon per line, a fit-check link underneath */
  var fit = document.querySelector('.ab-fit');
  if (fit && !fit.classList.contains('ab-fit2')) {
    fit.classList.add('ab-fit2');
    var yes = fit.querySelector('.yes'), no = fit.querySelector('.no');
    if (yes) yes.insertAdjacentHTML('afterbegin', '<span class="ab-badge good">Good fit</span>');
    if (no) no.insertAdjacentHTML('afterbegin', '<span class="ab-badge not">Probably not</span>');
    var YI = ['<path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/>', '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>', '<path d="M4 17l5-5 4 4 7-8"/><path d="M15 8h5v5"/>', '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>'];
    if (yes) [].forEach.call(yes.querySelectorAll('li'), function (li, i) { li.insertAdjacentHTML('afterbegin', '<span class="ab-fi">' + svg(YI[i] || YI[0]) + '</span>'); });
    if (no) [].forEach.call(no.querySelectorAll('li'), function (li) { li.insertAdjacentHTML('afterbegin', '<span class="ab-fi x">' + svg('<path d="M7 7l10 10M17 7 7 17"/>') + '</span>'); });
    fit.insertAdjacentHTML('afterend', '<a class="ab-fitcta sx-rv in" href="is-bunya-right.html"><span><b>Not sure which side you’re on?</b><small>Answer a few questions about your firm and see if Bunya fits.</small></span><span class="ab-fitgo">Take the fit check<i>' + svg('<path d="M5 12h14M13 6l6 6-6 6"/>') + '</i></span></a>');
  }

  /* details panel: Bunya rings, an icon per detail, email and phone as buttons */
  var co = document.querySelector('.ab-co');
  if (co && !co.classList.contains('ab-co2')) {
    co.classList.add('ab-co2');
    var CI = {
      'Company': '<path d="M4 21V6l8-3 8 3v15"/><path d="M9 21v-5h6v5M8 9h2M14 9h2M8 13h2M14 13h2"/>',
      'ABN': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 10h6M7 14h4M16 10h1"/>',
      'Based in': '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
      'Built in': '<path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4-1.5A4.5 4.5 0 0 0 7 18z"/>',
      'Email': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
      'Phone': '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'
    };
    [].forEach.call(co.children, function (d) {
      var dt = d.querySelector('dt'); if (!dt) return; var k = dt.textContent.trim();
      d.insertAdjacentHTML('afterbegin', '<span class="ab-ci">' + svg(CI[k] || CI.Company) + '</span>');
      if (k === 'Email' || k === 'Phone') d.classList.add('ab-act');
    });
    co.insertAdjacentHTML('afterbegin', '<svg class="ab-rings ab-co-rings" viewBox="0 0 800 800" aria-hidden="true"><g class="a"><circle cx="400" cy="400" r="380"/><circle class="n" cx="20" cy="400" r="9"/></g><g class="b"><circle class="d" cx="400" cy="400" r="300"/><circle class="n t" cx="400" cy="100" r="8"/></g><g class="c"><circle class="g" cx="400" cy="400" r="220"/><circle class="n y" cx="180" cy="400" r="8"/></g></svg>');
  }
  var falcon = document.querySelector('.ab-logos img[alt^="Falcon"]'); if (falcon) falcon.classList.add('ab-falcon');
})();
