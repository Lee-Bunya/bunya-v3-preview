/* FAQ (faq.html), Dana 20 Nov 2026 (design pass). Styling: css/dana-fq.css.
   Each topic gets a coloured icon tile and its question count, and stays in view beside its answers. */
(function () {
  'use strict';
  var I = {
    'h-cc': '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M3.5 9h17M8 13.5h4M8 16.5h7"/>',
    'h-price': '<path d="M3.5 12.6V4.5a1 1 0 0 1 1-1h8.1a1 1 0 0 1 .7.3l7.4 7.4a1 1 0 0 1 0 1.4l-8.1 8.1a1 1 0 0 1-1.4 0l-7.4-7.4a1 1 0 0 1-.3-.7z"/><circle cx="8.3" cy="8.3" r="1.6"/>',
    'h-ai': '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
    'h-data': '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/><path d="M9 12l2 2 4-4"/>',
    'h-start': '<path d="M14 4c3 0 6 3 6 6l-7 7-6-6z"/><path d="M7 11l-3 1 2 2M13 17l-1 3-2-2"/><circle cx="15" cy="9" r="1.6"/>'
  };
  [].forEach.call(document.querySelectorAll('.fq-side'), function (side, k) {
    var h = side.querySelector('h2'); if (!h || side.querySelector('.fq-ic')) return;
    var n = side.parentElement.querySelectorAll('details').length;
    side.insertAdjacentHTML('afterbegin', '<span class="fq-ic fq-c' + (k % 4) + '" aria-hidden="true"><svg viewBox="0 0 24 24">' + (I[h.id] || I['h-cc']) + '</svg></span>' +
      '<span class="fq-count">' + n + ' questions</span>');
    side.classList.add('fq-on');
    /* Bunya's rotating rings in the corner of each topic card (Dana, 20 Nov 2026) */
    side.insertAdjacentHTML('afterbegin', '<svg class="fq-rings" viewBox="0 0 800 800" aria-hidden="true"><g class="a"><circle cx="400" cy="400" r="380"/><circle class="n" cx="20" cy="400" r="9"/></g><g class="b"><circle class="d" cx="400" cy="400" r="300"/><circle class="n t" cx="400" cy="100" r="8"/></g><g class="c"><circle class="g" cx="400" cy="400" r="220"/><circle class="n y" cx="180" cy="400" r="8"/></g></svg>');
  });
})();
