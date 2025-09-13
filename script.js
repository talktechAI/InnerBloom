// script.js - Multi-page version (no SPA intercepts)

// ============================================
// PRIVACY NOTICE & ANALYTICS (GLOBAL SCOPE)
// ============================================

// Constants
const PRIVACY_ACKNOWLEDGED_KEY = 'innerbloom_privacy_acknowledged';
const BANNER_DISMISSED_DAYS = 30;

function lsGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function lsSet(key, value) {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}
function lsRemove(key) {
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}

// Show privacy banner
function showPrivacyBanner() {
    const banner = document.getElementById('privacyBanner');
    if (banner) {
        banner.classList.add('show');
        banner.classList.remove('hide');
    }
}

// Dismiss banner with X button
function dismissBanner() {
    const banner = document.getElementById('privacyBanner');
    if (banner) {
        banner.classList.add('hide');
        banner.classList.remove('show');
        
        // Remember dismissal if possible
        lsSet(PRIVACY_ACKNOWLEDGED_KEY, new Date().toISOString());
    }
}

// Acknowledge with "Got it" button
function acknowledgeBanner() {
    dismissBanner();
    loadUmamiAnalytics();
}

// Learn more - go to privacy policy
function learnMore() {
    window.location.href = 'privacy.html';
}

// Check if user has already acknowledged privacy notice
    function checkPrivacyStatus() {
      // Force show for desktop testing: add ?forceBanner=1 to the URL
      const params = new URLSearchParams(window.location.search);
      if (params.get('forceBanner') === '1') {
        setTimeout(showPrivacyBanner, 300);
        loadUmamiAnalytics(); // still loads cookieless
        return;
      }
    
      const acknowledged = lsGet(PRIVACY_ACKNOWLEDGED_KEY);
    
      if (!acknowledged) {
        // Show banner after 2 seconds on first visit
        setTimeout(showPrivacyBanner, 2000);
      } else {
        // Show again after 30 days
        const acknowledgedDate = new Date(acknowledged);
        const daysSince = (Date.now() - acknowledgedDate.getTime()) / 86400000;
        if (daysSince > BANNER_DISMISSED_DAYS) {
          setTimeout(showPrivacyBanner, 2000);
        }
      }
    }
    
// Load Umami Analytics with HIPAA compliance checks
function loadUmamiAnalytics() {
    // List of pages that should NEVER be tracked (PHI risk)
    const EXCLUDED_PAGES = [
        '/patient-portal',
        '/booking',
        '/appointment',
        '/intake',
        '/assessment',
        '/treatment'
    ];
    
    // Check if current page should be tracked
    const currentPath = window.location.pathname.toLowerCase();
    for (let excluded of EXCLUDED_PAGES) {
        if (currentPath.includes(excluded)) {
            console.log('Analytics: Page excluded for HIPAA compliance');
            return; // Don't load analytics
        }
    }
    
    // Check for PHI keywords in URL
    const fullUrl = window.location.href.toLowerCase();
    const phiKeywords = ['patient', 'medical', 'diagnosis', 'treatment-plan'];
    for (let keyword of phiKeywords) {
        if (fullUrl.includes(keyword)) {
            console.log('Analytics: URL contains potential PHI');
            return; // Don't load analytics
        }
    }
    
    // Safe to load Umami
    const script = document.createElement('script');
    script.defer = true;
    script.setAttribute('data-website-id', '53e70764-9e1e-4efb-9855-4f5a9df9cb96');
    script.setAttribute('data-domains', 'innerbloommw.com'); 
    script.src = 'https://cloud.umami.is/script.js';
    
    document.head.appendChild(script);
}

// ============================================
// DOM CONTENT LOADED EVENTS
// ============================================

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

    // Initialize privacy notice on page load
    checkPrivacyStatus();
});
