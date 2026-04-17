/* Teoría Musical — main.js
   Lightweight vanilla-JS helpers: mobile nav, year, TOC placeholder builder. */

(function () {
  'use strict';

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
        summary.textContent = 'Tabla de contenidos';
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

  // External links open in new tab (optional usability)
  document.querySelectorAll('a[href^="http"]:not([href*="teoriamusical.com.es"])').forEach(function (a) {
    if (!a.hasAttribute('target')) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });
})();
