/* ============================================================
   Shared interactive controls for every page of this site.
   Single source of truth for the theme toggle + back-to-top FAB:
   markup, icons, and behavior all live here so every page renders
   the exact same control.
   Load AFTER content is ready (script at end of body or defer).
   ============================================================ */
(function () {
  'use strict';

  function iconify(name) {
    var s = document.createElement('span');
    s.className = 'iconify';
    s.setAttribute('data-icon', name);
    return s;
  }

  /* Theme toggle: light/dark, follows OS by default, persists to localStorage. */
  function initThemeToggle() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var root = document.documentElement;
    btn.innerHTML = '<span class="icon-moon"></span><span class="icon-sun"></span>';
    btn.querySelector('.icon-moon').appendChild(iconify('ph:moon-fill'));
    btn.querySelector('.icon-sun').appendChild(iconify('ph:sun-fill'));
    btn.addEventListener('click', function () {
      var dark = (root.dataset.theme === 'dark') || (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      var next = dark ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* Back-to-top FAB: appears after scrolling past 480px. */
  function initFAB() {
    var fab = document.getElementById('fab');
    if (!fab) return;
    fab.innerHTML = '';
    fab.appendChild(iconify('ph:arrow-up-bold'));
    fab.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        fab.classList.toggle('show', (window.scrollY || document.documentElement.scrollTop) > 480);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  initThemeToggle();
  initFAB();
  if (window.Iconify) Iconify.scan(document);
})();
