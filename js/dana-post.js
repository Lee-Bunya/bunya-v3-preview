/* Insights articles (the 20 blog-*.html posts), Dana 20 Nov 2026 (design pass). Styling: css/dana-post.css.
   Headlines in the site's style: "Questions, answered." for the FAQ. */
(function () {
  'use strict';
  [].forEach.call(document.querySelectorAll('main h2'), function (h) {
    var t = h.textContent.trim();
    if (t === 'Common questions') h.innerHTML = 'Questions, <span>answered.</span>';
  });
})();

/* Dana (20 Nov 2026): article headings in the site's two-tone style, the second part in Bunya green. The split
   follows the sentence: after a question mark, colon or comma if there is one, otherwise about halfway. */
(function () {
  'use strict';
  function split(h) {
    if (h.querySelector('span, a, b') || h.closest('.sx-end')) return;
    /* Dana: these two stay one colour, on one line */
    if (/^(Keep reading\.|Sources and scope)$/.test(h.textContent.trim())) return;
    var t = h.textContent.replace(/\s+/g, ' ').trim(), a = '', b = '', m;
    if ((m = t.match(/^(.+?[?:])\s+(.+)$/))) { a = m[1]; b = m[2]; }
    else if ((m = t.match(/^(.+?,)\s+(.+)$/))) { a = m[1]; b = m[2]; }
    else {
      var w = t.split(' '); if (w.length < 2) return;
      var k = Math.max(1, Math.floor(w.length / 2));
      /* don't break a phrase: the green part shouldn't start with a joining word */
      while (k > 1 && /^(of|to|in|for|and|or|with|on|at|by|from)$/i.test(w[k])) k--;
      a = w.slice(0, k).join(' '); b = w.slice(k).join(' ');
    }
    h.textContent = a + ' ';
    var s = document.createElement('span'); s.className = 'dp-t'; s.textContent = b; h.appendChild(s);
  }
  [].forEach.call(document.querySelectorAll('.ar-top h1, .ar-page h2'), split);
})();

/* Dana (20 Nov 2026): the intro under the title, one sentence per line */
(function () {
  'use strict';
  var p = document.querySelector('.ar-top .ar-lead');
  if (!p || p.querySelector('.dp-s')) return;
  var parts = p.textContent.replace(/\s+/g, ' ').trim().match(/[^.!?]+[.!?]+(\s|$)/g);
  if (!parts || parts.length < 2) return;
  p.innerHTML = parts.map(function (s) { return '<span class="dp-s">' + s.trim() + '</span>'; }).join(' ');
})();

/* Dana (20 Nov 2026): on wider screens the title sits on two lines, the dark half over the green half. Long titles
   step their size down a little (not below 40px) until each half fits on one line. */
(function () {
  'use strict';
  var h = document.querySelector('.ar-top h1'); if (!h || !h.querySelector('.dp-t')) return;
  function lines(el) { var r = el.getClientRects(); var tops = {}; [].forEach.call(r, function (x) { tops[Math.round(x.top)] = 1; }); return Object.keys(tops).length; }
  function fit() {
    h.style.fontSize = '';
    if (innerWidth < 1001) return;
    var dark = document.createRange(); dark.selectNodeContents(h.firstChild);
    var green = document.createRange(); green.selectNodeContents(h.querySelector('.dp-t'));
    var size = parseFloat(getComputedStyle(h).fontSize);
    while (size > 40 && (lines(dark) > 1 || lines(green) > 1)) { size -= 2; h.style.fontSize = size + 'px'; }
  }
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  var t; addEventListener('resize', function () { clearTimeout(t); t = setTimeout(fit, 120); });
})();

/* Dana (20 Nov 2026): the "Strategy agreed. Your SOA draft is ready." cover (a flat grey screenshot) rebuilt as a live,
   colourful screen: the Harper family's SOA at the draft step, Mia and Tom's photos, Alex checking it, and the SOA
   itself (Aynub's cover, in the firm's template) overhanging the screen. Used where that screenshot was the cover. */
