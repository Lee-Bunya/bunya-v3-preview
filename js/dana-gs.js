/* Getting started (getting-started.html), Dana 20 Nov 2026 (design pass). Styling: css/dana-gs.css.
   - The setup and "included" cards get coloured icon tiles, like cards on every other page.
   - Questions headline: "Questions, answered." with the teal second half. */
(function () {
  'use strict';
  var I = {
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1"/>',
    choose: '<path d="M4 6h10M4 12h16M4 18h7"/><circle cx="17" cy="6" r="2.5"/><circle cx="14" cy="18" r="2.5"/>',
    check: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M8 12l3 3 5-6"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    rocket: '<path d="M14 4c3 0 6 3 6 6l-7 7-6-6z"/><path d="M7 11l-3 1 2 2M13 17l-1 3-2-2"/><circle cx="15" cy="9" r="1.6"/>',
    shield: '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/><path d="M9 12l2 2 4-4"/>',
    play: '<rect x="3.5" y="5" width="17" height="13" rx="3"/><path d="M10.5 9.2v4.6l4-2.3z"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5"/>',
    wand: '<path d="M4 20L16 8M14 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM19 11l.6 1.2 1.2.6-1.2.6L19 14.6l-.6-1.2-1.2-.6 1.2-.6z"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M8.5 13h7M8.5 16.5h5"/>'
  };
  function add(sel, keys) {
    var cards = document.querySelectorAll(sel);
    [].forEach.call(cards, function (c, k) {
      if (c.querySelector('.gs-ic')) return;
      c.insertAdjacentHTML('afterbegin', '<span class="gs-ic gs-c' + (k % 4) + '" aria-hidden="true"><svg viewBox="0 0 24 24">' + I[keys[k] || 'spark'] + '</svg></span>');
      c.classList.add('gs-on');
    });
  }
  add('[aria-labelledby="h-setup"] .gs-step', ['gear', 'choose', 'check', 'clock']);
  add('[aria-labelledby="h-incl"] .gs-step', ['rocket', 'shield', 'play', 'spark', 'wand', 'doc']);
  var h = document.getElementById('h-faq');
  if (h && /Straight answers/.test(h.textContent)) h.innerHTML = 'Questions, <span>answered.</span>';

  /* More colour and depth (Dana, 20 Nov 2026): Bunya's rotating rings behind the hero and the "included" band */
  function rings(cls) { return '<svg class="gs-rings ' + cls + '" viewBox="0 0 800 800" aria-hidden="true"><g class="a"><circle cx="400" cy="400" r="380"/><circle class="n" cx="20" cy="400" r="7"/></g><g class="b"><circle class="d" cx="400" cy="400" r="300"/><circle class="n t" cx="400" cy="100" r="6"/></g><g class="c"><circle class="g" cx="400" cy="400" r="220"/><circle class="n y" cx="180" cy="400" r="6"/></g><g class="e"><circle cx="400" cy="400" r="150"/></g></svg>'; }
  var hero = document.querySelector('.sx-hero');
  if (hero) hero.classList.add('gs-hero');   /* soft glow only; no moving rings in the hero (Dana) */
  var inc = document.querySelector('[aria-labelledby="h-incl"]');
  if (inc && !inc.querySelector('.gs-rings')) { inc.classList.add('gs-deep'); inc.insertAdjacentHTML('afterbegin', rings('r')); }

  /* "After go-live, and the price", redone (Dana, 20 Nov 2026): Care as a card with what it includes, Pricing as a
     deep-teal card with the price up front. Same facts and links as Lee's two tiles, which stay in the page, hidden. */
  var two = document.querySelector('[aria-labelledby="h-after"] .gs-two');
  if (two && !document.querySelector('.ga-wrap')) {
    var TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12.5l4 4 8-9"/></svg>';
    var ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    var CARE = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.6"/><path d="M6 6l3.4 3.4M18 6l-3.4 3.4M6 18l3.4-3.4M18 18l-3.4-3.4"/></svg>';
    var TAG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 12.6V4.5a1 1 0 0 1 1-1h8.1a1 1 0 0 1 .7.3l7.4 7.4a1 1 0 0 1 0 1.4l-8.1 8.1a1 1 0 0 1-1.4 0l-7.4-7.4a1 1 0 0 1-.3-.7z"/><circle cx="8.3" cy="8.3" r="1.6"/></svg>';
    var w = document.createElement('div');
    w.className = 'ga-wrap sx-rv in';
    w.innerHTML =
      '<a class="ga-card ga-care" href="care.html"><span class="ga-ic">' + CARE + '</span><span class="ga-k">After go-live</span><b class="ga-t">Care</b>' +
        '<p class="ga-lead">Included when you subscribe.</p><ul class="ga-list">' +
        ['Tutorials for each role', 'A team to ask', 'A regular session to choose the next improvement', 'Your own Bunya Portal'].map(function (x) { return '<li><i>' + TICK + '</i>' + x + '</li>'; }).join('') +
        '</ul><span class="ga-go">See Care' + ARROW + '</span></a>' +
      '<a class="ga-card ga-price" href="pricing.html"><span class="ga-ic">' + TAG + '</span><span class="ga-k">The price, up front</span><b class="ga-t">Pricing</b>' +
        '<span class="ga-big"><small>From</small><strong>$3</strong><em>per account<br>a month</em></span><ul class="ga-rows">' +
        [['Monthly minimum', '$500'], ['Standard setup', '$7,249 once'], ['Microsoft licences', 'Billed by Microsoft']].map(function (r) { return '<li><span>' + r[0] + '</span><b>' + r[1] + '</b></li>'; }).join('') +
        '</ul><span class="ga-go">See pricing' + ARROW + '</span></a>';
    two.insertAdjacentElement('afterend', w);
    /* Bunya's rotating rings in the Pricing card, in place of the still circles (Dana) */
    var pc = w.querySelector('.ga-price'); if (pc) pc.insertAdjacentHTML('afterbegin', rings('ga'));
    /* Care card: a small Bunya Portal preview, with what Care looks like in use (wording from the Care page) */
    var cc = w.querySelector('.ga-care');
    if (cc) cc.insertAdjacentHTML('afterbegin', '<span class="ga-portal" aria-hidden="true"><span class="gp-h"><i></i><b>Bunya Portal</b><small>Your improvements</small></span>' +
      '<span class="gp-r"><em class="ok"></em><span>Release 1</span><b>Shipped 28 Oct</b></span>' +
      '<span class="gp-r"><em class="go"></em><span>Release 2</span><b>In build</b></span>' +
      '<span class="gp-r"><em class="go"></em><span>Review Packs</span><b>In testing</b></span>' +
      '<span class="gp-next"><svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg><span><small>Next session</small><b>Thu 19 Nov</b></span></span></span>');
    /* and a second, matching widget in the bottom right for balance: the team you can ask (wording from the Care page) */
    if (cc) cc.insertAdjacentHTML('beforeend', '<span class="ga-portal ga-ask" aria-hidden="true"><span class="gp-h"><i class="q"></i><b>Your requests</b><small>A team to ask</small></span>' +
      '<span class="gp-stats"><span><b>2</b><small>open</small></span><span><b>1</b><small>waiting on you</small></span></span>' +
      '<span class="gp-tag"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg>Answers show their sources</span></span>');
    two.classList.add('ga-hidden');
  }
})();
