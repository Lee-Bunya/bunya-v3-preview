/* Bunya Vault (bunya-vault.html), Dana 20 Nov 2026. Runs after js/dana-feature.js. Styling: css/dana-vt.css
   (+ the app frame, rows, pills and toast from css/dana-rp.css). The top film, rebuilt large so it fills its card:
   the team vault, the LinkedIn page login revealed and copied (it hides itself again, and the view is logged),
   then a new Newsletter login saved to Azure Key Vault. */
(function () {
  'use strict';
  var shot = document.querySelector('.dx-dev-feat');
  if (!shot) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vid = shot.querySelector('video');
  if (vid) { vid.pause(); vid.removeAttribute('src'); vid.load(); vid.classList.add('vt-hidden'); }
  function svg(p) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; }
  var KEY = '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3M14 9l2 2"/>', LOCK = '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    GLOBE = '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17"/>', CHAT = '<path d="M4 5h16v11H8l-4 4z"/>',
    COPY = '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>', EYE = '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    TICK = '<path d="M6 12.5l4 4 8-9"/>', PLUS = '<path d="M12 5v14M5 12h14"/>';
  var NAV = ['<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/>', LOCK,
    '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', '<path d="M4 20V10M10 20V4M16 20v-7"/>'];
  /* [group, name, type, tag, icon] */
  var ROWS = [['Marketing', 'LinkedIn page', 'Social login', 'Broadcast HQ', CHAT, 'li'], ['Marketing', 'Facebook page', 'Social login', 'Broadcast HQ', CHAT],
    ['Marketing', 'Newsletter login', 'Website login', 'New', GLOBE, 'nl'], ['Marketing', 'Website admin', 'Website login', '', GLOBE],
    ['Platforms and insurers', 'Platform A · adviser portal', 'Website login', 'Expires in 21 days', KEY, 'exp'], ['Platforms and insurers', 'Insurer A · adviser portal', 'Website login', '', KEY]];
  var grp = '', list = '';
  ROWS.forEach(function (r) {
    if (r[0] !== grp) { grp = r[0]; list += '<span class="vt-g">' + grp + '</span>'; }
    list += '<div class="rf-row vt-row' + (r[5] ? ' vt-r-' + r[5] : '') + '"><span class="vt-ic">' + svg(r[4]) + '</span><span class="rf-nm"><b>' + r[1] + '</b><small>•••••••••••••</small></span>' +
      '<span class="vt-type">' + r[2] + '</span><span class="vt-tag' + (r[3] === 'Expires in 21 days' ? ' w' : r[3] === 'New' ? ' n' : '') + '">' + r[3] + '</span><span class="vt-view">' + svg(EYE) + 'View</span></div>';
  });
  var scene = document.createElement('div');
  scene.className = 'vt-scene';
  scene.setAttribute('role', 'img');
  scene.setAttribute('aria-label', 'Illustrative: the firm’s team vault of shared logins. The LinkedIn page login is revealed and copied, hides itself again, and the view is logged. Then a new newsletter login is added and saved to Azure Key Vault in the firm’s own tenant.');
  scene.innerHTML =
    '<div class="rf-app" aria-hidden="true"><nav class="rf-nav"><span class="rf-logo"></span>' + NAV.map(function (p, k) { return '<i class="' + (k === 2 ? 'on' : '') + '"><svg viewBox="0 0 24 24">' + p + '</svg></i>'; }).join('') + '<span class="rf-me">AR</span></nav>' +
    '<div class="rf-main"><div class="vt-head"><span><span class="rf-crumb">Bunya Vault · Your practice</span><h4>Team vault</h4><span class="rf-sub">Logins, app credentials and keys in one place</span></span>' +
      '<span class="vt-add" data-add>' + svg(PLUS) + '<span>Add credential</span></span></div>' +
    '<div class="vt-grid"><div class="vt-left"><div class="vt-stats"><div class="rf-card vt-st"><b data-n>14</b><small>Credentials</small></div><div class="rf-card vt-st"><b>3</b><small>Used by Broadcast HQ</small></div><div class="rf-card vt-st w"><b>1</b><small>Expiring within 30 days</small></div></div>' +
      '<div class="rf-card vt-list">' + list + '</div></div>' +
    '<div class="vt-side"><div class="rf-card vt-det"><div class="vt-dh"><span class="vt-ic">' + svg(CHAT) + '</span><span><b>LinkedIn page</b><small>Social login · used by Broadcast HQ</small></span></div>' +
        '<small class="vt-lab">Login</small><div class="vt-field">marketing@yourpractice.com.au</div>' +
        '<small class="vt-lab">Password <em data-cd></em></small><div class="vt-field vt-pw"><span data-pw>••••••••••••••••••••</span></div>' +
        '<div class="vt-btns"><span class="vt-rev" data-rev>' + svg(EYE) + '<span>Reveal</span></span><span class="vt-copy" data-copy>' + svg(COPY) + '<span>Copy</span></span></div>' +
        '<p class="vt-note">Hidden until someone reveals it, and clears after 60 seconds.</p></div>' +
      '<div class="rf-card vt-log"><div class="rf-ch"><b>Access log</b><small>Everyone signs in as themselves</small></div>' +
        '<div class="vt-li vt-new"><span class="rf-av c3">AR</span><span><b>Alex Reid revealed the value</b><small>just now</small></span></div>' +
        '<div class="vt-li"><span class="rf-av c1">JS</span><span><b>Jess Stone copied the value</b><small>Mon 9:14</small></span></div>' +
        '<div class="vt-li"><span class="rf-av c5">SO</span><span><b>Sam Ortiz viewed the details</b><small>Fri 16:02</small></span></div></div></div></div></div></div>' +
    '<div class="rf-toast vt-toast" aria-hidden="true"><span class="rf-ol">' + svg(LOCK) + '</span><span><small>Bunya Vault · now</small><b>Newsletter login saved to Azure Key Vault</b></span></div>' +
    '<button type="button" class="rf-pause" aria-label="Pause the animation"><span class="ps">❚❚</span><span class="pl">▶</span></button>';
  shot.appendChild(scene);
  shot.classList.add('rf-on');
  var lab = shot.querySelector('[data-bar]'); if (lab) lab.textContent = 'Bunya Vault · Team vault';
  var note = shot.nextElementSibling; if (note && note.classList.contains('dx-illus')) note.lastChild.textContent = 'Illustrative screen · example data';

  function q(s) { return scene.querySelector(s); }
  var cd = null, left = 60;
  var st = -1, tm = null, playing = !reduce, vis = false;
  /* 0 the vault · 1 LinkedIn opened · 2 revealed, counting down · 3 copied, logged · 4 hidden again · 5 new login added · 6 saved */
  function paint(s) {
    st = s; scene.dataset.s = s;
    clearInterval(cd);
    var shown = s === 2 || s === 3;
    q('[data-pw]').textContent = shown ? 'tK7-vQ2m-Zr9x-LwA4-hNc8' : '••••••••••••••••••••';
    q('[data-rev] span').textContent = shown ? 'Hide' : 'Reveal';
    q('[data-copy] span').textContent = s === 3 ? 'Copied' : 'Copy';
    if (shown && !reduce) { if (s === 2) left = 60; q('[data-cd]').textContent = '· clears in ' + left + 's'; cd = setInterval(function () { left = Math.max(0, left - 1); q('[data-cd]').textContent = '· clears in ' + left + 's'; }, 1000); }
    else q('[data-cd]').textContent = s >= 4 && s < 5 ? '· hidden again' : '';
    q('[data-n]').textContent = s >= 5 ? '15' : '14';
  }
  function tick() { clearTimeout(tm); if (!playing || !vis) return; paint(st >= 6 ? 0 : st + 1); tm = setTimeout(tick, st === 6 ? 4000 : st === 2 ? 2400 : st === 0 ? 1600 : 1700); }
  var pb = q('.rf-pause');
  pb.addEventListener('click', function () { playing = !playing; scene.classList.toggle('paused', !playing); pb.setAttribute('aria-label', playing ? 'Pause the animation' : 'Play the animation'); if (playing) tick(); else { clearTimeout(tm); clearInterval(cd); } });
  if (reduce) { paint(6); scene.classList.add('paused'); }
  else {
    paint(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) tm = setTimeout(tick, 1200); else { clearTimeout(tm); clearInterval(cd); } }, { threshold: .3 }).observe(scene);
    else { vis = true; tick(); }
  }
})();


