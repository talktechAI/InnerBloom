// script.js - Multi-page version (no SPA intercepts)

document.addEventListener('DOMContentLoaded', function() {
  // Email Protection
  document.querySelectorAll('[data-email-base64]').forEach(el => {
    try {
      const email = atob(el.getAttribute('data-email-base64'));
      el.innerHTML = `<a href="mailto:${email}" class="protected-email">${email}</a>`;
    } catch {
      el.textContent = "contact@innerbloommw.com";
    }
  });

  // Phone Protection
  document.querySelectorAll('[data-phone-base64]').forEach(el => {
    try {
      const phone = atob(el.getAttribute('data-phone-base64'));
      el.innerHTML = `<a href="tel:${phone}" class="protected-phone">${phone}</a>`;
    } catch {
      el.textContent = "623-850-1640";
    }
  });

  // Dropdown helpers
  function setupDropdown(triggerId, menuId, wrapperId) {
    const trigger = document.getElementById(triggerId);
    const menu = document.getElementById(menuId);
    const wrapper = document.getElementById(wrapperId);

    if (trigger && menu && wrapper) {
      trigger.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = menu.classList.contains('show');
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
        document.querySelectorAll('.dropdown-trigger').forEach(t => t.classList.remove('active'));
        if (!isOpen) {
          menu.classList.add('show');
          trigger.classList.add('active');
        }
      });
      document.addEventListener('click', e => {
        if (!wrapper.contains(e.target)) {
          menu.classList.remove('show');
          trigger.classList.remove('active');
        }
      });
      window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
          menu.classList.remove('show');
          trigger.classList.remove('active');
        }
      });
    }
  }
  setupDropdown('resources-trigger','resources-menu','resources-dropdown');

  // Mobile Menu
  const menuToggle = document.getElementById('menu-toggle');
  const navButtons = document.getElementById('nav-buttons');
  if (menuToggle && navButtons) {
    menuToggle.addEventListener('click', e => {
      e.preventDefault();
      navButtons.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });
    document.addEventListener('click', e => {
      if (!menuToggle.contains(e.target) && !navButtons.contains(e.target)) {
        navButtons.classList.remove('open');
        menuToggle.classList.remove('active');
      }
    });
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        navButtons.classList.remove('open');
        menuToggle.classList.remove('active');
      }
    });
  }

  // Year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Policy date (if present)
  const policyDateElement = document.getElementById('policy-date');
  if (policyDateElement) {
    policyDateElement.textContent = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }
});