(function () {
  'use strict';
  var img = document.querySelector('.ar-cover img[src*="soa/ready.webp"]');
  if (!img || document.querySelector('.sa-stage')) return;
  var M = 'assets/meeting/';
  var I = {
    tick: '<svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
    vid: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="m16 10.5 5-3v9l-5-3"/></svg>',
    chart: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>'
  };
  var STEPS = [['Discovery', 'Done · 21 Oct', 'done'], ['Fact find', 'Confirmed · 3 Nov', 'done'], ['Strategy', 'Agreed · 5 Nov', 'done'], ['Draft SOA', 'Ready to check', 'now'], ['Approve and sign', 'Next', '']];
  var SEC = [['Scope of advice', 'Retirement planning and super', 'ok'], ['Your situation', 'From the confirmed fact find', 'ok'], ['Our recommendations', 'Three, from the strategy meeting', 'ok'],
    ['Why it’s in your interest', 'Reasons linked to Mia and Tom’s goals', 'ok'], ['Fees and costs', 'From your fee schedule', 'check'], ['Risks and what to consider', 'Including insurance inside super', 'ok']];
  var st = document.createElement('div');
  st.className = 'sa-stage'; st.setAttribute('role', 'img');
  st.setAttribute('aria-label', img.getAttribute('alt') || 'A draft statement of advice in Bunya, ready for the adviser to check');
  st.innerHTML = '<div class="sa-fit">' +
    '<div class="sa-app">' +
      '<div class="sa-top"><span class="sa-logo"></span><div class="sa-tt"><small>Clients · Harper Family · Advice</small><b>Strategy agreed. <em>Your SOA draft is ready.</em></b><span>Retirement and super advice · drafted in your firm’s template, for Alex to check</span></div>' +
        '<div class="sa-who"><img src="' + M + 'mia.jpg" alt=""><img src="' + M + 'tom.jpg" alt=""><small>Mia and Tom Harper</small></div></div>' +
      '<ol class="sa-steps">' + STEPS.map(function (s, i) { return '<li class="' + s[2] + '"><i>' + (s[2] === 'done' ? I.tick : (i + 1)) + '</i><span><b>' + s[0] + '</b><small>' + s[1] + '</small></span></li>'; }).join('') + '</ol>' +
      '<div class="sa-cols">' +
        '<div class="sa-card sa-soa"><div class="sa-ch"><i class="sa-ri">' + I.doc + '</i><span><b>Statement of Advice</b><small>Draft · in your firm’s template · 6 sections</small></span><em class="sa-pill teal">Prepared by Bunya</em></div>' +
          '<div class="sa-prog"><u style="width:83%"></u></div><small class="sa-pl">5 of 6 sections drafted · 1 to check</small>' +
          SEC.map(function (s) { return '<div class="sa-row"><span><b>' + s[0] + '</b><small>' + s[1] + '</small></span><em class="sa-pill ' + (s[2] === 'ok' ? 'ok' : 'chk') + '">' + (s[2] === 'ok' ? 'Drafted' : 'To check') + '</em></div>'; }).join('') + '</div>' +
        '<div class="sa-side">' +
          '<div class="sa-card"><div class="sa-sh">Built from</div>' +
            [['doc', 'Fact find', 'Confirmed with Mia and Tom · 3 Nov'], ['vid', 'Strategy meeting', 'Recorded · 5 Nov · note approved'], ['chart', 'Modelling', 'Current and proposed · set by Alex']].map(function (b) {
              return '<div class="sa-row"><i class="sa-ri">' + I[b[0]] + '</i><span><b>' + b[1] + '</b><small>' + b[2] + '</small></span><em class="sa-link">' + I.link + 'Linked</em></div>'; }).join('') + '</div>' +
          '<div class="sa-card sa-ok"><img src="' + M + 'alex-sq.jpg" alt=""><span><b>Before it goes to Mia and Tom</b><small>Alex checks and approves the draft</small></span><em class="sa-btn">Approve</em></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="sa-doc"><div class="sa-page">' +
      '<div class="sa-ph"><img src="assets/aynub/aynub-lockup-financial-on-light.png" alt=""><em>Draft 1</em></div>' +
      '<div class="sa-pt"><small>Statement of Advice</small><b>Retirement and super</b><span>Prepared for Mia and Tom Harper<br>by Alex Reid</span></div>' +
      '<div class="sa-toc">' + [['Scope of advice', 2], ['Your situation', 3], ['Our recommendations', 6], ['Why it’s in your interest', 10], ['Fees and costs', 14], ['Risks and what to consider', 16]].map(function (t, i) {
        return '<span><em>' + (i + 1) + '</em>' + t[0] + '<i></i><strong>' + t[1] + '</strong></span>'; }).join('') + '</div>' +
      '<div class="sa-pf"><span>Aynub Financial · Statement of Advice</span><b>1</b></div>' +
    '</div><span class="sa-dtag"><i></i>In your template · 18 pages</span></div>' +
  '</div>';
  var sc = img.closest('.ar-scene') || img.parentNode;
  sc.classList.add('sa-on');
  img.classList.add('sa-hide');
  sc.appendChild(st);
  var fit = st.querySelector('.sa-fit');
  function size() { var w = st.clientWidth; if (w) fit.style.setProperty('--k', w / 1200); }
  size(); if ('ResizeObserver' in window) new ResizeObserver(size).observe(st); else addEventListener('resize', size);
})();
