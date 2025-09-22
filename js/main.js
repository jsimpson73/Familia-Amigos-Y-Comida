/**
 * Familia, Amigos Y Comida - Main JavaScript
 * Author: John Simpson
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation menu for mobile
    initMobileNav();
    
    // Initialize newsletter subscription
    initNewsletterForm();
    
    // Check authentication status
    checkAuthStatus();
    
    // Initialize any tab interfaces
    initTabs();
});

/**
 * Mobile Navigation Menu
 */
function initMobileNav() {
    // This would be implemented for a responsive mobile menu
    // For now, we're using CSS media queries for basic responsiveness
}

/**
 * Newsletter Subscription Form
 */
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // In a real application, this would send the email to the server
                // For now, we'll just show a success message
                
                // Create a success message
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.className = 'success-message';
                successMessage.style.color = '#4CAF50';
                successMessage.style.marginTop = '10px';
                
                // Replace the form with the success message
                this.innerHTML = '';
                this.appendChild(successMessage);
                
                // In a real application, you would send this to the server
                console.log('Newsletter subscription:', email);
            } else {
                // Show error message
                alert('Please enter a valid email address.');
            }
        });
    });
}

/**
 * Validate Email Format
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Check Authentication Status
 */
function checkAuthStatus() {
    // In a real application, this would check if the user is logged in
    // For now, we'll just simulate this with localStorage
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    
    // Update UI based on login status
    updateAuthUI(isLoggedIn, username);
    
    // Update navigation based on login status
    updateNavigation(isLoggedIn);
    
    // Handle login form if it exists on the page
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // In a real application, this would validate with the server
            // For demo purposes, we'll accept any non-empty values
            if (email && password) {
                // Simulate successful login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', email.split('@')[0]);
                
                // Initialize favorites array if it doesn't exist
                if (!localStorage.getItem('favorites')) {
                    localStorage.setItem('favorites', JSON.stringify([]));
                }
                
                // Redirect to home page
                window.location.href = 'index.html';
            } else {
                alert('Please enter both email and password.');
            }
        });
    }
    
    // Handle registration form if it exists
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Basic validation
            if (!name || !email || !password) {
                alert('Please fill out all required fields.');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, this would send the registration to the server
            // For demo purposes, we'll simulate a successful registration
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', name);
            
            // Initialize favorites array
            localStorage.setItem('favorites', JSON.stringify([]));
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
    
    // Handle login/logout link
    const loginLink = document.getElementById('login-link');
    if (loginLink) {
        if (isLoggedIn) {
            loginLink.textContent = 'Logout';
            loginLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Clear login status
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                
                // Redirect to home page
                window.location.href = 'index.html';
            });
        }
    }
}

/**
 * Update UI based on authentication status
 */
function updateAuthUI(isLoggedIn, username) {
    // This would update navigation links, show/hide elements, etc.
    // based on whether the user is logged in
    
    // For now, we'll just log the status
    console.log('Auth status:', isLoggedIn ? 'Logged in as ' + username : 'Not logged in');
    
    // Check for recipe submission form
    const recipeFormContainer = document.getElementById('recipe-form-container');
    const loginRequiredMessage = document.getElementById('login-required');
    
    if (recipeFormContainer && loginRequiredMessage) {
        if (isLoggedIn) {
            recipeFormContainer.style.display = 'block';
            loginRequiredMessage.style.display = 'none';
        } else {
            recipeFormContainer.style.display = 'none';
            loginRequiredMessage.style.display = 'block';
        }
    }
}

/**
 * Update navigation based on login status
 */
function updateNavigation(isLoggedIn) {
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    
    if (isLoggedIn && loginLink && registerLink) {
        // Change login link to logout
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.location.href = 'index.html';
        });
        
        // Hide register link
        registerLink.style.display = 'none';
    }
}

/**
 * Initialize Tab Interfaces
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.admin-tab');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all tabs
                document.querySelectorAll('.admin-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all tab content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the corresponding tab content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

/**
 * Format date to readable string
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

/**
 * Handle image uploads and preview
 */
function handleImageUpload(inputElement, previewElement) {
    inputElement.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewElement.src = e.target.result;
                previewElement.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    });
}