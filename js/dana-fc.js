/* Falcon customer story (case-study-falcon.html), Dana 20 Nov 2026. Styling: css/dana-fc.css.
   "The story at a glance" cards (The firm, The work, The environment): each gets an icon that says what it is (they
   were all the same sparkle), its own Bunya teal, and a short fact chip at the foot, in the same card system as
   Command Centre's "All of this comes with it" cards. */
(function () {
  'use strict';
  var box = document.querySelector('.kinds.three');
  if (!box || box.classList.contains('fc-on')) return;
  var ICO = {
    firm: '<svg viewBox="0 0 24 24"><path d="M4 21V8l8-5 8 5v13"/><path d="M9 21v-6h6v6M3 21h18M9 10h.01M15 10h.01"/></svg>',
    work: '<svg viewBox="0 0 24 24"><path d="m4 6 1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17M11 6h9M11 12h9M11 18h9"/></svg>',
    env: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>'
  };
  var SET = [
    { k: 'firm', hc: '#11B8B1', fact: '4 offices · NSW and QLD' },
    { k: 'work', hc: '#0A7D79', fact: '75 steps · The Falcon Engine' },
    { k: 'env', hc: '#04545B', fact: 'Microsoft 365 · already known' }
  ];
  [].forEach.call(box.children, function (card, i) {
    var s = SET[i]; if (!s) return;
    card.classList.add('fc-card');
    card.style.setProperty('--hc', s.hc);
    var ic = card.querySelector('.dx-ico');
    if (ic) { ic.innerHTML = ICO[s.k]; ic.className = 'dx-ico fc-ico'; }
    var f = document.createElement('span');
    f.className = 'fc-fact'; f.textContent = s.fact;
    card.appendChild(f);
  });
  box.classList.add('fc-on');
})();

/* Dana (20 Nov 2026), design pass on the rest of the page */
(function () {
  'use strict';
  /* Falcon's logo above the headline, so the page says whose story it is at a glance */
  var h1 = document.querySelector('#page-title');
  if (h1 && !document.querySelector('.fc-logo')) {
    var lg = document.createElement('img');
    lg.className = 'fc-logo'; lg.src = 'assets/1bc84bf507fd.png'; lg.alt = 'Falcon Financial Advisers';
    h1.parentNode.insertBefore(lg, h1);
  }

  /* bullet lists in the story become small cards */
  [].forEach.call(document.querySelectorAll('.sheet-body .prose > ul'), function (ul) { ul.classList.add('fc-list'); });

  /* Charlotte's quotes become quote cards, each with her photo */
  [].forEach.call(document.querySelectorAll('.sheet-body figure.pull'), function (f) {
    f.classList.add('fc-quote');
    var cap = f.querySelector('figcaption');
    if (cap && !cap.querySelector('img')) {
      var im = document.createElement('img');
      im.className = 'face'; im.src = 'assets/falcon-charlotte-face.webp'; im.alt = ''; im.width = 96; im.height = 96;
      cap.insertBefore(im, cap.firstChild);
    }
  });

  /* the before-and-after table: tick on the Bunya side */
  var bw = document.querySelector('table.bw');
  if (bw) bw.classList.add('fc-bw');

  /* FAQ heading the same as every other page */
  var fq = document.querySelector('#faq-title');
  if (fq) fq.innerHTML = 'Questions, <span class="sv">answered.</span>';

  /* closing section: the same one as every other page (Command Centre's), headline on two lines */
  var old = document.querySelector('.s-close');
  if (old && !document.querySelector('.sx-end')) {
    var end = document.createElement('section');
    end.className = 'sx-end sx-rv in fc-end';
    end.innerHTML =
      '<h2>See your advice process <br><span class="sx-grad">in one place.</span></h2>' +
      '<p>See how Command Centre is built around your firm’s own process, the way it was for Falcon.</p>' +
      '<div class="sx-ctas"><a class="sx-btn" href="booking.html">Book a demo</a><a class="sx-btn ghost" href="build.html">Build yours</a></div>' +
      '<a class="fc-next" href="case-study-regional-prosperity.html"><small>Read another story</small>Regional Prosperity</a>';
    var PILLS = ['File note', 'Approved', 'Review due', 'SoA pack ready', 'Fee consent sent', 'Fact find ready', 'Evidence filed', 'Meeting booked', 'Every step', 'Every role'];
    PILLS.forEach(function (t, i) {
      var p = document.createElement('span');
      p.className = 'dx-pill dx-p' + (i + 1); p.setAttribute('aria-hidden', 'true'); p.textContent = t;
      end.insertBefore(p, end.firstChild);
    });
    old.parentNode.replaceChild(end, old);
  }
})();
