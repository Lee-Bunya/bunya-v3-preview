/* Bunya compared (bunya-vs-competitors.html), Dana 20 Nov 2026 (design pass). Styling: css/dana-vs.css.
   - The scores (loose pills) become a headed scoreboard with a bar for each product, Bunya first.
   - The page ends with the same closing section as every other page. No comparison data is changed. */
(function () {
  'use strict';
  var rk = document.querySelector('.vs-rank');
  if (rk && !document.querySelector('.vs-board')) {
    var items = [].map.call(rk.querySelectorAll('li'), function (li) {
      return { n: li.querySelector('span').textContent, v: li.querySelector('b').textContent, us: li.classList.contains('us') };
    });
    var bd = document.createElement('section');
    bd.className = 'vs-board';
    bd.innerHTML = '<div class="sx-head"><span class="sx-k">The scores</span><h2>Every feature, <span>added up.</span></h2></div>' +
      '<p class="vs-bsub">Has it counts as one, partly as a half, across every row of the table below.</p>' +
      '<ol>' + items.map(function (x) {
        return '<li' + (x.us ? ' class="us"' : '') + '><span class="vs-bn">' + x.n + '</span><span class="vs-bar"><u style="width:' + x.v + '"></u></span><b>' + x.v + '</b></li>';
      }).join('') + '</ol>';
    rk.parentNode.insertBefore(bd, rk);
    rk.classList.add('vs-hide');
  }
  var main = document.querySelector('main.vs');
  if (main && !document.querySelector('.sx-end')) {
    var end = document.createElement('section');
    end.className = 'sx-end sx-rv in';
    end.innerHTML = '<h2>See it set up<br><span class="sx-grad">for your firm.</span></h2>' +
      '<p>Book a demo and we’ll show you each of these features working, or build yours and see your price.</p>' +
      '<div class="sx-ctas"><a class="sx-btn" href="booking.html">Book a demo</a><a class="sx-btn ghost" href="build.html">Build yours</a></div>';
    ['File note', 'Approved', 'Review due', 'SoA pack ready', 'Fee consent sent', 'Fact find ready', 'Evidence filed', 'Meeting booked', 'Every step', 'Every role'].forEach(function (t, i) {
      var p = document.createElement('span'); p.className = 'dx-pill dx-p' + (i + 1); p.setAttribute('aria-hidden', 'true'); p.textContent = t;
      end.insertBefore(p, end.firstChild);
    });
    /* after main, not inside it: main has side margins here, and the band runs edge to edge on every other page */
    main.parentNode.insertBefore(end, main.nextSibling);
  }
})();

/* Dana (20 Nov 2026), round 2:
   1. The answer first: the scoreboard moves up under the hero, in a compact two-column layout, and the table that
      backs it up gets its own heading, with the key and one "checked" date above it.
   2. A calmer table: one checked date instead of ten, a clearer "partly" mark, tap a "partly" mark for the reason.
   3. Each group in the table shows every product's score for that group. */
(function () {
  'use strict';
  var main = document.querySelector('main.vs'), top = document.querySelector('.vs-top'), board = document.querySelector('.vs-board');
  var wrap = document.querySelector('.vs-wrap'), key = document.querySelector('.vs-key'), table = wrap && wrap.querySelector('table');
  if (!main || !top || !wrap || !table || main.classList.contains('vs-r2')) return;
  main.classList.add('vs-r2');
  if (board) { top.parentNode.insertBefore(board, top.nextSibling); board.classList.add('vs-compact'); }
  var head = document.createElement('div');
  head.className = 'sx-head vs-thead';
  head.innerHTML = '<span class="sx-k">Feature by feature</span><h2>The detail <span>behind the scores.</span></h2>';
  wrap.parentNode.insertBefore(head, wrap);
  if (key) wrap.parentNode.insertBefore(key, wrap);
  /* one checked date, if every product shares it */
  var dates = [].map.call(table.querySelectorAll('thead th em'), function (e) { return e.textContent.replace(/\s+/g, ' ').trim(); }).filter(function (t) { return /^Checked/.test(t); });
  var uniq = dates.filter(function (d, i) { return dates.indexOf(d) === i; });
  if (uniq.length === 1) {
    [].forEach.call(table.querySelectorAll('thead th em'), function (e) { if (/^Checked/.test(e.textContent.trim())) e.classList.add('vs-hide'); });
    var cd = document.createElement('p'); cd.className = 'vs-checked';
    cd.textContent = 'Every product ' + uniq[0].replace(/^Checked\s*/, 'checked on ') + ', against its own website, help pages and trade press.';
    wrap.parentNode.insertBefore(cd, wrap);
  }
  /* group rows: each product's score for that group */
  var rows = [].slice.call(table.querySelectorAll('tbody tr'));
  var groups = [], cur = null;
  rows.forEach(function (r) { if (r.classList.contains('vs-g')) { cur = { row: r, items: [] }; groups.push(cur); } else if (cur) cur.items.push(r); });
  groups.forEach(function (g) {
    var th = g.row.querySelector('th'); if (!th || !g.items.length) return;
    var n = g.items[0].querySelectorAll('td').length, cells = '';
    for (var c = 0; c < n; c++) {
      var s = 0;
      g.items.forEach(function (r) { var d = r.querySelectorAll('td')[c], i = d && d.querySelector('.vs-dot'); if (!i) return; if (i.classList.contains('y')) s += 1; else if (i.classList.contains('p')) s += .5; });
      var pc = Math.round(s / g.items.length * 100);
      cells += '<td class="vs-gs' + (c === 0 ? ' us' : '') + '"><b>' + pc + '%</b></td>';
    }
    th.removeAttribute('colspan');
    th.insertAdjacentHTML('afterend', cells);
    g.row.classList.add('vs-g2');
  });
  /* tap a "partly" mark to read why (the reason was only on hover) */
  var pop = document.createElement('div'); pop.className = 'vs-pop'; pop.setAttribute('role', 'status'); document.body.appendChild(pop);
  table.addEventListener('click', function (e) {
    var d = e.target.closest('.vs-dot.p, .vs-dot.n'); if (!d) { pop.classList.remove('on'); return; }
    var r = d.getBoundingClientRect();
    pop.textContent = d.getAttribute('title') || '';
    pop.style.left = Math.max(12, Math.min(innerWidth - 292, r.left + r.width / 2 - 140)) + 'px';
    pop.style.top = (r.bottom + 10) + 'px';
    pop.classList.add('on');
  });
  addEventListener('scroll', function () { pop.classList.remove('on'); }, { passive: true });
  wrap.addEventListener('scroll', function () { pop.classList.remove('on'); }, { passive: true });
})();

/* the small print matches the new layout: one checked date above the table, and partly marks can be tapped */
(function () {
  'use strict';
  var f = document.querySelector('.vs-fine'); if (!f || !document.querySelector('.vs-checked')) return;
  f.innerHTML = f.innerHTML
    .replace('; the date under each name is when we last checked it', ', on the date shown above the table')
    .replace('Hover over a dot to see why it’s partly.', 'Hover over or tap a partly mark to see why.');
})();
