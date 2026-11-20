/* Feature pages (Meeting Notes, Review Packs, Care, Fact find…): the Command Centre page's finish (Dana, 19 Nov 2026).
   Lee's markup is untouched; this adds:
   1. the opening film or screen in a device frame named after the feature, with an "illustrative" note under it
   2. numbered "Up close" tabs and the screens in the same frame
   3. a page flag (body.dx-feat) so css/dana-feature.css can give the closing section the bunya.ai review style.
   Note: the page's own tab script finds screens with '.hb-view img', so no <img> is added inside .hb-view. */
(function () {
  'use strict';
  if (!document.querySelector('.pp-hero')) return;
  document.body.classList.add('dx-feat');
  var nameEl = document.querySelector('.pp-hero .pp-name');
  var name = nameEl ? nameEl.textContent.trim() : 'Bunya';
  function bar(label) {
    return '<div class="dx-dev-bar" aria-hidden="true"><i></i><i></i><i></i><span><u></u><em data-bar>' + label + '</em></span></div>';
  }

  /* 1. Opening film or screen */
  var shot = document.querySelector('.pp-wrap > .pp-shot, main > .pp-wrap .pp-shot');
  if (shot && !shot.closest('.hb-d')) {
    shot.classList.add('dx-dev', 'dx-dev-feat');
    shot.insertAdjacentHTML('afterbegin', bar(name));
    var film = shot.querySelector('video');
    var note = document.createElement('p');
    note.className = 'dx-illus';
    note.innerHTML = '<u></u>' + (film ? 'Illustrative film · example data' : 'Illustrative screen · example data');
    shot.insertAdjacentElement('afterend', note);
  }

  /* 2. Up close: numbered tabs, framed screens, frame label follows the tab */
  [].forEach.call(document.querySelectorAll('.hb-tabs'), function (tabs) {
    var btns = tabs.querySelectorAll('[role=tab]');
    [].forEach.call(btns, function (b, i) {
      b.insertAdjacentHTML('afterbegin', '<span class="dx-n" aria-hidden="true">0' + (i + 1) + '</span>');
    });
    var sec = tabs.closest('.hb-d'), sc = sec && sec.querySelector('.hb-view .sc');
    if (!sc) return;
    var frame = document.createElement('div');
    frame.className = 'dx-dev dx-dev-close';
    sc.parentNode.insertBefore(frame, sc);
    frame.insertAdjacentHTML('afterbegin', bar(name + ' · ' + (btns[0] ? btns[0].textContent.replace(/^\d+/, '').trim() : '')));
    frame.appendChild(sc);
    var lab = frame.querySelector('[data-bar]');
    [].forEach.call(btns, function (b) {
      b.addEventListener('click', function () { lab.textContent = name + ' · ' + b.textContent.replace(/^\d+/, '').trim(); });
    });
  });

  /* 3. "Today, and with …" table: an icon tile on each row, picked from the row name */
  var IC = {
    rec: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    task: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12.2l2.4 2.4 4.6-4.8"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
    find: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14.8c1.7.8 2.8 2.5 3 5.2"/>',
    tag: '<path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8-9 9z"/><circle cx="8.5" cy="8.5" r="1.5"/>',
    shield: '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'
  };
  var RU = [[/record|recording|meeting|call|voice/i, 'rec'], [/find|search|later|look/i, 'find'], [/email|follow|letter|message|inbox|send/i, 'mail'],
    [/action|task|next|step|to-?do/i, 'task'], [/time|hour|day|week|when|wait|slow/i, 'clock'], [/client|people|team|who|staff/i, 'users'],
    [/price|cost|fee|pay|\$/i, 'tag'], [/complian|audit|evidence|consent|risk|secur/i, 'shield'], [/report|number|data|portfolio|revenue|figure/i, 'chart'],
    [/note|file|soa|document|pack|form|paper|statement/i, 'doc']];
  [].forEach.call(document.querySelectorAll('.hb-vs .r > b'), function (b, i) {
    var k = 'spark';
    for (var j = 0; j < RU.length; j++) { if (RU[j][0].test(b.textContent)) { k = RU[j][1]; break; } }
    b.insertAdjacentHTML('afterbegin', '<span class="dx-vs-i c' + (i % 5 + 1) + '" aria-hidden="true"><svg viewBox="0 0 24 24">' + IC[k] + '</svg></span>');
  });
  var hd = document.querySelector('.hb-vs .hd');
  if (hd && hd.children[2]) hd.children[2].insertAdjacentHTML('afterbegin', '<u class="dx-vs-logo" aria-hidden="true"></u>');

  /* 4. Headings on the three points under the opening screen (Dana, 19 Nov 2026) */
  var PT = {
    'advice-engine': ['Fact find, filled', 'Ready for advice', 'SOA, drafted'],
    'brand-website-marketing': ['Your brand', 'Your documents', 'Get found'],
    'broadcast-hq': ['One idea', 'Every channel', 'Approved first'],
    'bunya-portal': ['Ask Bunya', 'Quoted first', 'Add more'],
    'bunya-shape': ['Describe it', 'Try it', 'Approve it'],
    'bunya-vault': ['Linked', 'Hidden and logged', 'In your tenant'],
    'bunya-voice': ['Teams phones', 'Record on screen', 'Recorded and noted'],
    'care': ['Learn', 'Your portal', 'Keep improving'],
    'client-portal': ['One place', 'Read and sign', 'Always up to date'],
    'fact-find': ['Filled for you', 'Sourced', 'Checked'],
    'fee-consent': ['See what’s due', 'Renew or remind', 'On the record'],
    'field-notes': ['Anywhere', 'With consent', 'Filed'],
    'file-audit': ['Checked', 'Flagged', 'Fixed and approved'],
    'insurance-needs': ['Needs worked out', 'Quotes compared', 'Adviser decides'],
    'meeting-notes': ['Captured', 'Drafted', 'Checked'],
    'platform-comparisons': ['Side by side', 'From the portfolio', 'Ready for the SOA'],
    'portfolio': ['Pulled together', 'Sourced', 'Ready to use'],
    'revenue-import': ['Imported', 'Matched', 'Reported'],
    'review-packs': ['On time', 'Ready', 'Renewed'],
    'soa-generator': ['Your template', 'Linked figures', 'Approved'],
    'strategy-modelling': ['No retyping', 'Like for like', 'Adviser-led']
  };
  var pg = (location.pathname.split('/').pop() || '').replace('.html', '');
  if (PT[pg]) [].forEach.call(document.querySelectorAll('.pp-points > div'), function (d, i) {
    var n = d.querySelector('.n');
    if (!PT[pg][i] || !n) return;
    n.insertAdjacentHTML('afterend', '<b class="dx-pt-h">' + PT[pg][i] + '</b>');
    d.classList.add('dx-pt');
  });

  /* 5. "Today, and with …": rebuilt as two matching cards, Today (muted) beside With (deep teal), rows lined up.
        Lee's table stays in the page for no-script visitors; it's hidden once this is built. */
  var vs = document.querySelector('.hb-vs');
  if (vs) {
    var hdr = vs.querySelector('.hd'), rows = vs.querySelectorAll('.r');
    var withName = hdr && hdr.children[2] ? hdr.children[2].textContent.trim() : 'With ' + name;
    var cells = '<div class="dx-ba-c t h"><span class="dx-ba-x"></span><b>Today</b></div>' +
      '<div class="dx-ba-c w h"><span class="dx-ba-logo"></span><b>' + withName + '</b></div>';
    [].forEach.call(rows, function (r, i) {
      var b = r.querySelector('b'), o = r.querySelector('.old'), n = r.querySelector('.new');
      var k = 'spark'; for (var j = 0; j < RU.length; j++) { if (RU[j][0].test(b.textContent)) { k = RU[j][1]; break; } }
      var label = b.textContent.trim(), last = i === rows.length - 1 ? ' last' : '';
      cells += '<div class="dx-ba-c t' + last + '"><span class="dx-ba-k">' + label + '</span><p>' + (o ? o.textContent : '') + '</p></div>' +
        '<div class="dx-ba-c w' + last + '"><span class="dx-ba-k"><i class="dx-vs-i c' + (i % 5 + 1) + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + IC[k] + '</svg></i>' + label + '</span><p>' + (n ? n.textContent : '') + '</p></div>';
    });
    var ba = document.createElement('div');
    ba.className = 'dx-ba';
    ba.innerHTML = cells + '<span class="dx-ba-arrow" aria-hidden="true"></span>';
    vs.insertAdjacentElement('afterend', ba);
    vs.classList.add('dx-hide');
  }

  /* 6. "Goes well with": a proper panel, each pairing as a rich card you can add to your build from here */
  var pairs = document.querySelector('.pp-pairs');
  var L = window.bunyaList;
  /* some pages (Revenue Import) have a second, separate "Goes well with" list: fold its cards into the one panel
     so nothing is left on its own (Dana, 20 Nov 2026) */
  [].slice.call(document.querySelectorAll('.pp-pairs'), 1).forEach(function (more) {
    [].forEach.call(more.querySelectorAll('a'), function (a) { if (!pairs.querySelector('a[href="' + a.getAttribute('href') + '"]')) pairs.appendChild(a); });
    var ms = more.closest('.hb-d'); (ms || more).classList.add('dx-hide');
  });
  if (pairs) {
    var FP = {}; Object.keys(window.BUNYA_FEATURE_PAGES || {}).forEach(function (k) { FP[window.BUNYA_FEATURE_PAGES[k]] = k; });
    var APPP = { 'client-portal.html': 'portal', 'broadcast-hq.html': 'bhq', 'field-notes.html': 'field', 'bunya-voice.html': 'voice' };
    var PI = [[/portal/i, 'users'], [/broadcast|marketing|yours|brand/i, 'spark'], [/field|meeting|voice/i, 'rec'], [/fact find|portfolio|revenue|platform/i, 'chart'],
      [/insurance|audit/i, 'shield'], [/soa|strategy|advice/i, 'doc']];
    var links = pairs.querySelectorAll('a');
    var box = document.createElement('div');
    box.className = 'dx-pairs' + (links.length === 1 ? ' one' : links.length > 2 ? ' many' : '');
    var head = '<div class="dx-pairs-head"><span class="dx-pairs-k">Goes well with</span><h3>Add what fits <span>beside ' + name + '.</span></h3>' +
      '<p>Read about it, or add it to your Bunya from here. Your price updates as you go.</p></div>';
    /* one pairing: a little more about it, in the paired page's own words (its subtitle and three points) (Dana, 20 Nov 2026) */
    var MORE = {
      'meeting-notes.html': ['Bunya drafts the notes so your adviser can stay in the conversation.', ['Captured with the client’s consent.', 'File note, actions and follow-up email drafted after the call.', 'Your adviser checks it before anything is filed or sent.']],
      'client-portal.html': ['Documents, meetings, messages and signing, in one place for them.', ['Documents, meetings and messages in one place.', 'Clients read their advice and sign it.', 'They can see where their advice is up to.']],
      'broadcast-hq.html': ['Write it once and Bunya prepares a version for each channel.', ['Start with one idea.', 'Get a blog, LinkedIn, Facebook and newsletter version.', 'Each one is approved before it goes out.']],
      'field-notes.html': ['An onsite recorder for meetings away from the office.', ['Record meetings at the client’s home or business, right in Command Centre.', 'Captured with the client’s consent.', 'Stored in SharePoint and filed to the client like any other meeting.']],
      'advice-engine.html': ['Fact find, insurance needs, modelling and every SOA drafted in your template, on top of everything in Command Centre.', ['The fact find filled from the meeting, the documents and the client portal.', 'Insurance needs, strategy and modelling, ready for advice.', 'Every SOA drafted in your template. Your adviser approves it.']],
      'brand-website-marketing.html': ['Your brand, your documents, a website and marketing, built to match your Bunya.', ['A brand kit, guidelines or a full refresh.', 'Your Brand Document Pack for SOAs and client documents.', 'A website and monthly marketing that get you found.']]
    };
    var one = links.length === 1;
    var cards = [].map.call(links, function (a, i) {
      var href = a.getAttribute('href'), nm = a.querySelector('b'), line = a.querySelector('span'), price = a.querySelector('em');
      var txt = nm ? nm.textContent : '', k = 'spark';
      for (var j = 0; j < PI.length; j++) { if (PI[j][0].test(txt)) { k = PI[j][1]; break; } }
      var kind = FP[href] ? 'feat' : APPP[href] ? 'add' : href === 'advice-engine.html' ? 'ae' : '';
      var key = FP[href] || APPP[href] || '';
      return '<div class="dx-pair"><span class="dx-ico dx-c' + (i % 5 + 1) + '" aria-hidden="true"><svg viewBox="0 0 24 24">' + IC[k] + '</svg></span>' +
        '<div class="dx-pair-t"><a href="' + href + '"><b>' + (nm ? nm.innerHTML : '') + '</b></a><p>' + (line ? line.textContent : '') + '</p>' +
          (one && MORE[href] ? '<p class="dx-pair-more">' + MORE[href][0] + '</p><ul class="dx-pair-pts">' + MORE[href][1].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '') + '</div>' +
        '<span class="dx-pair-price">' + (price ? price.textContent : '') + '</span>' +
        '<div class="dx-pair-go">' + (kind && L ? '<button type="button" class="dx-pair-add" data-kind="' + kind + '" data-key="' + key + '"></button>' : '') +
        '<a class="dx-pair-see" href="' + href + '" aria-label="See ' + txt.replace(/"/g, '') + '">See it <i aria-hidden="true">→</i></a></div></div>';
    }).join('');
    box.innerHTML = head + '<div class="dx-pairs-list">' + cards + '</div>';
    pairs.insertAdjacentElement('afterend', box);
    pairs.classList.add('dx-hide');
    var sec2 = pairs.closest('.hb-d'); if (sec2) sec2.classList.add('dx-pairs-sec');
    function paintAdd() {
      [].forEach.call(box.querySelectorAll('.dx-pair-add'), function (b) {
        var on = L.has(b.dataset.kind, b.dataset.key);
        b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on));
        b.innerHTML = on ? '<i aria-hidden="true">✓</i> Added' : '<i aria-hidden="true">+</i> Add';
      });
    }
    if (L) {
      box.addEventListener('click', function (e) { var b = e.target.closest('.dx-pair-add'); if (b) L.toggle(b.dataset.kind, b.dataset.key); });
      document.addEventListener('bunya:build', paintAdd);
      paintAdd();
    }
  }

  /* 7. Real section headlines (Dana's review, 19 Nov 2026): Lee's small label stays as the kicker inside the same h2,
        with a two-tone headline under it, as on Command Centre */
  var HEADS = {
    how: name + ', <span>step by step.</span>',
    close: 'The screens <span>your team uses.</span>',
    compare: 'Before and after. <span>Side by side.</span>',
    included: 'Everything <span>that comes with it.</span>',
    faq: 'Questions, <span>answered.</span>'
  };
  var PAGE_HEADS = {
    /* Dana (20 Nov 2026): these two still had the placeholder headlines */
    'bunya-portal': { how: 'Ask, request, follow, <span>add more.</span>', close: 'Your portal, <span>screen by screen.</span>', compare: 'Less chasing. <span>More knowing.</span>', included: 'Everything <span>in your portal.</span>', faq: 'Questions, <span>answered.</span>' },
    'fee-consent': { how: 'Due, renewed, <span>on the record.</span>', compare: 'No more <span>chasing signatures.</span>', included: 'Everything <span>for every renewal.</span>', faq: 'Questions, <span>answered.</span>' },
    'meeting-notes': { how: 'From the meeting <span>to the client’s file.</span>', close: 'Checked in minutes. <span>Not hours.</span>', compare: 'Less typing. <span>More advice.</span>', faq: 'Questions, <span>answered.</span>' },
    'review-packs': { how: 'From the due date <span>to the review meeting.</span>', example: 'Your review pack. <span>In your brand.</span>',
      fees: 'Every consent, <span>renewed with its review.</span>', close: 'Your whole year, <span>ready ahead.</span>',
      compare: 'No more <span>night-before packs.</span>', faq: 'Questions, <span>answered.</span>' },
    'care': { how: 'Looked after, <span>every month.</span>', levels: 'Choose how much <span>we build with you.</span>',
      portal: 'Your Bunya Portal. <span>Everything in one place.</span>', compare: 'Support that <span>keeps you moving.</span>', faq: 'Questions, <span>answered.</span>' },
    'bunya-shape': { how: 'Ask for it. <span>Approve it. Use it.</span>', foundation: 'Built on your record. <span>Not beside it.</span>',
      compare: 'Less waiting. <span>More building.</span>', included: 'Everything <span>you can shape.</span>', faq: 'Questions, <span>answered.</span>' },
    'fact-find': { how: 'Gathered once. <span>Checked by your adviser.</span>', compare: 'Ask once. <span>Not twice.</span>',
      included: 'Everything <span>in the fact find.</span>', faq: 'Questions, <span>answered.</span>' },
    'portfolio': { how: 'Every balance. <span>One view.</span>', compare: 'No more <span>re-keying holdings.</span>',
      included: 'Everything <span>in the portfolio.</span>', faq: 'Questions, <span>answered.</span>' },
    'insurance-needs': { how: 'Need worked out. <span>Quotes side by side.</span>', compare: 'No more <span>calculators and retyping.</span>',
      included: 'Everything <span>in the needs analysis.</span>', faq: 'Questions, <span>answered.</span>' },
    'strategy-modelling': { how: 'The numbers lined up. <span>The strategy stays yours.</span>', compare: 'From spreadsheets <span>to side by side.</span>',
      included: 'Every scenario, <span>ready for paraplanning.</span>', faq: 'Questions, <span>answered.</span>' },
    'platform-comparisons': { how: 'From their portfolio <span>to the SOA.</span>', compare: 'No more <span>spreadsheet per client.</span>',
      included: 'Everything <span>in the comparison.</span>', faq: 'Questions, <span>answered.</span>' },
    'soa-generator': { how: 'From the strategy <span>to a signed SOA.</span>', example: 'Your SOA. <span>In your brand.</span>', compare: 'No more <span>blank-page SOAs.</span>',
      included: 'Everything <span>in the draft.</span>', faq: 'Questions, <span>answered.</span>' },
    'file-audit': { how: 'Checked, flagged, <span>then fixed by your team.</span>', compare: 'Found by your team. <span>Not after the fact.</span>',
      included: 'Everything <span>in the audit.</span>', faq: 'Questions, <span>answered.</span>' },
    'client-portal': { how: 'Shared by your team. <span>Signed by your clients.</span>', close: 'What your clients <span>see and use.</span>',
      compare: 'No more <span>print, sign and scan.</span>', included: 'Everything <span>in their portal.</span>', faq: 'Questions, <span>answered.</span>' },
    'broadcast-hq': { how: 'One idea in. <span>Four versions out.</span>', close: 'From one idea <span>to a week of posts.</span>',
      compare: 'No more <span>blank pages.</span>', included: 'Every channel, <span>one login.</span>', faq: 'Questions, <span>answered.</span>' },
    'field-notes': { how: 'Recorded at their table. <span>Filed like the office.</span>', close: 'From the visit <span>to the client’s file.</span>',
      compare: 'No more <span>notes in the car.</span>', included: 'Everything <span>from the visit.</span>', faq: 'Questions, <span>answered.</span>' },
    'bunya-vault': { how: 'Add it once. <span>Reveal it when you need it.</span>', close: 'Every shared login, <span>in one place.</span>',
      compare: 'No more <span>passwords in a spreadsheet.</span>', included: 'Everything <span>in the vault.</span>', faq: 'Questions, <span>answered.</span>' },
    'brand-website-marketing': { example: 'One firm. <span>One look. Every document.</span>', menu: 'Pick what fits. <span>Pay once, or monthly.</span>',
      compare: 'One look, <span>everywhere clients see you.</span>', included: 'Everything <span>you can add.</span>', faq: 'Questions, <span>answered.</span>' },
    'advice-engine': { features: 'Pick the features. <span>Pay only for those.</span>', how: 'From fact find <span>to signed advice.</span>',
      close: 'Every step, <span>ready to check.</span>', compare: 'From a blank page <span>to a drafted SOA.</span>', included: 'Everything <span>in the Advice Engine.</span>', faq: 'Questions, <span>answered.</span>' }
  };
  var own = PAGE_HEADS[pg] || {};
  [].forEach.call(document.querySelectorAll('.hb-d > h2.hb-dl'), function (h) {
    var id = h.parentElement.id, t = own[id] || HEADS[id];
    if (id === 'pairs' || h.parentElement.classList.contains('dx-pairs-sec')) return;
    var k = h.textContent.trim();
    h.classList.add('dx-h2');
    h.innerHTML = t ? '<span class="dx-h2-k">' + k + '</span><span class="dx-h2-t">' + t + '</span>' : '<span class="dx-h2-t">' + k + '</span>';
  });

  /* 8. "What's included" folds into How it works (it was a small section on its own) */
  var inc = document.getElementById('included'), how = document.getElementById('how');
  var incl = inc && inc.querySelector('.pp-incl');
  if (inc && how && incl) {
    var wrapI = document.createElement('div');
    wrapI.className = 'dx-incl';
    wrapI.innerHTML = '<span class="dx-incl-k">Included</span>';
    wrapI.appendChild(incl);
    var after = how.querySelector('.hb-works-line') || how.querySelector('.hb-how');
    after.insertAdjacentElement('afterend', wrapI);
    inc.classList.add('dx-hide');
  }

  /* 9. Page touches from the design review (19 Nov 2026) */
  var PAGE = {
    'review-packs': {
      hidePoints: true,   // they repeated How it works and the fee steps
      /* each callout adds something the caption under the screen doesn't already say */
      tips: [['chart', 'Filter by adviser', 'See Alex’s or Jess’s year at a glance.'], ['mail', 'Three times to choose', 'Tue 15, Wed 16 or Fri 18 December, from Alex’s calendar.'],
        ['find', '4 changes · 2 questions', 'The questions to ask are ready for the meeting.'], ['pen', 'Super up to $668k', 'And last year’s advice: 3 of 3 done.']],
      chips: ['Updated from client dates', 'Drafted by Bunya · client services checks', 'Gathered by Bunya · for Alex to check', 'Ready for Wednesday · Alex approves']
    },
    'bunya-shape': { hidePoints: true, pillars: 'foundation' },
    'advice-engine': { hidePoints: true },
    'fact-find': { hidePoints: true, heroLines: true },
    'portfolio': { hidePoints: true },
    'insurance-needs': { hidePoints: true },
    'strategy-modelling': { hidePoints: true },
    'platform-comparisons': { hidePoints: true },
    'soa-generator': { hidePoints: true },
    /* design pass (Dana, 20 Nov 2026): the three points repeated How it works */
    'client-portal': { hidePoints: true },
    'broadcast-hq': { hidePoints: true },
    /* design pass (Dana, 20 Nov 2026): Questions had two answers, so it gets the rest of what the page already says */
    /* design pass (Dana, 20 Nov 2026): Lee's generated page prints "+undefined" for the price (it's +50c in hb.js), and
       What's included repeated the three points straight above it */
    'revenue-import': { price: '+50c', hideIncluded: true },
    'bunya-voice': { hideIncluded: true },
    'bunya-vault': { hidePoints: true },
    /* design pass (Dana, 20 Nov 2026): Included repeated the three points and the price menu */
    'brand-website-marketing': { hideIncluded: true },   /* What's included repeated the three points straight above it */
    'field-notes': { hidePoints: true, faqMore: [
      ['Where are the recording and the note kept?', 'In your firm’s SharePoint, on the client’s record, with the transcript and the approved note. It’s filed like any other meeting.'],
      ['Can the adviser change the note?', 'Yes. The file note is drafted for the adviser to check, and it’s only filed once they approve it.'],
      ['What does it cost?', 'Field Notes is $19 a month.'] ] },
    /* design audit (Dana, 20 Nov 2026): the subtitle repeated the headline, and the three steps showed three times */
    'file-audit': { hidePoints: true, heroSub: 'Checked against your licensee’s standards. Anything missing is flagged and fixed before the client sees it.', heroLines: true,
      incl: ['24 checks for your licensee', 'Every figure matched to the fact find', 'Missing dates and signatures flagged', 'Fixed on the page by your team', 'Audit report kept with the file'] },
    'care': {
      hidePoints: true, tiers: 'levels', tipSec: 'portal',
      tips: [['chart', '2 on track, 1 planned', 'Release 2 in build, Review Packs in testing.'], ['find', 'Answers show their sources', 'Meeting summaries, the roadmap and your requests.'],
        ['chart', 'Your plan, at a glance', 'What’s already in your Command Centre, and what’s an add-on.'], ['pen', '2 open, 1 waiting on you', 'Every quote, file and answer in one place.']],
      chips: ['Next progress meeting · Thu 19 Nov', 'Written by AI from your records', 'Community ideas · open for input', 'Release 1 shipped 28 Oct']
    }
  };
  var cfg = PAGE[pg];
  if (cfg) {
    if (cfg.hidePoints) { var pp = document.querySelector('.pp-points'); if (pp) pp.classList.add('dx-hide'); }
    if (cfg.price) { var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), tn; while ((tn = tw.nextNode())) if (tn.nodeValue.indexOf('+undefined') > -1) tn.nodeValue = tn.nodeValue.replace(/\+undefined/g, cfg.price); }
    if (cfg.hideIncluded) { [].forEach.call(document.querySelectorAll('#included, .dx-incl'), function (e) { e.classList.add('dx-hide'); }); }
    if (cfg.faqMore) { var fq = document.querySelector('#faq .hb-faq'); if (fq) cfg.faqMore.forEach(function (x) { var d = document.createElement('details'); d.innerHTML = '<summary>' + x[0] + '<i></i></summary><p>' + x[1] + '</p>'; fq.appendChild(d); }); }
    if (cfg.heroSub) { var hs = document.querySelector('.pp-hero > p'); if (hs) hs.textContent = cfg.heroSub; }
    if (cfg.incl) { var ig = document.querySelector('#included .pp-incl, .dx-incl .pp-incl'); if (ig) ig.innerHTML = cfg.incl.map(function (x) { return '<span>' + x + '</span>'; }).join(''); }
    /* a section's own small h3 repeats the new headline, so it goes */
    [].forEach.call(document.querySelectorAll('.hb-d > .pp-show-h'), function (h) { h.classList.add('dx-hide'); });
    var frame = document.querySelector('#' + (cfg.tipSec || 'close') + ' .dx-dev-close');
    if (frame && cfg.tips) {
      var TI = { chart: IC.chart, mail: IC.mail, find: IC.find, pen: '<path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>' };
      var tip = document.createElement('div'); tip.className = 'dx-tip'; tip.setAttribute('aria-hidden', 'true'); frame.appendChild(tip);
      var chip = document.createElement('div'); chip.className = 'dx-chip'; chip.setAttribute('aria-hidden', 'true'); chip.innerHTML = '<i></i><span></span>'; frame.appendChild(chip);
      var setT = function (i) {
        var t = cfg.tips[i] || cfg.tips[0];
        tip.classList.remove('in'); void tip.offsetWidth;
        tip.innerHTML = '<span class="dx-tip-i"><svg viewBox="0 0 24 24">' + TI[t[0]] + '</svg></span><span><b>' + t[1] + '</b><small>' + t[2] + '</small></span>';
        tip.classList.add('in');
        chip.lastChild.textContent = cfg.chips[i] || '';
      };
      setT(0);
      [].forEach.call(document.querySelectorAll('#' + (cfg.tipSec || 'close') + ' [data-shot]'), function (b) { b.addEventListener('click', function () { setT(+b.dataset.shot); }); });
      frame.closest('.hb-view').classList.add('dx-has-tip');
    }
  }
  /* a second set of steps on the page (e.g. Review Packs' fee consent) gets its own look: a timeline on a deep teal panel */
  [].forEach.call(document.querySelectorAll('.hb-d:not(#how) > .hb-how'), function (ol) { ol.closest('.hb-d').classList.add('dx-tl-sec'); ol.classList.add('dx-tl'); ol.style.setProperty('--n', ol.children.length); });

  /* 10. Plan levels as cards (e.g. Care's "Three levels of support"): name, price, reply time, then the detail */
  if (cfg && cfg.tiers) {
    var tsec = document.getElementById(cfg.tiers), tol = tsec && tsec.querySelector('.hb-how');
    if (tol) {
      var cards = [].map.call(tol.children, function (li, i) {
        var t = (li.querySelector('b') || {}).textContent || '', parts = t.split(' · '), body = (li.querySelector('p') || {}).textContent || '';
        var rep = body.match(/reply within (\d+) business hours/i);
        var price = parts[1] || '', inc = /included/i.test(price);
        var pm = price.match(/(\$[\d,]+)\s*(a month)?/);
        return '<div class="dx-tier t' + i + (i === 1 ? ' pop' : '') + '"><span class="dx-tier-n">0' + (i + 1) + '</span>' +
          (i === 2 ? '<span class="dx-tier-flag">Most firms start here</span>' : '') +
          '<b>' + parts[0] + '</b><div class="dx-tier-p">' + (inc ? '<em>Included</em><small>when you subscribe</small>' : pm ? '<em>' + pm[1] + '</em><small>a month</small>' : '<em>' + price + '</em>') + '</div>' +
          (rep ? '<span class="dx-tier-r"><i></i>Reply within ' + rep[1] + ' business hours</span>' : '<span class="dx-tier-r"><i></i>Our team alongside yours</span>') +
          '<p>' + body.split(/(?<=\.)\s+/).filter(function (x) { return !/reply within/i.test(x) && !(inc && /^Included when you subscribe\.?$/i.test(x)); }).join(' ') + '</p></div>';
      }).join('');
      var tw = document.createElement('div'); tw.className = 'dx-tiers'; tw.innerHTML = cards;
      tol.insertAdjacentElement('afterend', tw); tol.classList.add('dx-hide');
      tsec.classList.remove('dx-tl-sec');
    }
  }

  /* sections that list qualities, not steps (e.g. Shape's foundation): no step numbers or connecting line */
  if (cfg && cfg.pillars) { var pl = document.querySelector('#' + cfg.pillars + ' .hb-how'); if (pl) pl.classList.add('dx-pillars'); }

  /* steps fill the row whether there are 3 or 4 of them */
  [].forEach.call(document.querySelectorAll('.hb-how'), function (ol) { ol.style.setProperty('--n', ol.children.length); });
  /* hero intro: one sentence per line on wide screens */
  var hp = document.querySelector('.pp-hero > p:not(.pp-ms)');
  if (hp && cfg && cfg.heroLines) { var parts = hp.textContent.trim().split(/(?<=\.)\s+/); if (parts.length > 1) { hp.innerHTML = parts.map(function (x) { return '<span class="dx-line">' + x + '</span>'; }).join(' '); hp.classList.add('dx-lines'); } }

  /* "Included" cards: even rows (5 across, or 6 as two rows of 3) */
  [].forEach.call(document.querySelectorAll('.pp-incl'), function (g) { var n = g.children.length; g.style.setProperty('--c', n <= 5 ? n : Math.ceil(n / 2)); });

  /* closing headline: long feature names a size down so the name stays on one line */
  var eh = document.querySelector('.sx-end h2');
  if (eh && eh.firstChild && eh.firstChild.textContent.trim().length > 20) eh.classList.add('dx-long');
})();
