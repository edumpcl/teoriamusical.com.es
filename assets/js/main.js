/* Teoría Musical — main.js
   Lightweight vanilla-JS helpers: mobile nav, year, TOC placeholder builder. */

(function () {
  'use strict';

  // Idioma: <html lang="en"> = páginas inglesas
  var EN = document.documentElement.lang === 'en';

  // Current year in footer
  var yearEl = document.getElementById('tm-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector('.tm-nav-toggle');
  var nav = document.getElementById('tm-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Buscador interno: la lupa de la cabecera (es un enlace a /buscar/, así que sin JS también funciona) abre la ventana de búsqueda.
  // buscador.js y el índice solo se descargan al usarlo; BUSCADOR_V lo actualiza tools/build-search-index.js.
  var BUSCADOR_V = '28660f5d';
  function conBuscador(fn) {
    if (window.tmBuscador) return fn();
    var s = document.createElement('script');
    s.src = '/assets/js/buscador.js?v=' + BUSCADOR_V;
    s.onload = fn;
    document.head.appendChild(s);
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('[data-tm-buscar]') : null;
    if (!a || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    var pagina = document.getElementById('tmbuscar'), caja = pagina && pagina.querySelector('.tm-bq-in');
    if (caja) { caja.focus(); return; }   // en la página de resultados la lupa lleva a la caja
    conBuscador(function () { window.tmBuscador.abrir(); });
  });
  document.addEventListener('keydown', function (e) {
    var t = e.target, escribiendo = t && (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName));
    var atajo = (e.key === '/' && !escribiendo && !e.ctrlKey && !e.metaKey && !e.altKey) || ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === 'k');
    if (!atajo) return;
    if (document.getElementById('tmbuscar')) return;   // en la página de resultados el cuadro ya está a la vista
    e.preventDefault();
    conBuscador(function () { window.tmBuscador.abrir(); });
  });

  // Auto-generated TOC if a .tm-toc-placeholder exists
  var tocHolders = document.querySelectorAll('.tm-toc-placeholder');
  if (tocHolders.length) {
    var article = document.querySelector('.tm-article');
    if (article) {
      var headings = article.querySelectorAll('h2, h3');
      if (headings.length >= 3) {
        var toc = document.createElement('details');
        toc.className = 'tm-toc';
        toc.open = true;
        var summary = document.createElement('summary');
        summary.textContent = EN ? 'Table of contents' : 'Tabla de contenidos';
        toc.appendChild(summary);
        var ul = document.createElement('ul');
        headings.forEach(function (h) {
          if (!h.id) {
            h.id = h.textContent.trim()
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .substring(0, 60);
          }
          var li = document.createElement('li');
          if (h.tagName === 'H3') li.style.marginLeft = '1rem';
          var a = document.createElement('a');
          a.href = '#' + h.id;
          a.textContent = h.textContent;
          li.appendChild(a);
          ul.appendChild(li);
        });
        toc.appendChild(ul);
        tocHolders.forEach(function (holder) {
          holder.innerHTML = '';
          holder.appendChild(toc.cloneNode(true));
        });
      } else {
        tocHolders.forEach(function (h) { h.remove(); });
      }
    }
  }

  // Lightbox for article images
  (function () {
    var imgs = document.querySelectorAll('.tm-article img');
    if (!imgs.length) return;

    var overlay = document.createElement('div');
    overlay.id = 'tm-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', EN ? 'Enlarged image' : 'Imagen ampliada');
    overlay.innerHTML =
      '<button class="tm-lb-close" aria-label="' + (EN ? 'Close' : 'Cerrar') + '">&times;</button>' +
      '<img class="tm-lb-img" src="" alt="">' +
      '<p class="tm-lb-caption"></p>';
    document.body.appendChild(overlay);

    var lbImg     = overlay.querySelector('.tm-lb-img');
    var lbCaption = overlay.querySelector('.tm-lb-caption');

    function open(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || '';
      lbCaption.textContent = alt || '';
      lbCaption.hidden = !alt;
      overlay.classList.add('tm-lb-open');
      document.body.style.overflow = 'hidden';
      overlay.querySelector('.tm-lb-close').focus();
    }

    function close() {
      overlay.classList.remove('tm-lb-open');
      document.body.style.overflow = '';
      lbImg.src = '';
    }

    imgs.forEach(function (img) {
      // una imagen que enlaza a otra PÁGINA (p. ej. la tarjeta de un juego) navega a ella; solo se
      // amplía si no tiene enlace o si el enlace apunta al propio archivo de imagen
      var link = img.closest('a');
      if (link && !/\.(png|jpe?g|webp|gif|svg|avif)([?#]|$)/i.test(link.getAttribute('href') || '')) return;
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function (e) {
        e.preventDefault();
        open(img.src, img.alt);
      });
      var parent = img.closest('a');
      if (parent) {
        parent.addEventListener('click', function (e) {
          e.preventDefault();
        });
      }
    });

    overlay.querySelector('.tm-lb-close').addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('tm-lb-open')) close();
    });
  })();

  // FAQ accordion
  document.querySelectorAll('.tm-faq-q').forEach(function (q) {
    q.setAttribute('role', 'button');
    q.setAttribute('tabindex', '0');
    var item = q.closest('.tm-faq-item');
    function toggle() { item.classList.toggle('open'); }
    q.addEventListener('click', toggle);
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  // External links open in new tab (optional usability)
  document.querySelectorAll('a[href^="http"]:not([href*="teoriamusical.com.es"])').forEach(function (a) {
    if (!a.hasAttribute('target')) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });
})();
