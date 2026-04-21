(function () {
  'use strict';

  var COOKIE_NAME = 'tm_cookie_consent';
  var COOKIE_DAYS = 182;
  var GA4_ID      = 'G-XT1ZZ4H9N5';
  var ADSENSE_ID  = 'ca-pub-1186627650857489';

  function gtag() { (window.dataLayer = window.dataLayer || []).push(arguments); }

  function setCookie(val, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 864e5);
    document.cookie = COOKIE_NAME + '=' + encodeURIComponent(JSON.stringify(val))
      + '; expires=' + d.toUTCString()
      + '; path=/; SameSite=Lax';
  }

  function getCookie() {
    var m = document.cookie.match('(?:^|; )' + COOKIE_NAME + '=([^;]*)');
    if (!m) return null;
    try { return JSON.parse(decodeURIComponent(m[1])); } catch (e) { return null; }
  }

  function loadGA4() {
    if (document.getElementById('tm-ga4-script')) return;
    var s = document.createElement('script');
    s.id = 'tm-ga4-script';
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA4_ID);
  }

  function loadAdSense() {
    if (document.getElementById('tm-adsense-script')) return;
    var s = document.createElement('script');
    s.id = 'tm-adsense-script';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_ID;
    s.async = true;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }

  function applyConsent(prefs) {
    var av = prefs.analytics   ? 'granted' : 'denied';
    var dv = prefs.advertising ? 'granted' : 'denied';
    gtag('consent', 'update', {
      analytics_storage:  av,
      ad_storage:         dv,
      ad_user_data:       dv,
      ad_personalization: dv
    });
    if (prefs.analytics)   loadGA4();
    if (prefs.advertising) loadAdSense();
  }

  var overlay, panel, btnAccept, btnNecessary, btnConfigure, btnSave;
  var chkAnalytics, chkAdvertising, trigger;

  function show() {
    overlay.classList.add('tm-show');
    trigger.hidden = true;
    document.body.style.overflow = 'hidden';
    btnAccept.focus();
  }

  function hide() {
    overlay.classList.remove('tm-show');
    trigger.hidden = false;
    document.body.style.overflow = '';
  }

  function saveAndClose(prefs) {
    setCookie(prefs, COOKIE_DAYS);
    applyConsent(prefs);
    hide();
  }

  function init() {
    overlay        = document.getElementById('tm-cookie-overlay');
    panel          = document.getElementById('tm-cookie-panel');
    btnAccept      = document.getElementById('tm-btn-accept');
    btnNecessary   = document.getElementById('tm-btn-necessary');
    btnConfigure   = document.getElementById('tm-btn-configure');
    btnSave        = document.getElementById('tm-btn-save');
    trigger        = document.getElementById('tm-cookie-trigger');
    chkAnalytics   = document.getElementById('tm-chk-analytics');
    chkAdvertising = document.getElementById('tm-chk-advertising');

    if (!overlay) return;

    btnAccept.addEventListener('click', function () {
      saveAndClose({ analytics: true, advertising: true });
    });
    btnNecessary.addEventListener('click', function () {
      saveAndClose({ analytics: false, advertising: false });
    });
    btnConfigure.addEventListener('click', function () {
      panel.hidden = false;
      btnConfigure.hidden = true;
      btnSave.hidden = false;
    });
    btnSave.addEventListener('click', function () {
      saveAndClose({ analytics: chkAnalytics.checked, advertising: chkAdvertising.checked });
    });
    trigger.addEventListener('click', show);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('tm-show') && getCookie()) hide();
    });

    var existing = getCookie();
    if (existing && typeof existing.analytics !== 'undefined') {
      applyConsent(existing);
    }
    trigger.hidden = false;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.tmConsent = {
    open: function () { if (overlay) show(); },
    revoke: function () {
      document.cookie = COOKIE_NAME + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      gtag('consent', 'update', {
        analytics_storage: 'denied', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied'
      });
      if (overlay) show();
    }
  };
})();
