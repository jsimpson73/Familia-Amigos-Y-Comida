/**
 * Familia, Amigos Y Comida - Authentication JavaScript
 * Author: John Simpson
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize login form
    initLoginForm();
    
    // Initialize registration form
    initRegisterForm();
    
    // Handle password reset
    initPasswordReset();
});

/**
 * Initialize Login Form
 */
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const errorContainer = document.createElement('div');
            errorContainer.className = 'error-message';
            errorContainer.style.color = '#F44336';
            errorContainer.style.marginTop = '10px';
            
            // Remove any existing error messages
            const existingError = loginForm.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Basic validation
            if (!email || !password) {
                errorContainer.textContent = 'Please enter both email and password.';
                loginForm.appendChild(errorContainer);
                return;
            }
            
            if (!validateEmail(email)) {
                errorContainer.textContent = 'Please enter a valid email address.';
                loginForm.appendChild(errorContainer);
                return;
            }
            
            // In a real application, this would authenticate with the server
            // For demo purposes, we'll simulate a successful login
            
            // Check for admin login
            if (email === 'admin@example.com' && password === 'admin123') {
                // Admin login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', 'Admin');
                localStorage.setItem('isAdmin', 'true');
                
                // Redirect to admin dashboard
                window.location.href = 'admin/index.html';
            } else {
                // Regular user login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', email.split('@')[0]);
                localStorage.setItem('isAdmin', 'false');
                
                // Redirect to home page or previous page if available
                const redirectUrl = getRedirectUrl() || 'index.html';
                window.location.href = redirectUrl;
            }
        });
    }
}

/**
 * Initialize Registration Form
 */
function initRegisterForm() {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const newsletter = document.getElementById('newsletter').checked;
            const terms = document.getElementById('terms').checked;
            
            const errorContainer = document.createElement('div');
            errorContainer.className = 'error-message';
            errorContainer.style.color = '#F44336';
            errorContainer.style.marginTop = '10px';
            
            // Remove any existing error messages
            const existingError = registerForm.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Basic validation
            if (!name || !email || !password || !confirmPassword) {
                errorContainer.textContent = 'Please fill out all required fields.';
                registerForm.appendChild(errorContainer);
                return;
            }
            
            if (!validateEmail(email)) {
                errorContainer.textContent = 'Please enter a valid email address.';
                registerForm.appendChild(errorContainer);
                return;
            }
            
            if (password !== confirmPassword) {
                errorContainer.textContent = 'Passwords do not match.';
                registerForm.appendChild(errorContainer);
                return;
            }
            
            if (password.length < 8) {
                errorContainer.textContent = 'Password must be at least 8 characters long.';
                registerForm.appendChild(errorContainer);
                return;
            }
            
            if (!terms) {
                errorContainer.textContent = 'You must agree to the Terms and Conditions.';
                registerForm.appendChild(errorContainer);
                return;
            }
            
            // In a real application, this would send the registration to the server
            // For demo purposes, we'll simulate a successful registration
            
            // Store user data (in a real app, this would be done server-side)
            const userData = {
                name: name,
                email: email,
                newsletter: newsletter,
                registrationDate: new Date().toISOString()
            };
            
            // Store in localStorage for demo purposes
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', name);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isAdmin', 'false');
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Show success message and redirect
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.style.color = '#4CAF50';
            successMessage.style.marginTop = '10px';
            successMessage.textContent = 'Registration successful! Redirecting to homepage...';
            
            registerForm.innerHTML = '';
            registerForm.appendChild(successMessage);
            
            // Redirect to home page after a short delay
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
}

/**
 * Initialize Password Reset
 */
function initPasswordReset() {
    const resetLink = document.querySelector('a[href="#"]');
    
    if (resetLink && resetLink.textContent.includes('Forgot')) {
        resetLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = prompt('Please enter your email address to reset your password:');
            
            if (email && validateEmail(email)) {
                alert('If an account exists with the email ' + email + ', a password reset link will be sent. Please check your email.');
            } else if (email) {
                alert('Please enter a valid email address.');
            }
        });
    }
}

/**
 * Validate Email Format
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Get URL to redirect to after login
 */
function getRedirectUrl() {
    // Check if there's a redirect parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('redirect');
}

/**
 * Check if user is logged in and redirect if necessary
 */
function checkAuthRequired() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const requiresAuth = document.body.hasAttribute('data-requires-auth');
    
    if (requiresAuth && !isLoggedIn) {
        // Redirect to login page with return URL
        const currentPath = window.location.pathname;
        window.location.href = 'login.html?redirect=' + encodeURIComponent(currentPath);
    }
}

/**
 * Check if user is admin and redirect if necessary
 */
function checkAdminRequired() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const requiresAdmin = document.body.hasAttribute('data-requires-admin');
    
    if (requiresAdmin && !isAdmin) {
        // Redirect to login page
        window.location.href = '../login.html';
    }
}