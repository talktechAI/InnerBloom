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
      const closeDropdown = () => {
        menu.classList.remove('show');
        trigger.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      };

      const openDropdown = () => {
        document.querySelectorAll('.dropdown-menu').forEach(m => {
          m.classList.remove('show');
          const relatedTrigger = document.querySelector(`.dropdown-trigger[aria-controls="${m.id}"]`);
          if (relatedTrigger) {
            relatedTrigger.classList.remove('active');
            relatedTrigger.setAttribute('aria-expanded', 'false');
          }
        });
        menu.classList.add('show');
        trigger.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      };

      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-controls', menuId);

      const toggleDropdown = e => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = menu.classList.contains('show');
        if (isOpen) {
          closeDropdown();
        } else {
          openDropdown();
        }
      };

      trigger.addEventListener('click', toggleDropdown);

      trigger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleDropdown(e);
        } else if (e.key === 'Escape') {
          closeDropdown();
        }
      });

      document.addEventListener('click', e => {
        if (!wrapper.contains(e.target)) {
          closeDropdown();
        }
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          closeDropdown();
        }
      });

      window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
          closeDropdown();
        }
      });
    }
  }
  setupDropdown('resources-trigger','resources-menu','resources-dropdown');

  // Mobile Menu
  const menuToggle = document.getElementById('menu-toggle');
  const navButtons = document.getElementById('nav-buttons');
  if (menuToggle && navButtons) {
    const setMenuState = isOpen => {
      navButtons.classList.toggle('open', isOpen);
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      navButtons.setAttribute('aria-hidden', String(!isOpen));
    };

    setMenuState(false);

    const toggleMenu = e => {
      e.preventDefault();
      e.stopPropagation();
      const willOpen = !navButtons.classList.contains('open');
      setMenuState(willOpen);
    };

    menuToggle.addEventListener('click', toggleMenu);

    menuToggle.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleMenu(e);
      } else if (e.key === 'Escape') {
        setMenuState(false);
      }
    });

    document.addEventListener('click', e => {
      if (!menuToggle.contains(e.target) && !navButtons.contains(e.target)) {
        setMenuState(false);
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        setMenuState(false);
      }
    });
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        setMenuState(false);
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
