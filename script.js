// script.js - Inner Bloom Mental Wellness Website JavaScript

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button[data-section]');
    const contentSections = document.querySelectorAll('.content-section');
    const menuToggle = document.getElementById('menu-toggle');
    const navButtonsContainer = document.getElementById('nav-buttons');
    const logoContainer = document.querySelector('.logo-container');

// Logo navigation functionality
    const logoContainer = document.querySelector('.logo-container');
    
    if (logoContainer) {
        // Click handler for logo
        logoContainer.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToHome();
        });
        
        // Keyboard accessibility (Enter key)
        logoContainer.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToHome();
            }
        });
    }
    
    // Function to navigate to home
    function navigateToHome() {
        // Remove active class from all sections and buttons
        contentSections.forEach(section => section.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));
        
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
            navButtonsContainer.classList.remove('open');
            navOverlay.classList.remove('open');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Form submission with flower animation
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.submit-btn');
    const flowerContainer = form.querySelector('.flower-container');
    const successMessage = document.getElementById('success-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Show flower animation
        flowerContainer.classList.add('show');
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Hide flower
            flowerContainer.classList.remove('show');
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }, 2500);
    });
    
    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
