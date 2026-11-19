/* Small UX additions for Pricing and Build your Bunya (Dana, 18 Nov 2026). Styling lives in css/dana-system.css.
   Pricing: a sticky section index built from the section headings, which highlights the section you're reading.
   Build:   tap anywhere on a choice row to select it (not only the small box), and the slider fills to its value.
   It only adds behaviour on top of the page; if it doesn't load, the pages work exactly as before. */
(function () {
  'use strict';

  /* ---- Intro text: each sentence starts on its own line (tablets and up, see css/dana-system.css) ---- */
  [].forEach.call(document.querySelectorAll('.sx-hero > p, .byo-hero > p, .sx-end > p'), function (p) {
    if (p.children.length || p.classList.contains('dana-sents')) return;   // plain text only
    var parts = p.textContent.trim().split(/(?<=[.!?])\s+(?=[A-Z])/);
    if (parts.length < 2) return;
    p.textContent = '';
    parts.forEach(function (s, i) {
      var span = document.createElement('span');
      span.className = 'dana-sent';
      span.textContent = s;
      p.appendChild(span);
      if (i < parts.length - 1) p.appendChild(document.createTextNode(' '));
    });
    p.classList.add('dana-sents');
  });

  /* ---- Pricing: section index ---- */
  var list = document.querySelector('.pr-list');
  var hero = document.querySelector('.pr-hero');
  if (list && hero) {
    var groups = [].slice.call(list.querySelectorAll(':scope > .pr-grp'));
    var nav = document.createElement('nav');
    nav.className = 'dx-jump';
    nav.setAttribute('aria-label', 'Price sections');
    var inner = document.createElement('div');
    inner.className = 'dx-jump-in';
    var links = groups.map(function (g, i) {
      var h = g.querySelector('h2');
      if (!g.id) g.id = 'prices-' + (i + 1);
      var a = document.createElement('a');
      a.href = '#' + g.id;
      var n = document.createElement('span');
      n.textContent = String(i + 1).padStart(2, '0');
      a.appendChild(n);
      a.appendChild(document.createTextNode(h ? h.textContent : ''));
      inner.appendChild(a);
      return a;
    });
    nav.appendChild(inner);
    hero.insertAdjacentElement('afterend', nav);

    // Mark the index once it sticks under the menu
    var stuck = new IntersectionObserver(function (es) {
      nav.classList.toggle('stuck', es[0].intersectionRatio < 1 && es[0].boundingClientRect.top < 70);
    }, { threshold: [1], rootMargin: '-61px 0px 0px 0px' });
    stuck.observe(nav);

    // Highlight the section being read and keep its chip in view
    var current = -1;
    function setOn(i) {
      if (i === current) return;
      current = i;
      links.forEach(function (a, j) { a.classList.toggle('on', j === i); });
      var a = links[i];
      if (a) {
        var l = a.offsetLeft - 16, r = a.offsetLeft + a.offsetWidth + 16;
        if (l < inner.scrollLeft || r > inner.scrollLeft + inner.clientWidth) inner.scrollTo({ left: l, behavior: 'smooth' });
      }
    }
    function spy() {
      var line = 60 + 56 + 80, on = -1;
      groups.forEach(function (g, i) { if (g.getBoundingClientRect().top <= line) on = i; });
      setOn(on);
      // tuck the index away once the price list has scrolled past
      nav.classList.toggle('gone', list.getBoundingClientRect().bottom < line);
    }
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; spy(); }); }
    }, { passive: true });
    spy();
  }

  /* ---- Build: whole-row selecting and the slider fill ---- */
  var steps = document.querySelector('.byo-steps');
  if (steps) {
    steps.addEventListener('click', function (e) {
      if (e.target.closest('a, button, input, label, summary, select, textarea')) return;
      var row = e.target.closest('.pr-row');
      if (!row || !steps.contains(row)) return;
      var tk = row.querySelector('.pr-tk');
      if (tk && !tk.disabled) tk.click();
    });
  }

  /* ---- Visual interest from Dana's bunya.ai review (19 Nov 2026) ----
     1. Colour-coded icon tiles on text-only cards, as on bunya.ai: the icon is picked from the card's heading,
        the colour cycles teal, gold, deep teal, mid teal, aqua. Decorative only (hidden from screen readers).
     2. Every second section sits on a pale teal band. Styling in css/dana-style.css (Part C). */
  var ICONS = {
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14.8c1.7.8 2.8 2.5 3 5.2"/>',
    shield: '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.3-4.7L4 8"/><path d="M4 3.5V8h4.5M4 13a8 8 0 0 0 14.3 4.7L20 16"/><path d="M20 20.5V16h-4.5"/>',
    pen: '<path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    ms: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    tag: '<path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8-9 9z"/><circle cx="8.5" cy="8.5" r="1.5"/>',
    tool: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3z"/><path d="M14.5 6.5L17 4l3 3-2.5 2.5"/>',
    window: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M3 9h18M7 6.8h.01M10 6.8h.01"/>',
    phone: '<path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    check: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.2l2.4 2.4 4.6-4.8"/>',
    pin: '<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'
  };
  var RULES = [
    [/microsoft|365|tenancy|teams|outlook|sharepoint/i, 'ms'], [/secur|licensee|complian|audit|privacy|consent|safe|trust|claim/i, 'shield'],
    [/meeting|record(ed|ing)|transcri|notes?\b/i, 'mic'], [/review|renew|annual|follow/i, 'refresh'], [/sign|approv|decid|gate|person|human/i, 'pen'],
    [/soa|statement|document|file|paper|report|brief|template/i, 'doc'], [/client|people|team|adviser|staff|hire|person|role|who/i, 'users'],
    [/time|hour|day|week|tuesday|slip|wait|fast/i, 'clock'], [/price|cost|\$|fee|pay|free|budget/i, 'tag'], [/build|shape|custom|change|your own|tool/i, 'tool'],
    [/portal|app|screen|site|website/i, 'window'], [/phone|call|voice/i, 'phone'], [/email|message|inbox/i, 'mail'], [/revenue|growth|grow|scale|more/i, 'chart'],
    [/australia|local|based/i, 'pin'], [/system|platform|stack|place|one /i, 'layers'], [/ai\b|draft|prepar|auto/i, 'spark']
  ];
  var CARDS = '.v5-prob,.v5-role,.v5-tcard,.fit-card,.hb-who > div,.co-get,.co-teaser,.ab-card,.ab-col,.ab-fitcol,.gs-card,.wm-card,.ct-route,.st .kinds > div,.sx-tile,.cm-col,.pp-points > div,.sx-grid3 > div,.sx-grid2 > div';
  var cardList = [].slice.call(document.querySelectorAll(CARDS));
  cardList.forEach(function (card) {
    if (card.querySelector('svg,img,video,picture,.n,.ic,.dx-ico')) return;
    var head = card.querySelector('h3,h4,b,strong');
    var txt = (head ? head.textContent : card.textContent).slice(0, 140);
    var key = 'spark';
    for (var i = 0; i < RULES.length; i++) { if (RULES[i][0].test(txt)) { key = RULES[i][1]; break; } }
    var sibs = [].filter.call(card.parentElement.children, function (c) { return c.matches(CARDS); });
    var n = sibs.indexOf(card) % 5 + 1;
    var tile = document.createElement('span');
    tile.className = 'dx-ico dx-c' + n;
    tile.setAttribute('aria-hidden', 'true');
    tile.innerHTML = '<svg viewBox="0 0 24 24">' + ICONS[key] + '</svg>';
    card.insertBefore(tile, card.firstChild);
    card.classList.add('dx-has-ico');
  });

  var main = document.querySelector('main');
  if (main && !document.querySelector('.pr-list,.byo')) {
    var secs = [].filter.call(main.children, function (el) {
      return el.tagName === 'SECTION' && !/hero|sx-end|pp-hero|ar-top/.test(el.className);
    });
    secs.forEach(function (el, i) { if (i % 2 === 1) el.classList.add('dx-band'); });
  }

  /* Closing band: the floating pills from the bunya.ai review (decorative) */
  var PILLS = ['File note', 'Approved', 'Review due', 'SoA pack ready', 'Fee consent sent', 'Fact find ready', 'Evidence filed', 'Meeting booked', 'Every step', 'Every role'];
  [].forEach.call(document.querySelectorAll('.sx-end'), function (end) {
    if (end.querySelector('.dx-pill')) return;
    PILLS.forEach(function (t, i) {
      var p = document.createElement('span');
      p.className = 'dx-pill dx-p' + (i + 1);
      p.setAttribute('aria-hidden', 'true');
      p.textContent = t;
      end.insertBefore(p, end.firstChild);
    });
  });

  /* Home "One system for the whole firm": a still picture of each role instead of the film (Dana: no animation, bigger) */
  [].forEach.call(document.querySelectorAll('.v5-role figure video'), function (v) {
    var name = (v.getAttribute('src') || '').split('/').pop().replace('.mp4', '');
    if (!name) return;
    var img = document.createElement('img');
    img.className = 'dx-still';
    img.src = 'assets/films/stills/' + name + '.jpg';
    img.alt = v.getAttribute('aria-label') || '';
    img.width = 1920; img.height = 1080;
    img.loading = 'lazy';
    v.parentNode.replaceChild(img, v);
    /* Principal: the pipeline window on its own, with the Teams note placed over its top edge, just overhanging */
    if (name === 'advice-pipeline') {
      img.src = 'assets/films/stills/advice-pipeline-window.jpg';
      img.width = 1376; img.height = 828;
      var note = document.createElement('img');
      note.className = 'dx-note';
      note.src = 'assets/films/stills/advice-pipeline-note.jpg';
      note.alt = 'Teams notification: Shah Family moved to Fact find. Alex owns it, due Friday.';
      note.width = 522; note.height = 114;
      img.parentNode.classList.add('dx-comp');
      img.parentNode.appendChild(note);
    }
  });

  var range = document.getElementById('byo-hh');
  if (range) {
    var fill = function () {
      var min = +range.min || 0, max = +range.max || 100;
      range.style.setProperty('--p', ((range.value - min) / (max - min) * 100) + '%');
    };
    range.addEventListener('input', fill);
    // the page's own script also sets the value (size buttons, saved builds): follow it
    document.addEventListener('click', function (e) { if (e.target.closest('.byo-sizes button')) requestAnimationFrame(fill); });
    window.addEventListener('pageshow', fill);
    fill();
    setTimeout(fill, 300);
  }
})();
