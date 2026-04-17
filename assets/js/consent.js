/* ---------------------------------------------------------------
 * Teoría Musical — Banner de consentimiento (RGPD)
 * Trabaja con Google Consent Mode v2 configurado en el <head>.
 *
 * Estados almacenados en localStorage bajo la clave 'tm_consent':
 *   { ad_storage, ad_user_data, ad_personalization, analytics_storage }
 * Cada valor: 'granted' | 'denied'.
 * Si no hay nada guardado se muestra el banner.
 * --------------------------------------------------------------- */
(function () {
  'use strict';

  var KEY = 'tm_consent';
  var banner = document.getElementById('tm-consent');
  if (!banner) return;

  function gtag() { (window.dataLayer = window.dataLayer || []).push(arguments); }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    gtag('consent', 'update', state);
  }

  function stateFrom(accept) {
    var v = accept ? 'granted' : 'denied';
    return {
      ad_storage:         v,
      ad_user_data:       v,
      ad_personalization: v,
      analytics_storage:  v
    };
  }

  function stateFromCustom() {
    var analytics = banner.querySelector('input[name="analytics"]').checked;
    var ads       = banner.querySelector('input[name="ads"]').checked;
    return {
      analytics_storage:  analytics ? 'granted' : 'denied',
      ad_storage:         ads       ? 'granted' : 'denied',
      ad_user_data:       ads       ? 'granted' : 'denied',
      ad_personalization: ads       ? 'granted' : 'denied'
    };
  }

  function show() { banner.hidden = false; document.body.classList.add('has-consent-banner'); }
  function hide() { banner.hidden = true;  document.body.classList.remove('has-consent-banner'); }

  // Show banner only if no decision stored yet.
  if (!load()) show();

  banner.addEventListener('click', function (e) {
    var target = e.target.closest('[data-consent]');
    if (!target) return;
    var action = target.getAttribute('data-consent');

    if (action === 'accept') { save(stateFrom(true));  hide(); return; }
    if (action === 'reject') { save(stateFrom(false)); hide(); return; }
    if (action === 'customize') {
      banner.querySelector('.tm-consent-custom').hidden = false;
      return;
    }
    if (action === 'save') { save(stateFromCustom()); hide(); return; }
  });

  // Public API so the cookies-policy page can reopen the banner:
  //   window.tmConsent.open()    — vuelve a mostrarlo
  //   window.tmConsent.revoke()  — borra la decisión y lo muestra
  window.tmConsent = {
    open: show,
    revoke: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      save(stateFrom(false));
      show();
    }
  };
})();
