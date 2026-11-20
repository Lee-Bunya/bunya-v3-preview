/* Why Bunya (why-bunya.html), Dana 20 Nov 2026 (design pass). Styling: css/dana-why.css.
   - "Why firms choose Bunya." gets its green second half, like every other headline.
   - The eight reasons: each gets an icon that says what it is, in its own Bunya teal (two were gold), four across.
     The last, "Build your own Bunya", is the next step, so it becomes a deep-teal card that goes to Build yours. */
(function () {
  'use strict';
  var h = document.querySelector('#h-why');
  if (h && !h.querySelector('span')) h.innerHTML = 'Why firms <span>choose Bunya.</span>';
  var grid = document.querySelector('.wm-why');
  if (!grid || grid.classList.contains('wy-on')) return;
  var I = [
    '<path d="M4 6h10M4 12h16M4 18h7"/><circle cx="17" cy="6" r="2.2"/><circle cx="14" cy="18" r="2.2"/>',
    '<rect x="3" y="3" width="7.5" height="7.5" rx="1.8"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.8"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.8"/><path d="M17.25 14v6.5M14 17.25h6.5"/>',
    '<path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4 4 0 0 1-.5 9.5z"/>',
    '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
    '<circle cx="12" cy="12" r="2.5"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="m7 7 3.2 3.2M17 7l-3.2 3.2M7 17l3.2-3.2M17 17l-3.2-3.2"/>',
    '<path d="M4 20V10M10 20V6M16 20v-8M22 20H2"/><path d="m4 7 6-4 6 5 5-3"/>',
    '<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z"/><path d="M8.5 11h7M8.5 14.5h4"/>',
    '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'
  ];
  var HC = ['#11B8B1', '#0A9C96', '#0A7D79', '#04545B', '#11B8B1', '#0A9C96', '#0A7D79', '#04545B'];
  [].forEach.call(grid.querySelectorAll('.wm-card'), function (c, i) {
    c.classList.add('wy-card'); c.style.setProperty('--hc', HC[i] || '#11B8B1');
    var ic = c.querySelector('.dx-ico');
    if (ic && I[i]) { ic.className = 'dx-ico wy-ico'; ic.innerHTML = '<svg viewBox="0 0 24 24">' + I[i] + '</svg>'; }
    if (i === 7) {
      c.classList.add('wy-go');
      var a = document.createElement('a'); a.className = 'wy-btn'; a.href = 'build.html'; a.innerHTML = 'Build yours<i></i>';
      c.appendChild(a);
    }
  });
  grid.classList.add('wy-on');
})();
