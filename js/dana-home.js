/* Home (index.html), Dana 20 Nov 2026. Styling: css/dana-home.css.
   - The hero's live meeting shows Alex, Priya and Arjun's photos (as on Meeting Notes and How it works), not initials.
   - A kicker over each section headline; "Questions, answered."
   - Charlotte's quote uses her set-back portrait (as on Case studies). */
(function () {
  'use strict';
  var PH = { 'Alex': 'assets/meeting/alex.jpg', 'Priya': 'assets/meeting/priya.jpg', 'Arjun': 'assets/meeting/arjun.jpg' };
  [].forEach.call(document.querySelectorAll('.v5-people span'), function (sp) {
    if (sp.querySelector('img')) return;
    var sm = sp.querySelector('small'), who = sm ? sm.textContent.split(',')[0].trim() : '';
    if (!PH[who]) return;
    [].forEach.call(sp.childNodes, function (n) { if (n.nodeType === 3) n.textContent = ''; });
    sp.insertAdjacentHTML('afterbegin', '<img src="' + PH[who] + '" alt="">');
    sp.classList.add('hm-ph');
  });
  var K = { 'prob-h': 'The problem', 'firm-h': 'One system', 'trust-h': 'Why firms trust it', 'price-h': 'Pricing', 'live-h': 'Getting live', 'next-h': 'Bunya Shape', 'faq-h': 'Questions' };
  Object.keys(K).forEach(function (id) {
    var h = document.getElementById(id); if (!h) return;
    var prev = h.previousElementSibling; if (prev && prev.classList.contains('sx-k')) return;
    h.insertAdjacentHTML('beforebegin', '<span class="sx-k hm-k">' + K[id] + '</span>');
  });
  var fq = document.getElementById('faq-h');
  if (fq && /Common questions/.test(fq.textContent)) fq.innerHTML = 'Questions, <span>answered.</span>';
  var ch = document.querySelector('main img[src*="falcon-charlotte"]');
  if (ch) { ch.src = 'assets/falcon-charlotte-face-cs.webp'; var fig = ch.closest('figure, blockquote, div'); if (fig) fig.classList.add('hm-ch'); }
})();