/* Up close, all three tabs live, with colour (Dana, 20 Nov 2026): Lee's grey screenshots of the credential vault,
   a revealed credential and the add form become live screens with a deep-teal sidebar, coloured tiles and tinted
   chips. Same content and names as Lee's screens. Each is drawn at 1280 x 720 and scaled to the frame. */
(function () {
  'use strict';
  var sc = document.querySelector('#close .hb-view .sc');
  if (!sc) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function svg(p) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; }
  var I = {
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3M14 9l2 2"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17"/>',
    chat: '<path d="M4 5h16v11H8l-4 4z"/>', shield: '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/>',
    shieldok: '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z"/><path d="M9 12l2 2 4-4"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>', tick: '<path d="M6 12.5l4 4 8-9"/>', plus: '<path d="M12 5v14M5 12h14"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    pen: '<path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.6-3.6 3.4-5.5 7-5.5s6.4 1.9 7 5.5"/>', ppl: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19c.5-3.2 2.9-5 6-5s5.5 1.8 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14c2.5.2 4 1.8 4.5 4.5"/>',
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M4 7l8 6 8-6"/>', arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function side() {
    return '<aside class="vq-side"><div class="vq-brand"><span>' + svg(I.lock) + '</span><b>Bunya Vault</b></div><span class="vq-team"><i></i>Team credentials</span>' +
      '<p>Your team’s credentials, organised by client and supplier.</p><small>Workspace</small><span class="vq-nav on">All credentials</span><span class="vq-nav">Broadcast HQ</span><span class="vq-nav">Client Portal</span>' +
      '<div class="vq-trust"><span>' + svg(I.tick) + 'Azure Key Vault storage</span><span>' + svg(I.tick) + 'Your Microsoft identity</span></div></aside>';
  }
  function top(crumb, title, sub, right) {
    return '<div class="vq-top"><span><small>' + crumb + '</small><b>' + title + '</b><span>' + sub + '</span></span>' + (right || '') + '</div>';
  }

  /* 1. the vault */
  var G = [
    ['Practice website', 2, 'Supplier', 't', 'globe', [['Website admin', 'Website login', 't', 'Marketing', 'g', ''], ['Enquiry form API key', 'API key', 'v', 'Client Portal', 'p', 'Expires 3 Dec']]],
    ['Social media', 2, 'Firm accounts', 'v', 'chat', [['LinkedIn company page', 'Social media login', 's', 'Broadcast HQ', 'b', ''], ['Facebook page', 'Social media login', 's', 'Broadcast HQ', 'b', 'Expires 14 Dec']]],
    ['Insurer adviser portal', 1, 'Supplier', 'd', 'shield', [['Adviser login', 'Website login', 't', 'Advice team', 'd', '']]]
  ];
  var n = 0, body = G.map(function (g) {
    return '<div class="vq-gh"><span class="vq-gi vq-' + g[3] + '">' + svg(I[g[4]]) + '</span><b>' + g[0] + '</b><span class="vq-cnt">' + g[1] + '</span><small>' + g[2] + '</small></div>' +
      g[5].map(function (r) {
        return '<div class="vq-row" style="--d:' + (n++ * .08) + 's"><span class="vq-nm"><b>' + r[0] + '</b><small>••••••••••</small></span><span><i class="vq-chip vq-c' + r[2] + '">' + r[1] + '</i></span>' +
          '<span class="vq-used"><i class="vq-dot vq-' + r[4] + '"></i>' + r[3] + '</span><span>' + (r[5] ? '<i class="vq-exp">' + svg(I.clock) + r[5] + '</i>' : '<span class="vq-none">No expiry</span>') + '</span><span class="vq-view">View</span></div>';
      }).join('');
  }).join('');
  var vault = top('Your firm · Credentials', 'Credential vault', 'Logins, app credentials and keys. One place to find what you need.', '<span class="vq-add">' + svg(I.plus) + 'Add credential</span>') +
    '<div class="vq-stats"><div class="vq-st"><span class="vq-si vq-t">' + svg(I.key) + '</span><span><small>Credentials</small><b>24</b></span></div>' +
      '<div class="vq-st"><span class="vq-si vq-v">' + svg(I.link) + '</span><span><small>Linked accounts</small><b>8</b></span></div>' +
      '<div class="vq-st w"><span class="vq-si vq-r">' + svg(I.clock) + '</span><span><small>Expiring within 30 days</small><b>2</b></span></div></div>' +
    '<div class="vq-filter"><span class="vq-search">' + svg(I.search) + 'Search credentials</span><span class="vq-dd">All accounts ▾</span><span class="vq-dd">All credential types ▾</span></div>' +
    '<div class="vq-tbl"><div class="vq-th"><span>Credential</span><span>Type</span><span>Used by</span><span>Expiry</span><span></span></div>' + body + '</div>';

  /* 2. reveal */
  var LOG = [['eye', 't', 'Alex Reid revealed the value', 'Just now'], ['copy', 'v', 'Jess Stone copied the value', 'Mon 9:14'], ['search', 's', 'Sam Ortiz viewed the details', 'Fri 16:02'],
    ['pen', 'r', 'Jess Stone updated the expiry', '2 Nov'], ['plus', 'd', 'Alex Reid added the credential', '12 Oct']];
  var reveal = top('Your firm · Credentials · Social media', 'Facebook page', 'Social media login · used by Broadcast HQ') +
    '<div class="vr-grid"><div class="vr-l"><div class="vr-val"><div class="vr-vh"><b>Value</b><span class="vr-cd"><i></i>Clears in <span data-cd>0:42</span></span></div>' +
        '<div class="vr-secret"><span class="vr-pw">k7#Qm2-vT9x!Lr4</span><span class="vr-b on">' + svg(I.copy) + 'Copy</span><span class="vr-b">' + svg(I.eye) + 'Hide</span></div>' +
        '<p>Hidden until someone reveals it, and cleared again after 60 seconds.</p><span class="vr-bar"><i></i></span></div>' +
      '<div class="vr-det">' + [['v', 'chat', 'Account', 'Social media'], ['b', 'link', 'Used by', '<i class="vq-dot vq-b"></i>Broadcast HQ'], ['t', 'user', 'Username', 'marketing@yourfirm.com.au'],
        ['r', 'clock', 'Expiry', '<i class="vq-exp">14 Dec · 33 days</i>'], ['d', 'shield', 'Stored in', 'Azure Key Vault, your tenant']].map(function (d) {
          return '<div class="vr-dr"><span class="vq-gi vq-' + d[0] + '">' + svg(I[d[1]]) + '</span><span>' + d[2] + '</span><b>' + d[3] + '</b></div>';
        }).join('') + '</div></div>' +
    '<div class="vr-log"><div class="vr-lh"><span class="vq-si vq-t">' + svg(I.shieldok) + '</span><span><b>Access log</b><small>Everyone signs in as themselves</small></span></div>' +
      LOG.map(function (l, k) { return '<div class="vr-li" style="--d:' + (k * .1) + 's"><span class="vr-li-i vq-' + l[1] + '">' + svg(I[l[0]]) + '</span><span><b>' + l[2] + '</b><small>' + l[3] + '</small></span></div>'; }).join('') + '</div></div>';

  /* 3. add */
  var add = top('Your firm · Credentials', 'Add a credential', 'Linked to the client or supplier it belongs to.') +
    '<div class="va-grid"><div class="va-form">' +
      '<label class="va-f w"><small>Name</small><span>Research platform login</span></label>' +
      '<label class="va-f"><small>Type</small><span><i class="vq-chip vq-ct">' + svg(I.globe) + 'Website login</i>▾</span></label>' +
      '<label class="va-f"><small>Account</small><span><i class="vq-chip vq-cv">' + svg(I.key) + 'Research provider</i>▾</span></label>' +
      '<label class="va-f"><small>Used by</small><span><span class="va-u"><i class="vq-dot vq-d"></i>Advice team</span>▾</span></label>' +
      '<label class="va-f"><small>Expiry</small><span><span class="va-u">' + svg(I.clock) + '30 Jun 2027</span></span></label>' +
      '<label class="va-f w"><small>Username</small><span><span class="va-u">' + svg(I.mail) + 'advice@yourfirm.com.au</span></span></label>' +
      '<label class="va-f w va-sec"><small>Secret value</small><span><span class="va-dots" data-dots></span><i class="va-caret"></i></span></label>' +
      '<div class="va-btns"><span class="va-save">Save to vault<i>' + svg(I.arrow) + '</i></span><span class="va-cancel">Cancel</span></div></div>' +
    '<div class="va-side"><div class="va-where"><span class="va-big">' + svg(I.shieldok) + '</span><b>Where the secret goes</b><p>The value is stored only in Azure Key Vault, in your firm’s own Azure tenant. It never sits in your CRM.</p></div>' +
      '<div class="va-facts">' + [['v', 'ppl', 'Who can open it', 'People your firm gives access'], ['t', 'eye', 'Every view', 'Logged, by name'], ['r', 'lock', 'On screen', 'Hidden until revealed']].map(function (f) {
        return '<div class="va-fr"><span class="vq-gi vq-' + f[0] + '">' + svg(I[f[1]]) + '</span><span>' + f[2] + '</span><b>' + f[3] + '</b></div>';
      }).join('') + '</div></div></div>';

  var live = document.createElement('div');
  live.className = 'vq-live';
  live.setAttribute('role', 'img');
  live.setAttribute('aria-label', 'Illustrative Bunya Vault screens: the credential vault grouped by client and supplier, a revealed credential with its access log, and the form to add a credential, which is stored in Azure Key Vault in the firm’s own tenant.');
  live.innerHTML = [vault, reveal, add].map(function (m, k) { return '<div class="vq-stage" data-tab="' + k + '" aria-hidden="true">' + side() + '<main class="vq-main">' + m + '</main></div>'; }).join('');
  sc.appendChild(live);
  sc.classList.add('vq-on');
  function fit() { var w = sc.clientWidth; if (w) live.style.setProperty('--k', w / 1280); }
  fit();
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(sc); else addEventListener('resize', fit);

  var cdEl = live.querySelector('[data-cd]'), dots = live.querySelector('[data-dots]'), t1 = null, t2 = null;
  function play(tab) {
    clearInterval(t1); clearInterval(t2);
    live.classList.remove('go'); void live.offsetWidth; live.classList.add('go');
    if (reduce) { cdEl.textContent = '0:42'; dots.textContent = '••••••••••••••'; return; }
    if (tab === 1) { var s = 42; cdEl.textContent = '0:42'; t1 = setInterval(function () { s = s <= 1 ? 60 : s - 1; cdEl.textContent = '0:' + ('0' + s).slice(-2); }, 1000); }
    if (tab === 2) { var d = 0; dots.textContent = ''; t2 = setInterval(function () { d = d >= 14 ? 0 : d + 1; dots.textContent = new Array(d + 1).join('•'); live.classList.toggle('va-done', d >= 14); }, 220); }
  }
  function sync() {
    var sel = document.querySelector('#close [data-shot][aria-selected="true"]');
    var tab = sel ? +sel.dataset.shot : 0;
    live.dataset.t = tab; fit(); play(tab);
  }
  [].forEach.call(document.querySelectorAll('#close [data-shot]'), function (b) { b.addEventListener('click', function () { setTimeout(sync, 0); }); });
  live.dataset.t = 0;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { if (es[0].isIntersecting) sync(); else { clearInterval(t1); clearInterval(t2); } }, { threshold: .3 }).observe(sc);
  else sync();
})();
