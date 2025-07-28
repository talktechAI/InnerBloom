// script.js - Inner Bloom Mental Wellness Website JavaScript

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button[data-section]');
    const contentSections = document.querySelectorAll('.content-section');
    const menuToggle = document.getElementById('menu-toggle');
    const navButtonsContainer = document.getElementById('nav-buttons');
    const navOverlay = document.getElementById('nav-overlay');
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        const isOpen = navButtonsContainer.classList.contains('open');
        
        if (isOpen) {
            // Close menu
            navButtonsContainer.classList.remove('open');
            navOverlay.classList.remove('open');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Open menu
            navButtonsContainer.classList.add('open');
            navOverlay.classList.add('open');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    // Close menu when clicking overlay
    navOverlay.addEventListener('click', function() {
        navButtonsContainer.classList.remove('open');
        navOverlay.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    });

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

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navButtonsContainer.classList.remove('open');
                navOverlay.classList.remove('open');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
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
