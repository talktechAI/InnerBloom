// script.js - Inner Bloom Mental Wellness Website JavaScript

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button[data-section]');
    const contentSections = document.querySelectorAll('.content-section');
    
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
        });
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