// script.js - Inner Bloom Mental Wellness Website JavaScript with Email Protection

// Email Protection Functions
function initEmailProtection() {
    // Base64 decode function
    function decodeEmail(encoded) {
        try {
            return atob(encoded);
        } catch(e) {
            console.warn('Email decode failed:', e);
            return 'contact@innerbloommw.com'; // fallback
        }
    }
    
    // Method 1: Base64 encoded emails
    const base64Elements = document.querySelectorAll('[data-email-base64]');
    base64Elements.forEach(element => {
        const encoded = element.getAttribute('data-email-base64');
        const email = decodeEmail(encoded);
        
        if (element.tagName.toLowerCase() === 'a') {
            element.href = 'mailto:' + email;
            element.textContent = email;
        } else {
            element.innerHTML = `<a href="mailto:${email}" class="protected-email">${email}</a>`;
        }
    });
    
    // Method 2: Simple class-based protection (main method for this site)
    const protectedElements = document.querySelectorAll('.email-protect');
    protectedElements.forEach(element => {
        const email = 'Amanda@innerbloommw.com'; // The actual email
        element.innerHTML = `<a href="mailto:${email}" class="protected-email">${email}</a>`;
    });
    
    console.log('Email protection initialized');
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize email protection first
    initEmailProtection();
    initPhoneProtection();

    function initPhoneProtection() {
    // Base64 decode function for phone
    function decodePhone(encoded) {
        try {
            return atob(encoded);
        } catch(e) {
            console.warn('Phone decode failed:', e);
            return '623-850-1640'; // fallback
        }
    }
    
    // Simple digit deobfuscation (reverse of +5 shift)
    function deobfuscatePhone(obfuscated) {
        return obfuscated.split('').map(char => {
            if (char >= '0' && char <= '9') {
                // Reverse the +5 shift
                return String.fromCharCode(((parseInt(char) - 5 + 10) % 10) + 48);
            }
            return char; // Keep dashes and other characters
        }).join('');
    }
    
    // Method 1: Base64 encoded phones
    const base64PhoneElements = document.querySelectorAll('[data-phone-base64]');
    base64PhoneElements.forEach(element => {
        const encoded = element.getAttribute('data-phone-base64');
        const phone = decodePhone(encoded);
        
        if (element.tagName.toLowerCase() === 'a') {
            element.href = 'tel:' + phone;
            element.textContent = phone;
        } else {
            element.innerHTML = `<a href="tel:${phone}" class="protected-phone">${phone}</a>`;
        }
    });
    
    // Method 2: Obfuscated phones
    const obfuscatedPhoneElements = document.querySelectorAll('[data-phone-obfuscated]');
    obfuscatedPhoneElements.forEach(element => {
        const obfuscated = element.getAttribute('data-phone-obfuscated');
        const phone = deobfuscatePhone(obfuscated);
        
        if (element.tagName.toLowerCase() === 'a') {
            element.href = 'tel:' + phone;
            element.textContent = phone;
        } else {
            element.innerHTML = `<a href="tel:${phone}" class="protected-phone">${phone}</a>`;
        }
    });
    
    // Method 3: Phone parts construction
    const phonePartElements = document.querySelectorAll('[data-phone-area][data-phone-exchange][data-phone-number]');
    phonePartElements.forEach(element => {
        const area = element.getAttribute('data-phone-area');
        const exchange = element.getAttribute('data-phone-exchange');
        const number = element.getAttribute('data-phone-number');
        const phone = area + '-' + exchange + '-' + number;
        
        if (element.tagName.toLowerCase() === 'a') {
            element.href = 'tel:' + phone;
            element.textContent = phone;
        } else {
            element.innerHTML = `<a href="tel:${phone}" class="protected-phone">${phone}</a>`;
        }
    });
    
    // Method 4: Simple class-based protection
    const protectedPhoneElements = document.querySelectorAll('.phone-protect');
    protectedPhoneElements.forEach(element => {
        const phone = '623-850-1640'; // The actual phone
        element.innerHTML = `<a href="tel:${phone}" class="protected-phone">${phone}</a>`;
    });
    
    console.log('Phone protection initialized');
}
    
    const navButtons = document.querySelectorAll('.nav-button[data-section]');
    const contentSections = document.querySelectorAll('.content-section');
    const menuToggle = document.getElementById('menu-toggle');
    const navButtonsContainer = document.getElementById('nav-buttons');
    const logoContainer = document.querySelector('.logo-container');
    const resourcesDropdown = document.getElementById('resources-dropdown');
    const resourcesTrigger = document.getElementById('resources-trigger');
    const resourcesMenu = document.getElementById('resources-menu');
    
    if (logoContainer) {
        // Click handler for logo
        logoContainer.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all sections and buttons
            const allSections = document.querySelectorAll('.content-section');
            const allNavButtons = document.querySelectorAll('.nav-button[data-section]');
            
            allSections.forEach(section => section.classList.remove('active'));
            allNavButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to home section and home button
            const homeSection = document.getElementById('home');
            const homeButton = document.querySelector('.nav-button[data-section="home"]');
            
            if (homeSection) {
                homeSection.classList.add('active');
            }
            if (homeButton) {
                homeButton.classList.add('active');
            }
            
            // Close mobile menu if open
            if (navButtonsContainer && menuToggle) {
                navButtonsContainer.classList.remove('open');
                menuToggle.classList.remove('active');
            }
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Resources Dropdown functionality
        if (resourcesTrigger && resourcesMenu) {
            // Toggle dropdown on click
            resourcesTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isOpen = resourcesMenu.classList.contains('show');
                
                // Close all other dropdowns first
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
                document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
                    trigger.classList.remove('active');
                });
                
                if (!isOpen) {
                    resourcesMenu.classList.add('show');
                    resourcesTrigger.classList.add('active');
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!resourcesDropdown.contains(e.target)) {
                    resourcesMenu.classList.remove('show');
                    resourcesTrigger.classList.remove('active');
                }
            });
            
            // Close dropdown on window resize if desktop
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    resourcesMenu.classList.remove('show');
                    resourcesTrigger.classList.remove('active');
                }
            });
        }
        
        // Keyboard accessibility (Enter key)
        logoContainer.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                logoContainer.click();
            }
        });
    }
    
    // Simple mobile menu toggle
    if (menuToggle && navButtonsContainer) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isOpen = navButtonsContainer.classList.contains('open');
            
            if (isOpen) {
                navButtonsContainer.classList.remove('open');
                menuToggle.classList.remove('active');
            } else {
                navButtonsContainer.classList.add('open');
                menuToggle.classList.add('active');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navButtonsContainer.contains(e.target)) {
                navButtonsContainer.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        });
    }
    
    // Navigation functionality
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all sections and buttons
            contentSections.forEach(section => section.classList.remove('active'));
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to target section and button
            document.getElementById(targetSection).classList.add('active');
            this.classList.add('active');

            // Close mobile menu
            if (navButtonsContainer) {
                navButtonsContainer.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Close menu on window resize if desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navButtonsContainer) {
                navButtonsContainer.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        }
    });
    
    // Form submission with flower animation (if form exists)
    const form = document.getElementById('contact-form');
    if (form) {
        const submitBtn = form.querySelector('.submit-btn');
        const flowerContainer = form.querySelector('.flower-container');
        const successMessage = document.getElementById('success-message');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Disable submit button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
            
            // Show flower animation
            if (flowerContainer) {
                flowerContainer.classList.add('show');
            }
            
            // Simulate form submission
            setTimeout(() => {
                // Hide flower
                if (flowerContainer) {
                    flowerContainer.classList.remove('show');
                }
                
                // Show success message
                if (successMessage) {
                    successMessage.style.display = 'block';
                }
                
                // Reset form
                form.reset();
                
                // Reset button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }
                
                // Hide success message after 5 seconds
                if (successMessage) {
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            }, 2500);
        });
    }
    
    // Set current year
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Set policy date (for privacy policy)
    const policyDateElement = document.getElementById('policy-date');
    if (policyDateElement) {
        policyDateElement.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
    }
});
