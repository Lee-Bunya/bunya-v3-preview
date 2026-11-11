/* Home: "Build your Command Centre" concept (7 Nov 2026).
   PRODUCTS is the one source for the card row and the product sheets; the build page's
   "Learn more" panels can reuse the same list later. Field Notes and Revenue Import are full products
   (Lee: ready by launch); set soon:true on any product to show "Coming soon" if one slips.
   Prices are the 6 Nov draft prices from the pricing chat. Screens are concept screens only. */
(function(){
  'use strict';
  var IMG = 'assets/concept/';
  var PRODUCTS = [
    { key: 'cc', k: 'The base', name: 'Command Centre', head: 'Every client. One place.', one: 'The client record, the advice work and every next step, together.',
      img: 'assets/cc/today.webp', g1: 'rgba(45,212,191,.55)', g2: 'rgba(56,189,248,.25)', kc: '#5EEAD4',
      points: ['Every household’s record, documents and meetings in one view.', 'See what’s waiting for approval and who owns the next step.', 'Runs inside your firm’s own Microsoft 365.'],
      incl: ['Client record', 'Advice pipeline', 'Practice reports', 'Care: support and updates'],
      price: 'From $3', per: 'per household a month', build: 'build.html' },
    { key: 'notes', k: 'Included', name: 'Meeting Notes', head: 'Every meeting, written up.', one: 'Bunya drafts the notes so your adviser can stay in the conversation.',
      img: 'assets/meeting-notes/ready.webp', g1: 'rgba(167,139,250,.6)', g2: 'rgba(99,102,241,.3)', kc: '#C4B5FD',
      points: ['Captured with the client’s consent.', 'File note, actions and follow-up email drafted after the call.', 'Your adviser checks it before anything is filed or sent.'],
      incl: ['File note', 'Action list', 'Follow-up email', 'Filed to the client'],
      price: 'Included', per: 'with Command Centre', build: 'build.html' },
    { key: 'reviews', k: 'Included', name: 'Review Packs', head: 'Every review, ready.', one: 'What’s changed since last time, gathered before the client walks in, and every fee consent renewed on time.',
      img: 'assets/reviews/ready.webp', g1: 'rgba(251,191,36,.55)', g2: 'rgba(249,115,22,.25)', kc: '#FCD34D',
      points: ['Reviews start from real dates, not from someone noticing.', 'What’s changed and the review pack, ready before the meeting.', 'Fee consents renewed with the review they belong to.'],
      incl: ['What’s changed', 'Review pack', 'Meeting booked', 'Timeline', 'Fee consent renewals', 'Consent reminders'],
      /* 11 Nov 2026 (Lee: "redo the 97c … like Daniel had done"): part of Command Centre, 97c a client review; included with the Advice Engine. */
      price: '97c', per: 'a client review, or included with the Advice Engine', build: 'build.html' },
    { key: 'fee', k: 'Included', name: 'Fee consent', head: 'Renewals, on time.', one: 'Know when every consent is due, and act while the window is open.',
      img: 'reviews.webp', op: '100% 30%', g1: 'rgba(52,211,153,.55)', g2: 'rgba(16,185,129,.25)', kc: '#6EE7B7',
      points: ['See when each consent is due.', 'Prepare the renewal or send a reminder.', 'Every consent kept on the client’s record.'],
      incl: ['Due dates', 'Renewal ready', 'Reminders', 'On the record'],
      price: 'Included', per: 'with Command Centre', build: 'build.html' },
    { key: 'care', k: 'Included', name: 'Care', head: 'Help when your team needs it.', one: 'Help when your team needs it, a Command Centre that keeps improving, and your own Bunya Portal to follow it all.',
      care: true, g1: 'rgba(45,212,191,.55)', g2: 'rgba(56,189,248,.25)', kc: '#5EEAD4',
      points: ['Video tutorials for each role, and a team to ask.', 'Your own Bunya Portal: ask questions, request changes and follow every project.', 'A regular session to choose the next improvement.'],
      incl: ['Help with daily use', 'Connections kept healthy', 'Updates', 'Improvement sessions', 'Bunya Portal', 'Ask Bunya'],
      price: 'Included', per: 'with Command Centre', build: 'build.html' },
    { key: 'bp', k: 'Included', name: 'Bunya Portal', head: 'Your Command Centre, your way.', one: 'Ask about your work, request changes, add apps and follow every project, in one place.',
      img: 'assets/bunya-portal/home.webp', g1: 'rgba(129,140,248,.55)', g2: 'rgba(45,212,191,.25)', kc: '#A5B4FC',
      points: ['Ask Bunya answers from your firm’s records.', 'Changes are scoped and quoted before any build starts.', 'Add apps and agents from Discover.'],
      incl: ['Ask Bunya', 'Requests and support', 'Discover', 'Roadmap and library'],
      price: 'Included', per: 'with Command Centre', build: 'build.html' },
    /* 10 Nov (Lee: "add it"): Bunya Shape, from Daniel's configurator (4 Nov catchup). Included with every Bunya, part of Care.
       NOTE: the 8 Nov portal note says firms editing their own system wasn't in the portal yet (Lee, 29 Oct); Lee asked
       for Shape on the site on 10 Nov. Film: Daniel's bunya-shape.mp4. */
    { key: 'shape', k: 'Included', name: 'Bunya Shape', head: 'Change it yourself.', one: 'Ask in plain English to change your forms, reports and screens. Nothing goes live until you approve it.',
      img: 'assets/films/posters/bunya-shape.webp', g1: 'rgba(240,171,252,.5)', g2: 'rgba(45,212,191,.25)', kc: '#F0ABFC',
      points: ['Ask for the change in plain English.', 'See it on your screen before it goes live.', 'Approve it, and your team has it.'],
      incl: ['Forms', 'Reports', 'Screens', 'Community library'],
      price: 'Included', per: 'with Command Centre', build: 'build.html' },
    /* 9 Nov: Daniel's pricing. The Advice Engine is the second model ($5 a household), not an add-on; key stays 'soa'. */
    { key: 'soa', k: 'Upgrade', name: 'Advice Engine', head: 'Every SOA, drafted.', one: 'Fact find, insurance needs, modelling and every SOA drafted in your template, on top of everything in Command Centre.',
      img: 'assets/soa/ready.webp', g1: 'rgba(96,165,250,.6)', g2: 'rgba(59,130,246,.25)', kc: '#93C5FD',
      points: ['The fact find filled from the meeting, the documents and the client portal.', 'Insurance needs, strategy and modelling, ready for advice.', 'Every SOA drafted in your template. Your adviser approves it.'],
      incl: ['Fact find', 'Insurance needs and quotes', 'Strategy and modelling', 'SOA generator', 'File Audit', 'Client Portal', 'Brand Document Pack'],
      price: '$5', per: 'per household a month, with everything in Command Centre', build: 'build.html?soa=all' },
    { key: 'portal', k: 'App', name: 'Client Portal', head: 'Your clients’ own space.', one: 'Documents, meetings, messages and signing, in one place for them.',
      img: 'assets/portal/home.webp', g1: 'rgba(244,114,182,.55)', g2: 'rgba(236,72,153,.25)', kc: '#F9A8D4',
      points: ['Documents, meetings and messages in one place.', 'Clients read their advice and sign it.', 'They can see where their advice is up to.'],
      incl: ['Documents', 'Meetings', 'Messages', 'Read and sign'],
      price: '$790', per: 'a month, or included with the Advice Engine', build: 'build.html?add=portal' },
    { key: 'bhq', k: 'App', name: 'Broadcast HQ', head: 'One idea. Every channel.', one: 'Write it once and Bunya prepares a version for each channel.',
      img: 'assets/broadcast/ready.webp', g1: 'rgba(251,146,60,.6)', g2: 'rgba(234,88,12,.25)', kc: '#FDBA74',
      points: ['Start with one idea.', 'Get a blog, LinkedIn, Facebook and newsletter version.', 'Each one is approved before it goes out.'],
      incl: ['Blog', 'LinkedIn', 'Facebook', 'Newsletter', 'Privacy check'],
      price: '$390', per: 'a month', build: 'build.html?add=bhq' },
    { key: 'field', k: 'App', name: 'Field Notes', head: 'Meetings anywhere, noted.', one: 'An onsite recorder for meetings away from the office.',
      rec: true, hero: 'assets/field/ready.webp', g1: 'rgba(248,113,113,.6)', g2: 'rgba(239,68,68,.25)', kc: '#FCA5A5',
      points: ['Record meetings at the client’s home or business, right in Command Centre.', 'Captured with the client’s consent.', 'Stored in SharePoint and filed to the client like any other meeting.'],
      incl: ['Onsite recording', 'Consent captured', 'File note drafted', 'Filed to the client'],
      price: '$19', per: 'a month', build: 'build.html?add=field' },
    { key: 'rev', k: 'App', name: 'Revenue Import', head: 'Revenue, matched.', one: 'Your Xplan revenue export, matched to each client.',
      img: 'reports.webp', op: '0 100%', g1: 'rgba(163,230,53,.5)', g2: 'rgba(132,204,22,.22)', kc: '#BEF264',
      points: ['Bring in your Xplan revenue export.', 'Each line matched to the client by Xplan ID.', 'See revenue alongside your practice reports.'],
      incl: ['Xplan export', 'Matched by ID', 'Practice reports'],
      price: '$119', per: 'a month', build: 'build.html?add=rev' },
    { key: 'voice', k: 'App', name: 'Bunya Voice', head: 'Every call, on the client’s file.', one: 'Your phones on Microsoft Teams. Every call matched to the client, recorded with consent and noted on their file.',
      img: 'assets/voice/voice.webp', g1: 'rgba(103,232,249,.55)', g2: 'rgba(14,165,233,.25)', kc: '#67E8F9',
      points: ['Your firm’s phones, on Microsoft Teams.', 'The client’s record on screen as the phone rings.', 'Calls recorded with consent and noted on the client’s file.'],
      incl: ['Phones on Teams', 'Caller matched to the client', 'Call notes on the file'],
      price: '$370', per: 'a month', build: 'build.html?add=voice' },
    { key: 'vault', k: 'App', name: 'Bunya Vault', head: 'Team credentials, together.', one: 'The logins, API keys and service credentials your team shares, in one secure place.',
      img: 'assets/vault/list.webp', g1: 'rgba(250,204,21,.5)', g2: 'rgba(45,212,191,.22)', kc: '#FDE68A',
      points: ['Each credential linked to the client or supplier it belongs to.', 'Hidden until someone reveals it, and every view is logged.', 'Kept in Azure Key Vault in your own tenant.'],
      incl: ['Grouped by client and supplier', 'Expiry at a glance', 'Every view logged', 'Kept in your own Azure'],
      price: 'Talk to us', per: 'priced for your firm', build: 'booking.html' },
    { key: 'svc', k: 'Service', name: 'Make it yours', head: 'Look as good as your advice.', one: 'Your brand, your documents, a website and marketing, built to match your Bunya.',
      type: true, g1: 'rgba(129,140,248,.6)', g2: 'rgba(244,114,182,.3)', kc: '#A5B4FC',
      points: ['A brand kit, guidelines or a full refresh.', 'Your Brand Document Pack for SOAs and client documents.', 'A website and monthly marketing that get you found.'],
      incl: ['Brand', 'Your Brand Document Pack', 'Website', 'Marketing'],
      price: 'From $1,800', per: 'once, with a free AI brand kit', build: 'build.html' }
  ];
  /* What "Add to your build" does for each product. The build is kept in the browser in the same
     format as the build page's address (n, pay, soa, add, web …), so both pages share one build. */
  var ADD = {
    cc: { base: true }, notes: { incl: true }, reviews: { incl: true }, fee: { incl: true }, care: { incl: true }, bp: { incl: true }, shape: { incl: true },
    soa: { param: 'soa', val: 'all', label: 'All SOAs included', note: 'Change to packs or none in your build' },
    portal: { add: 'portal' }, bhq: { add: 'bhq' }, field: { add: 'field' }, rev: { add: 'rev' }, voice: { add: 'voice' }, vault: { talk: true },
    svc: { param: 'web', val: 'w5', label: 'Website, up to 5 pages', note: 'Choose brand, website and marketing in your build' }
  };
  var MONTHLY = { portal: 790, bhq: 390, field: 19, rev: 119 }, MKT = { upkeep: 290, found: 1500, cited: 3500 };
  var ONCE = { w5: 6900, w12: 14500, w25: 24500, kit: 1800, guide: 4500, refresh: 7500 };
  var NAMES = { portal: 'Client Portal', bhq: 'Broadcast HQ', field: 'Field Notes', rev: 'Revenue Import',
    w5: 'Website, 5 pages', w12: 'Website, 12 pages', w25: 'Website, 25 pages', kit: 'Brand kit', guide: 'Brand guidelines', refresh: 'Brand refresh',
    upkeep: 'Website upkeep', found: 'Be found', cited: 'Be cited' };
  var KEY = 'bunya.build', MEM = null;
  function load(){ try { return new URLSearchParams(localStorage.getItem(KEY) || ''); } catch (e) { return new URLSearchParams(MEM || ''); } }
  function save(q){ var t = q.toString(); MEM = t; try { t ? localStorage.setItem(KEY, t) : localStorage.removeItem(KEY); } catch (e) {} document.dispatchEvent(new CustomEvent('bunya:build')); }
  function adds(q){ return (q.get('add') || '').split(',').filter(Boolean); }
  function inBuild(p, q){
    var a = ADD[p.key]; q = q || load();
    if (a.pilot) return false;
    if (a.base || a.incl) return !!q.toString();
    if (a.add) return adds(q).indexOf(a.add) > -1;
    if (a.param === 'soa') return q.get('soa') === 'all' || q.get('soa') === 'packs';
    return !!q.get(a.param);
  }
  function addTo(p){
    var a = ADD[p.key], q = load();
    if (!q.toString()) q.set('cc', '1');
    if (a.add) { var l = adds(q); if (l.indexOf(a.add) < 0) l.push(a.add); q.set('add', l.join(',')); }
    if (a.param && !q.get(a.param) || (a.param === 'soa' && q.get('soa') === 'none')) q.set(a.param, a.val);
    save(q);
  }
  function removeFrom(key){
    var q = load();
    if (key === 'cc') { save(new URLSearchParams()); return; }
    if (MONTHLY[key] != null) { var l = adds(q).filter(function(x){ return x !== key; }); l.length ? q.set('add', l.join(',')) : q.delete('add'); }
    else if (key === 'soa') q.set('soa', 'none');
    else q.delete(key);
    save(q);
  }

  /* Real prices once we know the firm size (same draft maths as the build page) */
  function banded(n, r){ return r * (Math.min(n, 1000) + Math.max(0, n - 1000) * .84); }
  function totals(q){
    var n = +q.get('n') || 0; if (!n) return null;
    var soa = q.get('soa'), own = q.get('pay') === 'own', yr = q.get('bill') === 'year';
    var mo = adds(q).reduce(function(t, k){ return t + (MONTHLY[k] || 0); }, 0) + (MKT[q.get('mkt')] || 0);
    var once = (ONCE[q.get('brand')] || 0) + (ONCE[q.get('web')] || 0) + (q.get('docs') === '1' ? 8000 : 0) + (soa === 'packs' ? (+q.get('packs') || 2) * 1530 : 0);
    if (own) {
      var b3 = banded(n, 3);
      return { n: n, own: true, once: Math.max(120000, b3 * 36) + once, monthly: Math.max(1497, b3 * .3) + (soa === 'all' ? banded(n, 2) : 0) + mo };
    }
    var fee = Math.max(500, banded(n, (3 + (soa === 'all' ? 2 : 0)) * (yr ? .9 : 1)));
    return { n: n, own: false, yr: yr, monthly: fee + mo, once: 7249 + once };
  }
  /* Amazon-style: what goes well with what, and ready-made builds */
  var PAIRS = { cc: ['soa', 'portal'], notes: ['field'], reviews: ['portal'], fee: ['portal'], soa: ['portal'], portal: ['soa', 'bhq'], bhq: ['svc'], field: ['soa'], rev: ['portal'], voice: ['notes'], vault: ['bhq'], svc: ['bhq'] };
  var READY = [
    { key: 'ess', name: 'Essentials', line: 'Command Centre with Meeting Notes, Review Packs, fee consent and Care.', q: 'cc=1&soa=none' },
    { key: 'adv', name: 'Advice', line: 'Essentials plus every statement of advice your firm writes.', q: 'cc=1&soa=all', tag: 'A good place to start' },
    { key: 'full', name: 'Full practice', line: 'Advice plus Client Portal and Broadcast HQ.', q: 'cc=1&soa=all&add=portal,bhq' }
  ];
  function sameBuild(a, b){ return (a.get('soa') || 'none') === (b.get('soa') || 'none') && adds(a).slice().sort().join() === adds(b).slice().sort().join() && !a.get('web') && !a.get('brand') && !a.get('mkt') && a.get('docs') !== '1'; }

  /* Rich product sheets: the depth lives here, opened only by people who want it.
     Meeting Notes is the template; other products fall back to the short sheet until written.
     7 Nov trim (one job per sheet): no "Why it matters" or "Who it helps"; the close-ups are one tabbed
     viewer; "works with" is a single line; the adviser-checks point is made once, by the Approve tab. */
  /* The Advice Engine's features, picked one by one (10 Nov 2026). Prices are Lee's suggestion for Daniel, the same as the
     local Build your Bunya branch; not agreed. Words from Daniel's configurator. Films from his repo, in assets/films/.
     tools/v3/build_products.mjs reads this list for the Advice Engine page. */
  var FEATS = [
    { k: 'ff',  name: 'Fact find', p: '40c', film: 'fact-find', rec: 'Start here', text: 'Gathered from the meeting, the documents and the client portal. Each answer shows where it came from, and anything that doesn’t match is flagged before your adviser locks it.' },
    { k: 'pf',  name: 'Portfolio', p: '30c', film: 'portfolio', text: 'Their investments and super pulled together, ready for advice.' },
    { k: 'ins', name: 'Insurance needs and quotes', p: '40c', film: 'insurance-needs', needs: 'the fact find', text: 'Cover needs worked out from the fact find, with comparison quotes.' },
    { k: 'mod', name: 'Strategy and modelling', p: '50c', film: 'strategy-and-modelling', needs: 'the fact find', text: 'Retirement, cash flow and super scenarios, prepared for paraplanning.' },
    { k: 'cmp', name: 'Platform comparisons', p: '30c', film: 'platform-comparison', needs: 'the portfolio', text: 'Platforms and products compared side by side.' },
    { k: 'soa', name: 'SOA generator', p: '$1', film: 'soa-generator', needs: 'the fact find and modelling', tag: 'Pilot', text: 'The draft SOA in your template, with every recommendation linked to its reasons.' },
    { k: 'aud', name: 'File Audit', p: '30c', film: 'file-audit', needs: 'the SOA generator', tag: 'Pilot', text: 'Every file checked against your licensee’s standards before it goes out.' }
  ];
  var MN = 'assets/meeting-notes/';
  var DETAIL = {
    notes: {
      how: [
        { t: 'Recorded', d: 'The Teams meeting is recorded and transcribed, under your agreed consent settings.' },
        { t: 'Drafted', d: 'File note, actions and a follow-up email, in your firm’s format.' },
        { t: 'Checked', d: 'The adviser edits, approves or sends it back.' },
        { t: 'Filed', d: 'Recording, transcript and the approved note, with the client.' }
      ],
      works: 'Works with Teams, Outlook, SharePoint and your client record.',
      shots: [
        { tab: 'File note', img: MN + 'note.webp', t: 'A file note in your format.', d: 'Drafted from the conversation. Every point links to the moment it was said, so checking takes minutes.' },
        { tab: 'Actions', img: MN + 'actions.webp', t: 'Every action has an owner.', d: 'Proposed with a name and a due date. Accepted actions become tasks.' },
        { tab: 'Follow-up', img: MN + 'email.webp', t: 'A follow-up in your voice.', d: 'On your letterhead, written from the agreed next steps.' },
        { tab: 'Approve', img: MN + 'approve.webp', t: 'The adviser has the final say.', d: 'Names, decisions and next steps are checked. Nothing is filed or sent until it’s approved, and only the approved version is kept.' }
      ],
      vs: { name: 'With Meeting Notes', rows: [
        ['The record', 'Notes typed up later, from memory.', 'The recording and transcript, kept with the client.'],
        ['File note', 'Written when there’s finally time.', 'Drafted by the time the meeting ends.'],
        ['Actions', 'On a notepad, or in someone’s head.', 'Proposed, each with a named owner and a due date.'],
        ['Follow-up email', 'Started from a blank page.', 'A branded draft, from what was agreed.'],
        ['Finding it later', 'Searched for across inboxes and drives.', 'Filed in SharePoint and linked to the client.']
      ] },
      faq: [
        /* Answered 7 Nov (question list): told at the start + Teams banner; Teams meetings and Teams calls, Bunya sets up Teams Phone. */
        ['Do clients know the meeting is recorded?', 'Yes. The adviser tells them at the start, and Teams shows a recording banner for the whole meeting.'],
        ['Which meetings are supported?', 'Teams meetings and Teams calls. If your firm doesn’t take calls in Teams yet, we set up Teams Phone for you.']
      ]
    },
    /* Statements of advice (7 Nov). Same Harper Family as Meeting Notes, so the two sheets read as one story.
       Screens: Higgsfield/concept-ui/ui.html ?s=soa_ready|soa_strategy|soa_draft|soa_approve, plus the existing factfind. */
    soa: {
      how: [
        { t: 'Fact find', d: 'Filled from the meeting and the documents, then confirmed with the client.' },
        { t: 'Strategy', d: 'Current and proposed, side by side. The adviser sets the strategy.' },
        { t: 'Draft', d: 'The SOA, drafted in your firm’s template, every figure sourced.' },
        { t: 'Approve and sign', d: 'The adviser approves it, then the client signs, by e-signature or in Client Portal.' }
      ],
      /* Answered 7 Nov: signing by e-signature or Client Portal (both); template in Word or PDF, depending on the firm. */
      works: 'Works with your firm’s SOA template in Word or PDF, Meeting Notes, SharePoint and the client record.',
      shots: [
        { tab: 'Fact find', img: 'assets/concept/factfind.webp', t: 'A fact find that starts full.', d: 'Answers gathered from the meeting and the documents you filed, each showing where it came from.' },
        { tab: 'Strategy', img: 'assets/soa/strategy.webp', t: 'The numbers, lined up.', d: 'Current and proposed positions from the confirmed fact find. The assumptions and the strategy stay with the adviser.' },
        { tab: 'Draft SOA', img: 'assets/soa/draft.webp', t: 'Drafted in your template.', d: 'Each recommendation explained, with every figure linked to the fact find, the modelling or the meeting.' },
        { tab: 'Approve', img: 'assets/soa/approve.webp', t: 'Nothing goes out unapproved.', d: 'The adviser checks the draft against the strategy and edits what they need. Only the approved version goes to the client.' }
      ],
      vs: { name: 'With Bunya', rows: [
        ['Fact find', 'Retyped from notes, emails and old forms.', 'Filled from what the client has already told you.'],
        ['Modelling', 'Rebuilt in a spreadsheet for each client.', 'Current and proposed, side by side.'],
        ['The SOA', 'Written from a blank template, or queued for paraplanning.', 'Drafted in your template, ready to check.'],
        ['Checking it', 'Hunting back through files to confirm each figure.', 'Every figure links to where it came from.'],
        ['Signing', 'Printed, signed, scanned and filed.', 'Signed by e-signature or in Client Portal, then filed.']
      ] },
      faq: [
        /* Lee approved this answer for v3 on 26 Oct (Daniel's wording; pulled from v2). */
        ['Does Bunya write the SOA?', 'Yes. Bunya drafts the Statement of Advice in your template, and your adviser checks and approves it before it goes to the client. If your firm is self-licensed, you can start straight away. If you’re with a licensee, we’ll ask them to approve it first.'],
        /* Answered 7 Nov: yes, the draft can go to a paraplanner first. */
        ['Do our paraplanners still have a role?', 'Yes. The draft can go to your paraplanner to refine, or straight to the adviser to check. Your firm decides the handover.'],
        ['What if we only write a few SOAs?', 'Choose Command Centre instead, and pay $153 for each SOA we draft for you. You can compare both models when you build yours.'],
        /* Daniel's page marks these two 'Pilot: in use with early firms' (9 Nov). */
        ['Is all of it live?', 'The fact find, portfolio, insurance needs, modelling and comparisons are. The SOA generator and File Audit are in pilot with early firms.']
      ]
    },
    /* Review Packs (7 Nov). Calder Family (and the Morgans for the invite).
       Screens: Higgsfield/concept-ui/ui.html ?s=rv_ready|rv_year|rv_invite|rv_changes|rv_pack → assets/reviews/.
       Facts from reviews-fee-consent.html: cycles start from the client's real dates; invitations drafted for the team;
       what's-changed summary before the meeting; a person approves everything that goes to the client. */
    reviews: {
      how: [
        { t: 'Due', d: 'Each review starts from the client’s real dates, not from someone noticing.' },
        { t: 'Invite', d: 'The invitation is drafted. Your team approves it before it goes.' },
        { t: 'Prepare', d: 'What’s changed, the review pack and any fee consent renewal, ready before the meeting.' },
        { t: 'Review', d: 'Meeting Notes writes up the meeting and drafts the follow-up.' }
      ],
      works: 'Works with Outlook, Teams, SharePoint, Meeting Notes and the client record.',
      shots: [
        { tab: 'Year ahead', img: 'assets/reviews/year.webp', t: 'Your year, seen now.', d: 'Every review lined up from the client’s dates, so busy months show up before they arrive.' },
        /* Answered 7 Nov: yes, times come from the adviser's Outlook calendar. */
        { tab: 'Invite', img: 'assets/reviews/invite.webp', t: 'Invitations, drafted.', d: 'On your letterhead, with times from the adviser’s Outlook calendar. Sent only when your team approves it.' },
        { tab: 'What’s changed', img: 'assets/reviews/changes.webp', t: 'What’s changed, gathered.', d: 'From emails, documents and meetings since the last review, each with its source, plus the questions to ask.' },
        { tab: 'Review pack', img: 'assets/reviews/pack.webp', t: 'The pack, ready to check.', d: 'Where the client is now, what’s changed and progress on last year’s advice, in your format. The adviser approves it before the meeting.' }
      ],
      /* 10 Nov 2026 (Lee: "Yes, add them"): Aynub Financial's Annual Review as the worked example; each slide opens the whole deck in the reader. */
      example: { label: 'In your format', title: 'The review pack, in your brand.', lead: 'Here’s Aynub Financial’s annual review deck, a made-up practice we branded to show what your firm’s pack can look like.',
        docs: [['annual', 1, 'Annual review', 'Slide 1 of 18', 'l'], ['annual', 2, 'What we’ll cover today', 'Slide 2 of 18', 'l']],
        more: 'See the whole Aynub example', note: 'Aynub Financial is a fictional practice. It holds no ABN or AFSL, and nothing here is financial advice.' },
      vs: { name: 'With Review Packs', rows: [
        ['Starting a review', 'When someone notices it’s due.', 'From the client’s real dates.'],
        ['Booking', 'Back-and-forth emails to find a time.', 'An invitation drafted for your team to send.'],
        ['Preparation', 'Dug out of last year’s emails and files.', 'What’s changed, gathered with sources.'],
        ['The pack', 'Built by hand the night before.', 'Ready before the meeting, in your format.'],
        ['Busy months', 'Discovered when they arrive.', 'Seen ahead, by adviser and month.'],
        ['Fee consent', 'Tracked in a separate spreadsheet.', 'Kept with the review it belongs to, renewed on time.'],
        ['Consent evidence', 'Hunted for when someone asks.', 'On the client’s record, with the date it was signed.']
      ] },
      /* 10 Nov 2026 (Lee's page plan): Fee consent is part of this page now (its own page is retired; the menu's Fee consent opens #fees). */
      extra: [{ id: 'fees', title: 'Fee consent, with every review', lead: 'Know when every consent is due, and act while the window is open.', how: [
        { t: 'Due', d: 'Each consent’s due date is tracked from when it was signed.' },
        { t: 'Ready', d: 'The renewal is prepared with the review it belongs to.' },
        { t: 'Approved', d: 'Your team checks the request before it goes to the client.' },
        { t: 'Recorded', d: 'The signed consent is kept on the client’s record.' }
      ] }],
      faq: [
        ['How far ahead does a review start?', 'As far ahead as your firm chooses. When each cycle starts, and every step after it, is set up for your firm before go-live.'],
        ['Does anything go to the client without a person?', 'No. Invitations and review packs are drafted for your team. A person checks and approves each one before it goes.'],
        /* Answered 7 Nov: the parts are confirmed. Still open: can firms change them? ('set to match your firm' unconfirmed) */
        ['What goes into the pack?', 'Where the client is now, what’s changed since the last review, progress on last year’s advice and the questions to cover. The format is set to match your firm.'],
        ['Does Bunya make sure we meet our fee consent obligations?', 'No software can do that for you. Bunya keeps each consent with its review, reminds the right person and keeps the evidence. Your firm stays responsible for its obligations.']
      ]
    },
    /* Client Portal (7 Nov). The Harpers' own view, after Alex approves their SOA (continues the SOA sheet).
       Screens: Higgsfield/concept-ui/ui.html ?s=cp_home|cp_sign|cp_plan|cp_docs|cp_talk → assets/portal/.
       Facts: advice-implementation.html (read and sign, book time, see what happens next) and the home card copy.
       nocrop: these screens have no app rail, so the viewer shows them full width. */
    portal: {
      nocrop: true,
      how: [
        { t: 'Shared', d: 'Your team shares documents and updates. Nothing appears until they do.' },
        { t: 'Read', d: 'Clients read their advice, and ask their adviser anything.' },
        { t: 'Sign', d: 'They sign, and it’s filed to their record.' },
        { t: 'Follow', d: 'They see what happens next, and book their next meeting.' }
      ],
      works: 'Works with Command Centre, Outlook, SharePoint and the client record.',
      shots: [
        /* Answered 7 Nov: clients sign in the portal or by e-signature. Still open: do both partners sign separately? */
        { tab: 'Read and sign', img: 'assets/portal/sign.webp', t: 'Advice they can read and sign.', d: 'The approved advice, ready to read at their own pace, with a question for the adviser one tap away.' },
        { tab: 'Their plan', img: 'assets/portal/plan.webp', t: 'Always know where it’s up to.', d: 'Each step of their advice, and what happens next. Fewer “where are we up to?” calls.' },
        /* Answered 7 Nov: uploads are stored in SharePoint. */
        { tab: 'Documents', img: 'assets/portal/docs.webp', t: 'One place for documents.', d: 'Everything shared, both ways. What clients send is stored in SharePoint with their record, not in someone’s inbox.' },
        { tab: 'Messages', img: 'assets/portal/talk.webp', t: 'Talk, and book time.', d: 'Messages with the adviser’s team, and meetings booked at times that suit them.' }
      ],
      vs: { name: 'With Client Portal', rows: [
        ['Sending advice', 'Emailed as a PDF, or posted.', 'Shared to the client’s own space.'],
        ['Signing', 'Printed, signed, scanned and sent back.', 'Read and signed online, then filed.'],
        ['Documents from clients', 'Attachments scattered across inboxes.', 'Stored in SharePoint, on their record.'],
        ['“Where are we up to?”', 'A phone call to the office.', 'Their plan’s progress, always current.'],
        ['Booking', 'Back-and-forth emails.', 'A time picked that suits them.']
      ] },
      faq: [
        /* Answered 7 Nov: sign-in by email and password; clients see only what the team shares; name + logo, full theme with a brand pack. */
        ['How do clients sign in?', 'With their email address and a password.'],
        ['What can clients see?', 'Only what your team shares with them: their documents, meetings, messages and where their advice is up to.'],
        ['Is it in our brand?', 'Yes. Clients see your firm’s name and logo, not Bunya’s. Add one of our brand packs and it carries your full brand theme and colours.']
      ]
    },
    /* Broadcast HQ (7 Nov). Same "Super or mortgage?" idea as the old cockpit still. Facts from v3 broadcast-hq.html
       (four ways to start, a draft per channel in the firm's voice, privacy check, each variant approved on its own,
       nothing publishes automatically). Screens: concept-ui/ui.html ?s=bh_ready|bh_start|bh_channels|bh_privacy|bh_schedule. */
    bhq: {
      how: [
        { t: 'Idea', d: 'Write the angle once, or start from a memo, a photo or a draft.' },
        { t: 'Draft', d: 'A version for each channel, in your firm’s voice.' },
        { t: 'Check', d: 'Names, ages and dollar figures are anonymised as each version is written.' },
        { t: 'Approve', d: 'Each version is approved on its own, then scheduled. Nothing publishes automatically.' }
      ],
      works: 'Publishes to your blog and all the main social channels, on the firm’s accounts and each adviser’s own, with one login.',
      shots: [
        { tab: 'Start', img: 'assets/broadcast/start.webp', t: 'Start from what you know.', d: 'Type an idea, record a memo on your phone, drop in a photo or paste a draft. Never a blank page.' },
        { tab: 'Channels', img: 'assets/broadcast/channels.webp', t: 'Every channel, its own way.', d: 'Each version is written for where it’ll appear, and an adviser can post it to their own accounts and the firm’s at the same time.' },
        /* Answered 7 Nov: the system anonymises client details automatically while it writes. */
        { tab: 'Privacy check', img: 'assets/broadcast/privacy.webp', t: 'Client details stay out.', d: 'Names, ages and dollar figures are anonymised automatically as content is written, and your team sees exactly what changed.' },
        { tab: 'Schedule', img: 'assets/broadcast/schedule.webp', t: 'Approved one by one.', d: 'Each version is approved on its own. Holding one back doesn’t stop the rest, and nothing goes out automatically.' }
      ],
      vs: { name: 'With Broadcast HQ', rows: [
        ['Starting', 'A blank page, every time.', 'One idea, a memo or a photo.'],
        ['Each channel', 'Rewritten by hand for each one.', 'A version for each, in your firm’s voice.'],
        ['Client privacy', 'Hoping no one slips a name in.', 'Names, ages and dollar figures anonymised automatically.'],
        ['Approval', 'Chasing sign-off over email.', 'Each version approved on its own.'],
        ['Firm and adviser accounts', 'Logged into one by one, posted separately.', 'One login. Post to both at once.'],
        ['Publishing', 'Posted when someone remembers.', 'Scheduled on dates you confirm.']
      ] },
      faq: [
        ['Does anything publish without review?', 'No. Every version is approved by your team first, and nothing publishes automatically.'],
        /* Answered 7 Nov: blogs and all socials publish directly. Still open: is the newsletter sent from Broadcast HQ or drafted to copy? */
        ['Which channels can we use?', 'Your blog and all the main social channels, published straight from Broadcast HQ once each version is approved.'],
        /* Lee, 7 Nov: connects the firm's socials and each adviser's own with one login; advisers post to both at once. */
        ['Can advisers post to their own accounts?', 'Yes. The firm’s socials and each adviser’s own connect with one login, so an adviser can post to theirs and the firm’s at the same time.'],
        ['Do we need it to deliver advice?', 'No. Broadcast HQ is an optional app. Command Centre delivers advice without it.']
      ]
    },
    /* Fee consent, short sheet (7 Nov). Facts from v3 reviews-fee-consent.html: consent kept with the review it belongs to,
       reminders, evidence on the record, a person approves every request, the firm stays responsible. No screens of its own. */
    fee: {
      how: [
        { t: 'Due', d: 'Each consent’s due date is tracked from when it was signed.' },
        { t: 'Ready', d: 'The renewal is prepared with the review it belongs to.' },
        { t: 'Approved', d: 'Your team checks the request before it goes to the client.' },
        { t: 'Recorded', d: 'The signed consent is kept on the client’s record.' }
      ],
      vs: { name: 'With Fee consent', rows: [
        ['Tracking', 'A separate spreadsheet.', 'Kept with the review it belongs to.'],
        ['Reminders', 'Someone remembering.', 'The right person reminded while the window is open.'],
        ['Evidence', 'Hunted for when someone asks.', 'On the client’s record, with the date it was signed.']
      ] },
      faq: [
        ['Does Bunya make sure we meet our fee consent obligations?', 'No software can do that for you. Bunya keeps each consent with its review, reminds the right person and keeps the evidence. Your firm stays responsible for its obligations.']
      ]
    },
    /* Brand, website and marketing, short sheet (7 Nov). Prices = the 6 Nov locked services list (also on build.html).
       Descriptions stay at what the tier names say; no extra inclusions claimed. */
    svc: {
      /* 10 Nov 2026 (Lee: "Yes, start there"): Aynub Financial, the fictional practice Bunya branded in Oct 2026 (Design/Dummy Company -
         Aynub Finance), as the worked example. Pages captured from the approved Final set (23 Oct) into assets/aynub/. Left out on
         purpose: any page naming real platforms, funds, banks or portals (HUB24, Hostplus, AustralianSuper, CFS, Westpac, ANZ,
         myprosperity) and the team page (stock models; one is 'Priya', which clashes with the films' Priya Shah). */
      showcase: { id: 'example', label: 'See it on a firm', title: 'One firm. One look. Every document.',
        lead: 'Meet Aynub Financial, a made-up advice practice we branded to show what this looks like. Its name is Bunya, turned around. Every page here is a fictional example.',
        kit: { logo: 'assets/aynub/aynub-lockup-financial-on-light.png', line: 'Plan backwards. Live forwards.', type: 'Words in Geologica. Numbers in Gloock.',
          colours: [['Plum', '#772A53'], ['Sage', '#678D6C'], ['Ivory', '#F7F5F0'], ['Ink', '#2A2230'], ['Afterglow', '#FC7D23']] },
        /* 10 Nov 2026 (Lee): a row of covers; each opens every page in the reader (js/reader.js). 11 Nov 2026: recaptured from Dana's
           updated set (Sales and Briefing/Aynub), which takes out the real platform and fund names, plus the new Value of Advice
           Statement. Its p. 11 still names myprosperity (Lee: leave it). */
        covers: [['soa', 'SOA walkthrough', 'A4 · 21 pages'], ['proposal', 'Advice proposal', 'A4 · 11 pages'], ['welcome', 'Welcome pack', 'A4 · 21 pages'],
          ['annual', 'Annual review', 'Slides · 18'], ['value', 'Value of Advice statement', 'A4 · 24 pages'], ['portfolio', 'Portfolio review', 'Slides · 12'], ['sustainable', 'Sustainable portfolio review', 'Slides · 13'], ['email', 'Strategy email', 'Email']],
        note: 'Aynub Financial is a fictional practice. It holds no ABN or Australian Financial Services Licence, and nothing here is financial advice. Photographs are licensed stock.' },
      /* 9 Nov: Daniel's configurator. Brand prices unchanged; documents as one Marketing bundle pack; website and marketing quoted. */
      menu: { title: 'What you can add', note: 'Pick any, or none. Draft prices, A$ ex GST.', groups: [
        { h: 'Brand', when: 'Once', items: [
          ['AI brand kit', 'Made from your website in minutes. Your logo and colours across Bunya, and you can change them any time.', 'Included'],
          ['Brand kit, checked by our designer', 'Our designer checks your brand kit, tidies your logo files and sets your colours across Bunya.', '$1,800'],
          ['Brand guidelines', 'Voice, tone and layout rules for everything your firm sends.', '$4,500'],
          ['Brand refresh', 'A refreshed brand, with your Client Portal themed to match.', '$7,500'] ] },
        { h: 'Documents', when: 'Once', items: [
          /* 10 Nov 2026 (Lee: "go back to Daniel's price"): Daniel's bundle stays, not the locked $8,000 pack. */
          ['Marketing bundle pack', 'Your Brand Document Pack and client collateral, designed as one set.', '$12,500'],
          ['With the Advice Engine', 'The Brand Document Pack is already included, so you pay for the collateral only.', '$4,500'] ] },
        /* 10 Nov 2026 (Lee: "happy with all that"): two prices replace the tiers and the quote. Website design $8,500 once (up to 12 pages,
           12 months of hosting included); Found & Cited $1,500 a month (hosting and upkeep folded in). Its own page: website-marketing.html. */
        { h: 'Website and marketing', when: 'Once, then monthly', items: [
          ['Website design', 'Up to 12 pages in your brand, with adviser profiles and online booking, built so Google and AI answers can read every page. 12 months of hosting included.', '$8,500'],
          ['Found & Cited', 'Hosting and updates, two new answer pages a month, your Google Business Profile, and a monthly report on where you appear in Google and AI answers.', '$1,500 a month'] ] }
      ],
        after: 'Choose them when you build yours, or talk them through with us first. <a href="website-marketing.html">See Website and marketing</a>' },
      vs: { name: 'With Bunya', rows: [
        ['Your brand', 'A little different on every document.', 'One look across portal, documents and website.'],
        ['Client documents', 'Default templates.', 'SOAs and review packs in your brand.'],
        ['Your website', 'Out of date and hard to find.', 'Built to be found, and cited by AI answers.']
      ] },
      faq: [
        ['Do we need these to use Command Centre?', 'No. They’re optional. Command Centre and its apps work without them.'],
        ['How do they fit with Client Portal?', 'A brand kit or refresh carries your full brand theme and colours into Client Portal, so clients see one look everywhere.']
      ]
    },
    /* Care, short sheet (8 Nov). Facts: the LIVE v2 'After go-live' and support wording (tutorials per role + a team to ask,
       connections kept healthy, a regular improvement session, changes scoped and tested before release) and the build
       page's pricing (included when you subscribe; own it = 30% of the base fee, from $1,497 a month).
       CONFIRM with Daniel (question doc #26, #27): support hours, response times, how often updates come. */
    care: {
      how: [
        { t: 'Help', d: 'Video tutorials for each role, and a team to ask when something is unclear.' },
        { t: 'Kept healthy', d: 'The connections agreed for your firm are looked after.' },
        { t: 'Updates', d: 'Changes are scoped and tested before they’re released to your team.' },
        { t: 'Improve', d: 'A regular session to choose what to improve next.' }
      ],
      /* 10 Nov 2026 (Lee's page plan): Bunya Portal is part of Care now (its own page is retired; the menu's Bunya Portal opens #portal). */
      shotsTitle: 'Your Bunya Portal', shotsId: 'portal', shotsLead: 'Every firm gets one. Ask about your work, request changes, add apps and follow every project, in one place.', nocrop: true,
      shots: [
        { tab: 'Home', img: 'assets/bunya-portal/home.webp', t: 'Everything with Bunya, at a glance.', d: 'Your projects, anything waiting on your team, recent meetings and your next progress meeting.' },
        { tab: 'Ask Bunya', img: 'assets/bunya-portal/ask.webp', t: 'Ask, and get the answer from your records.', d: 'What was agreed, where a project is, which video to watch. Ask Bunya answers from your firm’s records with Bunya.' },
        { tab: 'Discover', img: 'assets/bunya-portal/discover.webp', t: 'Find your next improvement.', d: 'Add apps and agents to your plan. We review fit, access and costs with you before anything is set up.' },
        { tab: 'Requests', img: 'assets/bunya-portal/requests.webp', t: 'From question to delivered.', d: 'Every change, file and answer, tracked. Changes are scoped and quoted before any build starts.' }
      ],
      vs: { name: 'With Care', rows: [
        ['Getting stuck', 'Waiting for whoever set it up.', 'Tutorials for your role, and a team to ask.'],
        ['Changes', 'Made in a hurry, straight into live work.', 'Scoped and tested before they’re released.'],
        ['Next year', 'The system you bought, standing still.', 'A regular session to choose the next improvement.'],
        ['Asking for a change', 'An email, then chasing it.', 'A request in your Bunya Portal, scoped and quoted, tracked to delivered.'],
        ['What was agreed', 'Search old emails and notes.', 'Ask Bunya, answered from your records.']
      ] },
      faq: [
        ['What does Care cost?', 'It’s included when you subscribe. If you buy Command Centre outright, Care is 30% of your base fee, from $1,497 a month. Care Premium adds a named engineer and a one-hour response, for $1,997 a month. Draft prices, A$ ex GST.'],
        ['How do we get help?', 'Use the support channel from your handover, or email info@bunya.ai, and include the workflow and what you need help with.'],
        ['What is Bunya Portal?', 'Your firm’s own space with Bunya. Everyone you invite sees chat, the library, meetings, the roadmap, requests and support. Invoices and balances are only for the people you choose.'],
        ['Does Ask Bunya change anything?', 'No. It answers questions from your records. Changes go through a request, and are scoped and quoted before any build starts.'],
        ['Can we buy apps in the portal?', 'No. Adding an app or agent to your plan starts the conversation. We review fit, access and costs with you before setup.']
      ]
    },
    shape: {
      how: [
        { t: 'Ask', d: 'Say what you want in plain English, like “add the client’s preferred contact time to the client form”.' },
        { t: 'See it', d: 'Bunya Shape makes the change as a draft, on your own screen.' },
        { t: 'Approve', d: 'Nothing goes live until someone on your team approves it. Or ask for it to be changed.' },
        { t: 'Share', d: 'Use forms and reports other practices have shared in the community library.' }
      ],
      works: 'Included with every Bunya, as part of Care. For bigger changes, our build team does it with you, and your first month of Bunya Build is included.',
      vs: { name: 'With Bunya Shape', rows: [
        ['Adding a field to a form', 'A ticket, a quote and a wait.', 'Ask in plain English, approve it, done.'],
        ['A new report', 'Exported to Excel and rebuilt each month.', 'Asked for once, there whenever you need it.'],
        ['What other firms use', 'Built from scratch.', 'Picked from the community library.']
      ] }
    },
    /* Bunya Portal (8 Nov, rewritten after Lee showed the real WIP portal, bunya-portal.powerappsportals.com). What it has:
       Home (projects, waiting on you, recent meetings, next progress meeting); Ask Bunya (AI answers from the firm's records:
       projects, meetings, documents, training; "check anything important"); Library (documents, meeting records with summary,
       recording and transcript, training videos); Discover (Marketplace of apps and agents: Add to plan, Bunya reviews fit,
       access and costs before setup, nothing bought in the portal; Community ideas with "We'd use this"; What's new; Your tools);
       Roadmap (health, stage, target, next progress meeting); Requests (feature, question, file, invoice, meeting action;
       scoped and quoted before any build); Support (problems from the portal, Teams or phone); Releases; Account (Bunya adds
       people; financial data only for people marked to see it). NOT in the portal yet: firms editing their own system
       (Lee 29 Oct) — left off the site until it exists. CONFIRM: every firm gets it (#28); name ("Bunya Portal" vs the real
       "Bunya Client Portal"). Screens: concept-ui/ui.html ?s=bp_home|bp_ask|bp_market|bp_req (concept, never the real UI). */
    bp: {
      nocrop: true,
      how: [
        { t: 'Ask', d: 'Ask Bunya about your projects, meetings, documents and training.' },
        { t: 'Request', d: 'Ask for a change, a file or an answer. Changes are scoped and quoted first.' },
        { t: 'Follow', d: 'See each project’s health, target date and next progress meeting.' },
        { t: 'Discover', d: 'Add apps and agents to your plan, and back ideas from other firms.' }
      ],
      works: 'Bunya invites your team. Everyone sees chat, the library, meetings, the roadmap, requests and support. Invoices and balances are only for the people you choose.',
      shots: [
        { tab: 'Home', img: 'assets/bunya-portal/home.webp', t: 'Everything with Bunya, at a glance.', d: 'Your projects, anything waiting on your team, recent meetings and your next progress meeting.' },
        { tab: 'Ask Bunya', img: 'assets/bunya-portal/ask.webp', t: 'Ask, and get the answer from your records.', d: 'What was agreed, where a project is, which video to watch. Ask Bunya answers from your firm’s records with Bunya.' },
        { tab: 'Discover', img: 'assets/bunya-portal/discover.webp', t: 'Find your next improvement.', d: 'Add apps and agents to your plan. We review fit, access and costs with you before anything is set up.' },
        { tab: 'Requests', img: 'assets/bunya-portal/requests.webp', t: 'From question to delivered.', d: 'Every change, file and answer, tracked. Changes are scoped and quoted before any build starts.' }
      ],
      vs: { name: 'With Bunya Portal', rows: [
        ['Asking for a change', 'An email, then chasing it.', 'A request, scoped and quoted, tracked to delivered.'],
        ['Where a project is up to', 'Ask, and wait for an answer.', 'Health, target date and next meeting, always there.'],
        ['What was agreed', 'Search old emails and notes.', 'Ask Bunya, answered from your records.'],
        ['Adding something new', 'A new contract and a new login.', 'Add it to your plan. We check fit and cost first.']
      ] },
      faq: [
        ['Does every firm get it?', 'Yes. Every Command Centre comes with Bunya Portal.'],
        ['Who can see what?', 'Everyone you invite sees chat, the library, meetings, the roadmap, requests and support. Invoices and balances are only for the people you choose.'],
        ['Does Ask Bunya change anything?', 'No. It answers questions from your records. Changes go through a request, and are scoped and quoted before any build starts.'],
        ['Can we buy apps in the portal?', 'No. Adding an app or agent to your plan starts the conversation. We review fit, access and costs with you before setup.']
      ]
    },
    /* Bunya Vault (8 Nov, Lee: "Yes, add it"). Facts from the Vault page in the real portal's Discover (APP · PILOT):
       logins, API keys and service credentials the team shares, each linked to the client or supplier; secrets in a Key Vault
       in the firm's own Azure tenant, never in the CRM; each person signs in as themselves and every view is logged; values
       hidden until revealed, cleared after 60 seconds; expiry dates at a glance; Bunya sets it up in the firm's Azure, gives
       access and trains the team; in pilot with a small group; needs an Azure subscription in the M365 tenant and someone who
       can approve Key Vault access. 10 Nov: Lee says Vault is working, so it's a regular app; no price yet, so the sheet says
       "Talk to us" instead of adding to the build (it isn't in Daniel's configurator). CONFIRM: its price. Screens: concept-ui/ui.html ?s=vt_list|vt_reveal|vt_add -> assets/vault/. */
    vault: {
      nocrop: true,
      how: [
        { t: 'Add', d: 'Add a login, API key or service credential, linked to the client or supplier it belongs to.' },
        { t: 'Find', d: 'Search by account and type, with expiry dates at a glance.' },
        { t: 'Reveal', d: 'Values stay hidden until someone reveals them, and clear again after 60 seconds.' },
        { t: 'Logged', d: 'Everyone signs in as themselves, and every view is logged.' }
      ],
      works: 'Secrets stay in a Key Vault in your firm’s own Azure tenant, never in your CRM. It needs an Azure subscription in your Microsoft 365 tenant, and someone who can approve Key Vault access.',
      shots: [
        { tab: 'Your vault', img: 'assets/vault/list.webp', t: 'Every shared login, in one place.', d: 'Grouped by the client or supplier each one belongs to, with expiry dates at a glance.' },
        { tab: 'Reveal', img: 'assets/vault/reveal.webp', t: 'Hidden until you need it.', d: 'Reveal or copy a value when you need it. It clears after 60 seconds, and every view is logged by name.' },
        { tab: 'Add', img: 'assets/vault/add.webp', t: 'Stored in your own Azure.', d: 'Add a credential and the secret goes only to Azure Key Vault in your firm’s tenant.' }
      ],
      vs: { name: 'With Bunya Vault', rows: [
        ['Shared logins', 'A spreadsheet, or an old email.', 'One vault, each linked to its client or supplier.'],
        ['Who looked', 'No way of knowing.', 'Everyone signs in as themselves. Every view is logged.'],
        ['On screen', 'Passwords left in plain sight.', 'Hidden until revealed, cleared after a minute.'],
        ['Expiring keys', 'Found when something stops working.', 'Expiry dates at a glance.']
      ] },
      faq: [
        ['Where are the passwords kept?', 'In a Key Vault in your firm’s own Azure tenant, never in your CRM.'],
        ['Can we use it now?', 'Yes. Book a call and we’ll set it up in your firm’s Azure tenant, then price it with you.'],
        ['What does it need?', 'An Azure subscription in your Microsoft 365 tenant, and someone who can approve Key Vault access for your team.'],
        ['Who sets it up?', 'We set up the vault in your Azure tenant, give the right people access and show your team how to add and find credentials.']
      ]
    },
    /* Field Notes (7 Nov). A home visit with the Walsh Family. Facts from Lee's answers (question doc #16, #18, #19):
       recorded in Command Centre, stored in SharePoint, captured with consent, ready at launch.
       Still open: does it work without internet (#17)? Screens: concept-ui/ui.html ?s=fd_ready|fd_record|fd_note|fd_filed. */
    field: {
      how: [
        { t: 'Consent', d: 'The client agrees before anything is recorded.' },
        { t: 'Record', d: 'The meeting is recorded in Command Centre, wherever it happens.' },
        { t: 'Drafted', d: 'A file note and actions, ready for the adviser to check.' },
        { t: 'Filed', d: 'Recording and approved note, stored in SharePoint with the client.' }
      ],
      works: 'Works with Command Centre, SharePoint, Meeting Notes and the client record.',
      shots: [
        { tab: 'Record', img: 'assets/field/record.webp', t: 'Their kitchen table, not a Teams call.', d: 'Record a meeting at the client’s home or business, right in Command Centre, once they’ve agreed.' },
        { tab: 'File note', img: 'assets/field/note.webp', t: 'The same file note as the office.', d: 'Drafted from the conversation, with every point linked to the moment it was said. The adviser approves it.' },
        { tab: 'Filed', img: 'assets/field/filed.webp', t: 'Filed like any other meeting.', d: 'Recording, transcript, consent and the approved note, stored in SharePoint on the client’s record.' }
      ],
      vs: { name: 'With Field Notes', rows: [
        ['Meetings away from the office', 'Notes scribbled in the car afterwards.', 'Recorded with consent, like a Teams meeting.'],
        ['The file note', 'Typed up back at the office.', 'Drafted for the adviser to check.'],
        ['Consent', 'A spoken OK no one wrote down.', 'Captured before recording starts.'],
        ['The record', 'A notepad, then a scan, maybe.', 'Stored in SharePoint, on the client’s record.']
      ] },
      faq: [
        ['How is it different from Meeting Notes?', 'Meeting Notes covers Teams meetings and calls. Field Notes covers meetings in person, away from the office, and files them the same way.'],
        ['Is the client’s consent captured?', 'Yes. Nothing is recorded until the client has agreed.']
      ]
    },
    /* Command Centre (7 Nov): the base, so an overview rather than one flow. Screens: concept-ui/ui.html with ?nm=1
       (new-model stages Draft SOA / Sign; Patel Family in today's discovery so the Harpers can be at signing)
       ?s=home|cc_record|pipeline|outlook|reports → assets/cc/. Facts from the v3 site: Bunya prepares, a person approves,
       built in the firm's own Microsoft 365, shaped around the firm's process. */
    cc: {
      how: [
        { t: 'Shaped', d: 'Set up around your firm’s process, inside your own Microsoft 365.' },
        { t: 'Gathered', d: 'Emails, meetings and documents land on the client’s record.' },
        { t: 'Prepared', d: 'Bunya prepares the next piece of work for each client.' },
        { t: 'Approved', d: 'Your team checks it. Nothing moves until someone approves it.' }
      ],
      works: 'Runs inside your firm’s own Microsoft 365, with Outlook, Teams and SharePoint.',
      shots: [
        { tab: 'Client record', img: 'assets/cc/record.webp', t: 'Every household, one record.', d: 'Meetings, documents, advice and next steps together, with an owner on every step.' },
        { tab: 'Pipeline', img: 'assets/cc/pipeline.webp', t: 'Where all the advice is up to.', d: 'Every household from first meeting to implemented advice, and what’s waiting on a check.' },
        { tab: 'Email', img: 'assets/cc/email.webp', t: 'Email, filed for you.', d: 'Client emails and attachments land on the right record in Outlook, with a suggested next step to accept or dismiss.' },
        { tab: 'Reports', img: 'assets/cc/reports.webp', t: 'The practice, at a glance.', d: 'Advice in progress, reviews held on time and where work is waiting, across every adviser.' }
      ],
      vs: { name: 'With Command Centre', rows: [
        ['The client record', 'Spread across inboxes, drives and a CRM.', 'One record per household, with everything on it.'],
        ['Email', 'Attachments saved by hand, if at all.', 'Filed to the client as it arrives.'],
        ['What’s next', 'In people’s heads and on sticky notes.', 'Every next step has an owner.'],
        ['Where advice is up to', 'Asked around the office.', 'One pipeline, from first meeting to implemented.'],
        ['Your data', 'In someone else’s system.', 'In your firm’s own Microsoft 365.']
      ] },
      faq: [
        ['Where does our data live?', 'In your firm’s own Microsoft 365. Client records, documents and approvals stay in your tenancy.'],
        ['Does anything happen without a person?', 'No. Bunya prepares the work, and nothing is used or sent until someone on your team checks it.'],
        ['What’s Care?', 'Support and updates. It’s included when you subscribe, and priced separately if you buy Command Centre outright.']
      ]
    }
  };
  function detailHTML(p){
    var d = DETAIL[p.key], h = '';
    if (d.how) h += '<section class="hb-d"><span class="hb-dl">How it works</span><ol class="hb-how">' + d.how.map(function(x, n){
        return '<li><span class="n">' + (n + 1) + '</span><b>' + x.t + '</b><p>' + x.d + '</p></li>'; }).join('') + '</ol>' +
        (d.works ? '<p class="hb-works-line">' + d.works + '</p>' : '') + '</section>';
    if (d.shots) h += '<section class="hb-d"><span class="hb-dl">Up close</span><div class="hb-tabs" role="tablist" aria-label="' + p.name + ' up close">' + d.shots.map(function(x, n){
        return '<button type="button" role="tab" data-shot="' + n + '" aria-selected="' + (n ? 'false' : 'true') + '">' + x.tab + '</button>'; }).join('') + '</div>' +
        '<div class="hb-view"><div class="sc">' + d.shots.map(function(x, n){
          return '<img src="' + x.img + '" alt="' + x.t + ' (illustrative)" loading="lazy" class="' + (n ? '' : 'on') + (d.nocrop ? ' nc' : '') + '">'; }).join('') + '</div>' +
        '<div class="hb-cap" aria-live="polite"><b>' + d.shots[0].t + '</b><p>' + d.shots[0].d + '</p></div></div></section>';
    if (d.menu) h += '<section class="hb-d"><span class="hb-dl">' + d.menu.title + '</span><p class="hb-menu-note">' + d.menu.note + '</p><div class="hb-menus">' + d.menu.groups.map(function(g){
        return '<div class="hb-menu"><div class="hd"><b>' + g.h + '</b><span>' + g.when + '</span></div>' + g.items.map(function(it){
          return '<div class="it"><div><b>' + it[0] + '</b><p>' + it[1] + '</p></div><span class="pr">' + it[2] + '</span></div>'; }).join('') + '</div>'; }).join('') + '</div>' +
        (d.menu.after ? '<p class="hb-works-line">' + d.menu.after + '</p>' : '') + '</section>';
    if (d.vs) h += '<section class="hb-d"><span class="hb-dl">Today, and with ' + p.name + '</span><div class="hb-vs"><div class="hd"><span></span><span>Today</span><span>' + d.vs.name + '</span></div>' + d.vs.rows.map(function(r){
        return '<div class="r"><b>' + r[0] + '</b><span class="old">' + r[1] + '</span><span class="new">' + TICK + r[2] + '</span></div>'; }).join('') + '</div></section>';
    if (d.faq) h += '<section class="hb-d"><span class="hb-dl">Questions</span><div class="hb-faq">' + d.faq.map(function(f){
        return '<details><summary>' + f[0] + '<i></i></summary><p>' + f[1] + '</p></details>'; }).join('') + '</div></section>';
    return h;
  }
  function showShot(btn){
    var sec = btn.closest('.hb-d'), n = +btn.dataset.shot, x = DETAIL[PRODUCTS[cur].key].shots[n];
    [].forEach.call(sec.querySelectorAll('[data-shot]'), function(b, i){ b.setAttribute('aria-selected', i === n ? 'true' : 'false'); });
    [].forEach.call(sec.querySelectorAll('.hb-view img'), function(im, i){ im.classList.toggle('on', i === n); });
    sec.querySelector('.hb-cap').innerHTML = '<b>' + x.t + '</b><p>' + x.d + '</p>';
    var tl = btn.parentNode; if (tl.scrollWidth > tl.clientWidth) tl.scrollTo({ left: btn.offsetLeft - (tl.clientWidth - btn.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
  }

  var $ = function(id){ return document.getElementById(id); };
  var PLUS = '<svg class="i-plus" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  var TICK = '<svg class="i-tick" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function visual(p, big){
    if (big && p.hero) return '<div class="sc"><img src="' + p.hero + '" alt="" loading="lazy"></div>';
    if (p.rec) return '<div class="hb-rec"><div class="ph"><span class="dot"></span><b>42:16</b><div class="hb-wave">' +
      Array.apply(null, Array(12)).map(function(_, i){ return '<span style="height:' + (30 + (i * 41) % 70) + '%;animation-delay:' + (i * 80) + 'ms"></span>'; }).join('') +
      '</div><small>Recording with consent</small></div></div>';
    if (p.care) return '<div class="hb-care"><svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="hbcg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5EEAD4"/><stop offset=".5" stop-color="#67E8F9"/><stop offset="1" stop-color="#A5B4FC"/></linearGradient></defs>' + ICONS.care.replace(/<(circle|path)/g, '<$1 stroke="url(#hbcg)"') + '</svg>' +
      '<span style="left:12%;top:20%">Tutorials</span><span style="right:10%;top:34%">Updates</span><span style="left:18%;bottom:16%">A team to ask</span></div>';
    if (p.type) return '<div class="hb-type"><b>Aa</b><i style="left:16%;top:22%;background:#F472B6;transform:rotate(-12deg)"></i><i style="right:14%;top:30%;background:#818CF8;transform:rotate(14deg)"></i><i style="left:22%;bottom:18%;background:#FDE68A;transform:rotate(8deg)"></i></div>';
    return '<div class="sc" style="--op:' + (p.op || '0 0') + '"><img src="' + (p.img.indexOf('/') > -1 ? '' : IMG) + p.img + '" alt="" loading="lazy"></div>';
  }
  function style(p){ return '--g1:' + p.g1 + ';--g2:' + p.g2 + ';--k:' + p.kc; }

  /* Cards */
  var GROUP_IN = ['cc', 'notes', 'reviews', 'fee', 'care', 'bp'];
  /* 10 Nov 2026 (Lee): tick as you go. Each feature and app has a tick that adds it to Your Bunya (window.bunyaList, js/nav3.js);
     the menu pill keeps the running price per household. Vault is Talk to us, so it has no tick. */
  function tk(kind, k, name, cls){
    return '<button type="button" class="' + (cls || 'hb-tk') + '" data-tk="' + kind + ':' + (k || '') + '" data-name="' + name + '" aria-pressed="false" aria-label="Add ' + name + ' to your Bunya">' + PLUS + TICK + '</button>';
  }
  function syncTicks(){
    var L = window.bunyaList; if (!L) return;
    [].forEach.call(document.querySelectorAll('[data-tk]'), function(b){
      var p = b.dataset.tk.split(':'), on = L.has(p[0], p[1]);
      b.setAttribute('aria-pressed', String(on)); b.classList.toggle('on', on);
      b.setAttribute('aria-label', (on ? 'Remove ' : 'Add ') + b.dataset.name + (on ? ' from' : ' to') + ' your Bunya');
      var w = b.closest('.hb-ftw, .hb-cardw'); if (w) w.classList.toggle('picked', on);
      var t = b.querySelector('.tx'); if (t) t.textContent = on ? (b.dataset.on || 'Added') : (b.dataset.off || 'Add');
    });
  }
  document.addEventListener('bunya:build', syncTicks);
  function cardHTML(p, i){
    return '<div class="hb-cardw" style="' + style(p) + '">' + cardInner(p, i) + (p.key !== 'vault' ? tk('add', p.key, p.name) : '') + '</div>';
  }
  function cardInner(p, i){
    return '<button type="button" class="hb-card" data-i="' + i + '" style="' + style(p) + '" aria-label="' + p.name + ': ' + p.head + ' Learn more">' +
      '<span class="t"><span class="k">' + p.name + '</span><h3>' + p.head + '</h3></span>' +
      '<span class="vis">' + visual(p) + '</span><span class="tag">' + (p.soon ? 'Coming soon' : p.k) + '</span></button>';
  }
  /* What you get: one Command Centre panel. Included features are ticks, not things to buy. */
  var ICONS = {
    notes: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    reviews: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
    fee: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    shape: '<path d="M4 20l9-9M14 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1zM19 13l.6 1.4L21 15l-1.4.6L19 17l-.6-1.4L17 15l1.4-.6z"/>',
    bp: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M3.5 9h17M7 6.8h.01M9.5 6.8h.01M12 12v5M9.5 14.5h5"/>',
    care: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/>'
  };
  function ccpBuy(){
    return '<span class="pr"><b>From $3</b> per household a month</span><a class="hb-btn" href="build.html">Build yours</a>' +
      '<button type="button" class="hb-link" data-open-i="' + pIndex('cc') + '">Learn more</button>';
  }
  (function(){
    var cc = PRODUCTS[pIndex('cc')];
    var feats = ['notes', 'reviews'].map(function(k){ var x = PRODUCTS[pIndex(k)]; return { i: pIndex(k), name: x.name, head: x.head, kc: x.kc, icon: ICONS[k] }; })
      .concat([{ i: pIndex('care'), name: 'Care', head: 'Support, updates and your Bunya Portal.', kc: '#5EEAD4', icon: ICONS.care },
              { i: pIndex('shape'), name: 'Bunya Shape', head: 'Change it yourself, in plain English.', kc: '#F0ABFC', icon: ICONS.shape }]);
    $('ccp').setAttribute('style', style(cc));
    $('ccp').innerHTML =
      '<div class="txt"><span class="k">Command Centre · what every firm gets</span><h3>' + cc.head + '</h3><p>' + cc.one + '</p>' +
      '<ul class="feats">' + feats.map(function(f){
        return '<li' + (f.wide ? ' class="wide"' : '') + '><button type="button" data-open-i="' + f.i + '" style="--kc:' + f.kc + '"><i><svg viewBox="0 0 24 24" aria-hidden="true">' + f.icon + '</svg></i><span><b>' + f.name + '</b><small>' + f.head + '</small></span><em>' + TICK + 'Included</em></button></li>';
      }).join('') + '</ul>' +
      '<div class="buy" id="ccp-buy">' + ccpBuy() + '</div></div>' +
      '<div class="vis"><div class="sc"><img src="' + (cc.img.indexOf('/') > -1 ? '' : IMG) + cc.img + '" alt="Command Centre home screen (illustrative)" loading="lazy"></div></div>';
  })();
  $('rail-add').innerHTML = PRODUCTS.map(function(p, i){ return p.k === 'App' ? cardHTML(p, i) : ''; }).join('');
  if ($('feats-home')) $('feats-home').innerHTML = FEATS.map(function(f){
      return '<div class="hb-ftw"><a class="hb-ft" href="' + ((window.BUNYA_FEATURE_PAGES || {})[f.k] || 'advice-engine.html#' + f.k) + '"><span class="n">' + f.name + (f.tag ? ' <em>' + f.tag + '</em>' : '') + (f.rec ? ' <i class="pick">' + f.rec + '</i>' : '') + '</span>' +
        '<span class="t">' + f.text.split('. ')[0].replace(/\.$/, '') + '.</span><span class="p">+' + f.p + ' <small>a household a month</small></span></a>' + tk('feat', f.k, f.name) + '</div>';
    }).join('') +
    '<div class="hb-ftall"><i class="pick">Best value</i><b>Or take the whole Advice Engine for $2 a household.</b><p>Every feature, plus Client Portal and the Brand Document Pack, included.</p>' +
    '<span class="hb-btns"><button type="button" class="hb-btn sm hb-tkb" data-tk="ae:" data-name="the whole Advice Engine" data-off="Add it to your Bunya" data-on="In your Bunya" aria-pressed="false">' + PLUS + TICK + '<span class="tx">Add it to your Bunya</span></button><a class="hb-link" href="advice-engine.html">See every feature</a></span></div>';
  syncTicks();
  if ($('pilot')) $('pilot').innerHTML = PRODUCTS.filter(function(p){ return p.k === 'Pilot'; }).map(function(p){ /* none since 10 Nov */
    return '<span class="k">In pilot</span><button type="button" data-open-i="' + pIndex(p.key) + '"><b>' + p.name + '</b> ' + p.head + '</button>'; }).join('');
  var rail = document;
  [].forEach.call(document.querySelectorAll('.hb-rail'), function(r){
    var bs = document.querySelectorAll('[data-rail="' + r.id + '"]');
    function arrows(){ [].forEach.call(bs, function(b){ b.disabled = +b.dataset.dir < 0 ? r.scrollLeft < 4 : r.scrollLeft + r.clientWidth >= r.scrollWidth - 4; }); }
    [].forEach.call(bs, function(b){ b.addEventListener('click', function(){ var w = r.querySelector('.hb-card').getBoundingClientRect().width + 20; r.scrollBy({ left: +b.dataset.dir * w * 2, behavior: reduce ? 'auto' : 'smooth' }); }); });
    r.addEventListener('scroll', function(){ requestAnimationFrame(arrows); }, { passive: true });
    addEventListener('resize', arrows); arrows();
  });

  /* Product sheet */
  var sheet = $('sheet'), panel = sheet.querySelector('.hb-panel'), body = $('sheet-body'), cur = 0, last = null;
  function paint(i){
    cur = (i + PRODUCTS.length) % PRODUCTS.length;
    var p = PRODUCTS[cur], pv = PRODUCTS[(cur - 1 + PRODUCTS.length) % PRODUCTS.length], nx = PRODUCTS[(cur + 1) % PRODUCTS.length];
    panel.setAttribute('style', style(p));
    body.innerHTML =
      '<div class="hb-stick" id="stick"><span><b>' + p.name + '</b><small>' + p.price + ' ' + p.per.split(',')[0] + '</small></span><span class="hb-btns" id="stick-buy">' + buyHTML(p, true) + '</span></div>' +
      '<div class="hb-ph"><span class="k">' + (p.soon ? 'Coming soon' : p.k) + ' · ' + p.name + '</span><h2 id="sheet-h">' + p.head + '</h2><p class="one">' + p.one + '</p>' +
        ((window.BUNYA_PAGES || {})[p.key] ? '<a class="hb-full" href="' + window.BUNYA_PAGES[p.key] + '">See the full ' + p.name + ' page</a>' : '') + '</div>' +
      '<div class="hb-pvis">' + visual(p, true) + '</div>' +
      (DETAIL[p.key] ? detailHTML(p) : '<div class="hb-points">' + p.points.map(function(t, n){ return '<div class="hb-point"><span class="n">' + (n + 1) + '</span><p>' + t + '</p></div>'; }).join('') + '</div>') +
      '<div class="hb-incl"><b>What’s included</b><div>' + p.incl.map(function(t){ return '<span>' + t + '</span>'; }).join('') + '</div></div>' +
      '<div class="hb-buy" id="buy">' + buyHTML(p) + '</div>' +
      '<div class="hb-pnav"><button type="button" data-go="-1"><span>Previous</span><b>‹ ' + pv.name + '</b></button><button type="button" data-go="1"><span>Next</span><b>' + nx.name + ' ›</b></button></div>';
    sheet.scrollTop = 0;
    syncTicks();
  }
  function pIndex(key){ return PRODUCTS.map(function(x){ return x.key; }).indexOf(key); }
  function pairHTML(p){
    var list = (PAIRS[p.key] || []).map(function(k){ return PRODUCTS[pIndex(k)]; });
    return '<b>Goes well with</b><div class="row">' + list.map(function(x){
      return '<div class="mini" style="' + style(x) + '"><button type="button" class="nm" data-goto="' + pIndex(x.key) + '"><span>' + x.name + '</span><small>' + x.head + '</small></button>' +
        '<span class="pp">' + x.price + ' <em>' + x.per.split(',')[0] + '</em></span></div>';
    }).join('') + '</div>';
  }
  // 9 Nov: no cart on the site. Building and buying happen in Build your Bunya; build.html hands over with this product chosen.
  function buyHTML(p, compact){
    var talk = p.key === 'vault', href = talk ? 'booking.html' : p.build || 'build.html';
    var kind = p.key === 'soa' ? 'ae' : p.k === 'App' && !talk ? 'add' : '';
    var btns = (kind ? '<button type="button" class="hb-btn sm ghost hb-tkb" data-tk="' + kind + ':' + (kind === 'add' ? p.key : '') + '" data-name="' + (kind === 'ae' ? 'the whole Advice Engine' : p.name) + '" data-off="Add to your Bunya" data-on="In your Bunya" aria-pressed="false">' + PLUS + TICK + '<span class="tx">Add to your Bunya</span></button>' : '') +
      '<a class="hb-btn sm" href="' + href + '">' + (talk ? 'Talk to us' : 'Build yours') + '</a>';
    if (compact) return btns;
    return '<span class="pr"><b>' + p.price + '</b>' + p.per + '</span><span class="hb-btns" style="justify-content:flex-end">' + btns + '</span>';
  }
  sheet.addEventListener('scroll', function(){ var st = $('stick'); if (st) st.classList.toggle('on', sheet.scrollTop > 420); }, { passive: true });
  function open(i, from){
    last = from || document.activeElement; paint(i);
    sheet.classList.add('on'); sheet.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    setTimeout(function(){ $('sheet-x').focus(); }, 50);
  }
  window.bunyaOpenProduct = function(k){ var i = pIndex(k); if (i > -1) open(i); };
  if (/^#p=/.test(location.hash)) setTimeout(function(){ window.bunyaOpenProduct(location.hash.slice(3)); }, 350);
  addEventListener('hashchange', function(){ if (/^#p=/.test(location.hash)) window.bunyaOpenProduct(location.hash.slice(3)); });
  function close(){
    sheet.classList.remove('on'); sheet.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    if (last) last.focus();
  }
  document.addEventListener('click', function(e){ var k = e.target.closest('[data-tk]'); if (k && window.bunyaList) { e.preventDefault(); var kp = k.dataset.tk.split(':'); window.bunyaList.toggle(kp[0], kp[1]); return; }
    var c = e.target.closest('.hb-card'); if (c) open(+c.dataset.i, c); var o = e.target.closest('[data-open-i]'); if (o) open(+o.dataset.openI, o); });
  $('sheet-x').addEventListener('click', close);
  sheet.addEventListener('click', function(e){
    if (e.target === sheet) close();
    var g = e.target.closest('[data-go]'); if (g) paint(cur + (+g.dataset.go));
    var gt = e.target.closest('[data-goto]'); if (gt) paint(+gt.dataset.goto);
    var sh = e.target.closest('[data-shot]'); if (sh) showShot(sh);
  });
  function money(v){ return '$' + Math.round(v).toLocaleString('en-AU'); }
  function refresh(){
    if (sheet.classList.contains('on')) { $('buy').innerHTML = buyHTML(PRODUCTS[cur]); $('stick-buy').innerHTML = buyHTML(PRODUCTS[cur], true); }
    $('ccp-buy').innerHTML = ccpBuy();
    syncTicks();
  }
  document.addEventListener('bunya:build', refresh);
  document.addEventListener('keydown', function(e){
    if (!sheet.classList.contains('on')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') paint(cur + 1);
    if (e.key === 'ArrowLeft') paint(cur - 1);
  });
  [].forEach.call(document.querySelectorAll('[data-open]'), function(a){
    a.addEventListener('click', function(e){ e.preventDefault(); open(PRODUCTS.map(function(p){ return p.key; }).indexOf(a.dataset.open), a); });
  });

  /* Reveal */
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .15 });
  [].forEach.call(document.querySelectorAll('.hb-rv'), function(el){ io.observe(el); });

  /* Hero floats arrive one after another */
  [].forEach.call(document.querySelectorAll('.hb-float'), function(f, i){ setTimeout(function(){ f.classList.add('in'); }, 900 + i * 450); });

  /* Scroll-driven bits: hero tilt, build assembly, words lighting up */
  var screen = $('screen'), build = $('build'), layers = [].slice.call(document.querySelectorAll('.hb-layer')),
      steps = [].slice.call(document.querySelectorAll('.hb-steps li')), tot = $('tot'), words = [], ticking = false;
  var read = $('read');
  read.innerHTML = read.textContent.trim().split(/\s+/).map(function(w){ return '<span' + (/^\*/.test(w) ? ' class="hl-w"' : '') + '>' + w.replace(/^\*/, '') + '</span>'; }).join(' ');
  words = [].slice.call(read.querySelectorAll('span'));
  var TOTALS = ['$2,640', '$4,400', '$5,190', '$5,480'];
  function frame(){
    ticking = false;
    var vh = innerHeight;
    if (screen && !reduce) {
      var r = screen.getBoundingClientRect(), p = Math.min(1, Math.max(0, (vh - r.top) / (vh * .85)));
      screen.style.setProperty('--hb-rx', (24 * (1 - p)).toFixed(2) + 'deg');
      screen.style.setProperty('--hb-sc', (0.88 + 0.12 * p).toFixed(4));
    }
    if (build && innerWidth > 960) {
      var b = build.getBoundingClientRect(), q = Math.min(.999, Math.max(0, -b.top / (b.height - vh))), n = Math.floor(q * 4);
      layers.forEach(function(l, i){ l.classList.toggle('on', i <= n); });
      steps.forEach(function(s, i){ s.classList.toggle('on', i <= n); });
      tot.textContent = TOTALS[n];
    }
    if (words.length) {
      var rr = read.getBoundingClientRect(), t = Math.min(1, Math.max(0, (vh * .8 - rr.top) / (rr.height + vh * .3))), lit = Math.round(t * words.length);
      words.forEach(function(w, i){ w.classList.toggle('lit', i < lit); w.classList.toggle('hl', w.classList.contains('hl-w')); });
    }
  }
  function onScroll(){ if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  if (innerWidth <= 960 && tot) { layers.forEach(function(l){ l.classList.add('on'); }); steps.forEach(function(s){ s.classList.add('on'); }); tot.textContent = TOTALS[3]; }
  frame();
  refresh();
})();
