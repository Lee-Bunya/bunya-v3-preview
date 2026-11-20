/* Pricing (pricing.html), Dana 20 Nov 2026. Styling: css/dana-pr.css.
   Light pass on a signed-off page: Bunya teals only (no gold or violet accents), "Questions, answered." */
(function () {
  'use strict';
  [].forEach.call(document.querySelectorAll('main h2'), function (x) { if (/Straight answers/.test(x.textContent)) x.innerHTML = 'Questions, <span>answered.</span>'; });
})();

/* Dana (20 Nov 2026): "make it look impressive, but don't change the layout". Visual only, in place:
   - the summary card gets Bunya's rings and a bar under each example price, scaled to the largest;
   - the whole-Advice-Engine row gets a "Bundle" badge. */
(function () {
  'use strict';
  var sum = document.querySelector('.pr-sum');
  if (sum && !sum.querySelector('.pr-rings')) {
    var rows = [].slice.call(sum.querySelectorAll('.pr-lines > div'));
    var vals = rows.map(function (r) { var d = r.querySelector('dd'); return d ? parseFloat(d.textContent.replace(/[^0-9.]/g, '')) || 0 : 0; });
    var max = Math.max.apply(null, vals) || 1;
    rows.forEach(function (r, i) { r.insertAdjacentHTML('beforeend', '<span class="pr-bar" aria-hidden="true"><i style="--w:' + Math.max(6, Math.round(vals[i] / max * 100)) + '%"></i></span>'); });
  }
  [].forEach.call(document.querySelectorAll('.pr-row .pc b'), function (b) { if (/^\s*Included\s*$/.test(b.textContent)) b.classList.add('pr-inc'); });
  var ae = document.querySelector('.pr-ae .nm b');
  if (ae && !ae.querySelector('.pr-badge')) ae.insertAdjacentHTML('beforeend', ' <span class="pr-badge">Bundle</span>');
})();

/* Dana (20 Nov 2026), round 2:
   - "$7,249" in its own colour (deep teal on an aqua highlight);
   - How your price works: easy to read on white, under a deep-teal header band with Bunya's rings;
   - Getting live, included: the four on a deep-teal panel, each marked Included, with a detail chip. */
(function () {
  'use strict';
  var h = document.getElementById('h-every'), sp = h && h.querySelector('span');
  if (sp && !sp.querySelector('.pr-amt')) sp.innerHTML = sp.innerHTML.replace(/(\$[\d,]+)/, '<em class="pr-amt">$1</em>');

  var sum = document.querySelector('.pr-sum');
  if (sum && !sum.querySelector('.pr-sh')) {
    sum.classList.add('pr-sum2');
    var head = document.createElement('div'); head.className = 'pr-sh';
    var rings = sum.querySelector('.pr-rings'), k = sum.querySelector('.k'), how = sum.querySelector('.pr-how');
    if (rings) head.appendChild(rings);
    if (k) head.appendChild(k);
    if (how) head.appendChild(how);
    sum.insertBefore(head, sum.firstChild);
    var sn = sum.querySelector('.pr-sn'); if (sn) sn.insertAdjacentHTML('afterbegin', '<i class="pr-i" aria-hidden="true">i</i>');
  }

  var ev = document.querySelector('.pr-every');
  if (ev && !ev.classList.contains('pr-every2')) {
    ev.classList.add('pr-every2');
    var CH = [['30 days · Command Centre', '45 days · Advice Engine'], ['For your licensee'], ['For every role'], ['In plain English', 'Every update']];
    [].forEach.call(ev.querySelectorAll(':scope > div'), function (d, i) { /* rings go last so the cards keep their nth-child icons */
      d.insertAdjacentHTML('afterbegin', '<span class="pr-incl">Included</span>');
      if (CH[i]) d.insertAdjacentHTML('beforeend', '<span class="pr-chips">' + CH[i].map(function (c) { return '<i>' + c + '</i>'; }).join('') + '</span>');
    });
  }
})();

/* Dana (20 Nov 2026): the section you're reading lights up in its own Bunya colour (class .lit), the rest stay plain. */
(function () {
  'use strict';
  var grps = [].slice.call(document.querySelectorAll('.pr-list > .pr-grp'));
  if (!grps.length) return;
  var cur = null;
  function pick() {
    var mid = (innerHeight || document.documentElement.clientHeight) * 0.38, best = null;
    grps.forEach(function (g) { var r = g.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) best = g; });
    if (best === cur) return;
    if (cur) cur.classList.remove('lit');
    cur = best; if (cur) cur.classList.add('lit');
  }
  addEventListener('scroll', pick, { passive: true }); addEventListener('resize', pick); pick();
})();
