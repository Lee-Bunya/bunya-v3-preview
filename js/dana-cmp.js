/* Compare Models (compare.html), Dana 20 Nov 2026 (design pass). Styling: css/dana-cmp.css.
   - The table gets a headline and a header row naming the three models (it stays in view as you scroll), so every
     tick can be read against its model. The recommended model's column is tinted all the way down.
   - The recommended model card goes deep teal, like the price cards on the other pages. */
(function () {
  'use strict';
  var t = document.querySelector('.cm-table');
  if (!t || document.querySelector('.cm-head')) return;
  var names = [].map.call(document.querySelectorAll('.cm-cols .cm-col h2'), function (h) { return h.textContent.trim(); });
  var prices = [].map.call(document.querySelectorAll('.cm-cols .cm-col .pr b'), function (b) { return b.textContent.trim(); });
  var head = document.createElement('div');
  head.className = 'cm-head'; head.setAttribute('aria-hidden', 'true');
  head.innerHTML = '<span class="cm-hk">What each model includes</span>' + names.map(function (n, i) {
    return '<span class="cm-hn' + (i === 1 ? ' pick' : '') + '"><b>' + n + '</b><small>' + (prices[i] || '') + ' per account a month</small></span>';
  }).join('');
  var sh = document.createElement('div');
  sh.className = 'sx-head cm-sh';
  sh.innerHTML = '<span class="sx-k">Side by side</span><h2>Every model, <span>line by line.</span></h2>';
  t.parentNode.insertBefore(sh, t);
  t.insertBefore(head, t.firstChild);
  t.classList.add('cm-on');
  /* nicer icons on the three model cards: a dashboard, an SOA being drafted, and every app stacked */
  var IC = [
    '<rect x="3" y="3" width="8" height="10" rx="2"/><rect x="13" y="3" width="8" height="6" rx="2"/><rect x="13" y="11" width="8" height="10" rx="2"/><rect x="3" y="15" width="8" height="6" rx="2"/>',
    '<path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z"/><path d="M13.5 3v5.5H19M8.5 13h4M8.5 17h6"/><path d="M17.5 12.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
    '<path d="m12 3 9 4.5-9 4.5-9-4.5z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16.5 9 4.5 9-4.5"/>'
  ];
  [].forEach.call(document.querySelectorAll('.cm-cols .cm-col'), function (c, i) {
    var ic = c.querySelector('.dx-ico'); if (!ic || !IC[i]) return;
    ic.className = 'dx-ico cm-ico cm-i' + (i + 1); ic.innerHTML = '<svg viewBox="0 0 24 24">' + IC[i] + '</svg>';
  });
})();
