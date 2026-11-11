/* See Bunya in your brand (11 Nov 2026). Build your Bunya, step 5: the visitor types their website and the left screen
   (Daniel's Command Centre screens, build-daniel.html?stage=1) finds their logo and colours and redraws in their brand.
   The lookup runs in that screen: our own /api/brand on bunya.ai, Microlink's free API elsewhere. This box keeps the
   website (sessionStorage 'bunya.site'), says how the lookup went, and hands the firm's name to the quote form. */
(function(){
  'use strict';
  var $ = function(id){ return document.getElementById(id); };
  var form = $('byo-brand'); if (!form) return;
  var site = '', wide = matchMedia('(min-width:1001px)');
  function esc(t){ return String(t).replace(/[&<>"]/g, function(ch){ return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); }
  function cleanSite(v){ return String(v || '').toLowerCase().replace(/^\s*(https?:)?\/\//, '').replace(/^www\./, '').split(/[\/?#\s]/)[0].replace(/[^a-z0-9.-]/g, '').slice(0, 60); }
  function nameOf(s){ return s.split('.')[0].split('-').map(function(w){ return w.charAt(0).toUpperCase() + w.slice(1); }).join(' '); }
  function note(h){ $('byo-brand-note').innerHTML = h; }
  function tell(){ document.dispatchEvent(new CustomEvent('bunya:brand')); }
  function poll(){
    var asked = site, t0 = Date.now();
    (function tick(){
      if (asked !== site) return;
      var k = null;
      try { k = $('byo-stage').contentWindow.bbStage.kit(); } catch (e) {}
      if (k && k.state === 'found') {
        window.byoBrand.found = true; if (k.name) window.byoBrand.firm = k.name.replace(/\s*[|–-].*$/, '');
        note('Found your logo and colours on ' + esc(site) + '. ' + (wide.matches ? 'Bunya is now in your brand on the left.' : 'Scroll up to see Bunya in your brand.'));
        tell(); return;
      }
      if (k && k.state === 'failed') { note('We couldn’t read ' + esc(site) + '. We’ll set up your brand with you at kick-off.'); return; }
      if (Date.now() - t0 < 25000) setTimeout(tick, 500);
      else note('Still looking. You can carry on; we’ll set up your brand with you at kick-off if we can’t read it.');
    })();
  }
  function set(s, asked){
    site = cleanSite(s);
    try { site ? sessionStorage.setItem('bunya.site', site) : sessionStorage.removeItem('bunya.site'); } catch (e) {}
    $('byo-site').value = site;
    window.byoBrand = site ? { site: site, firm: nameOf(site), found: false } : null;
    window.byoBrandAsked = !!asked;
    note(site ? '<i class="dot"></i>Finding your logo and colours on ' + esc(site) + '…' : '');
    tell();
    if (site) poll();
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var v = cleanSite($('byo-site').value);
    if (v.indexOf('.') < 1) { note('Type your website, like yourfirm.com.au.'); $('byo-site').focus(); return; }
    set(v, true);
    (window.dataLayer = window.dataLayer || []).push({ event: 'byo_brand' });
    if (!wide.matches) $('byo-screen').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  });
  try { var saved = sessionStorage.getItem('bunya.site'); if (saved) set(saved, false); } catch (e) {}
})();
