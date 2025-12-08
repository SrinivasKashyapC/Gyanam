// Handle Start Learning button click
function handleStartLearning() {
    // Check if Firebase is initialized
    if (typeof firebase === 'undefined' || !firebase.auth()) {
        console.log('Firebase not initialized yet, waiting...');
        showAuthMessage('Please wait a moment...', 'info');
        setTimeout(handleStartLearning, 500);
        return;
    }
    
    const user = firebase.auth().currentUser;
    
    if (user) {
        // User is logged in, redirect to courses page
        console.log('User is authenticated, redirecting to courses page');
        window.location.href = 'courses.html';
    } else {
        // User is not logged in, show authentication modal
        console.log('User not authenticated, showing login modal');
        showAuthMessage('Please sign up or log in to start your learning journey!', 'info');
        showAuthModal();
        
        // Switch to signup tab by default for new users
        switchAuthTab('signup');
    }
}

// Test function to verify button clicks work
function testButtonClick() {
    alert('Button click works!');
    console.log('Test button clicked');
}

// Authentication Modal Functions
function showAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    clearAuthMessage();
}

function switchAuthTab(tab) {
    // Switch tabs
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    document.querySelector(`[onclick="switchAuthTab('${tab}')"]`).classList.add('active');
    document.getElementById(tab + 'Form').classList.add('active');
    
    // Update modal title
    const title = tab === 'login' ? 'Welcome Back!' : 'Join Gyaanam AI';
    document.getElementById('authModalTitle').textContent = title;
    
    clearAuthMessage();
}

function showAuthMessage(message, type = 'error') {
    const messageDiv = document.getElementById('authMessage');
    messageDiv.textContent = message;
    messageDiv.className = `auth-message ${type}`;
    messageDiv.style.display = 'block';
}

function clearAuthMessage() {
    const messageDiv = document.getElementById('authMessage');
    messageDiv.style.display = 'none';
    messageDiv.className = 'auth-message';
}

// Authentication Functions
async function signupUser() {
    console.log('Signup button clicked!'); // Debug log
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    console.log('Form values:', { name, email, password: '***', confirmPassword: '***' }); // Debug log
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showAuthMessage('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthMessage('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        showAuthMessage('Password must be at least 6 characters');
        return;
    }
    
    // Disable button
    const signupBtn = document.getElementById('signupBtn');
    signupBtn.disabled = true;
    signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    
    try {
        console.log('Attempting Firebase signup...'); // Debug log
        const result = await GyaanamAuth.signUp(email, password, name);
        console.log('Signup result:', result); // Debug log
        
        if (result.success) {
            showAuthMessage('Account created successfully! Welcome to Gyaanam AI!', 'success');
            setTimeout(() => {
                hideAuthModal();
                updateAuthState(result.user);
            }, 2000);
        } else {
            showAuthMessage(result.error);
        }
    } catch (error) {
        console.error('Signup error:', error); // Debug log
        showAuthMessage('Something went wrong. Please try again.');
    }
    
    // Re-enable button
    signupBtn.disabled = false;
    signupBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
}

async function loginUser() {
    console.log('Login button clicked!'); // Debug log
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    console.log('Login form values:', { email, password: '***' }); // Debug log
    
    if (!email || !password) {
        showAuthMessage('Please fill in all fields');
        return;
    }
    
    // Disable button
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    
    try {
        console.log('Attempting Firebase login...'); // Debug log
        const result = await GyaanamAuth.signIn(email, password);
        console.log('Login result:', result); // Debug log
        
        if (result.success) {
            showAuthMessage('Welcome back to Gyaanam AI!', 'success');
            setTimeout(() => {
                hideAuthModal();
                updateAuthState(result.user);
            }, 1500);
        } else {
            showAuthMessage(result.error);
        }
    } catch (error) {
        console.error('Login error:', error); // Debug log
        showAuthMessage('Something went wrong. Please try again.');
    }
    
    // Re-enable button
    loginBtn.disabled = false;
    loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
}

async function signInWithGoogle() {
    try {
        const result = await GyaanamAuth.signInWithGoogle();
        
        if (result.success) {
            showAuthMessage('Welcome to Gyaanam AI!', 'success');
            setTimeout(() => {
                hideAuthModal();
                updateAuthState(result.user);
            }, 1500);
        } else {
            showAuthMessage(result.error);
        }
    } catch (error) {
        showAuthMessage('Google sign in failed. Please try again.');
    }
}

async function logoutUser() {
    try {
        await GyaanamAuth.signOut();
        updateAuthState(null);
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// User Profile Functions
function showUserProfile() {
    const modal = document.getElementById('userProfileModal');
    const user = GyaanamAuth.getCurrentUser();
    
    if (user) {
        const content = document.getElementById('userProfileContent');
        content.innerHTML = `
            <div class="user-avatar">
                ${user.photoURL ? 
                    `<img src="${user.photoURL}" alt="Profile" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` :
                    `<i class="fas fa-user"></i>`
                }
            </div>
            <div class="user-info">
                <h3>${user.displayName || 'Gyaanam AI Learner'}</h3>
                <p>${user.email}</p>
                <p style="font-size: 0.9rem; color: rgba(255,255,255,0.6);">
                    Joined: ${user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Recently'}
                </p>
            </div>
            <div class="user-actions">
                <a href="index.html" class="user-action-btn">
                    <i class="fas fa-book"></i> Continue Learning
                </a>
                <button onclick="logoutUser()" class="user-action-btn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        `;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideUserProfile() {
    const modal = document.getElementById('userProfileModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Update UI based on authentication state
function updateAuthState(user) {
    const authButton = document.querySelector('.auth-button');
    const startLearningBtn = document.getElementById('startLearningBtn');
    
    if (user) {
        // User is logged in
        authButton.innerHTML = `<i class="fas fa-user-circle"></i> ${user.displayName || 'Profile'}`;
        authButton.onclick = showUserProfile;
        
        // Update start learning button text to show it's ready
        startLearningBtn.innerHTML = `<i class="fas fa-rocket"></i> Continue Learning`;
    } else {
        // User is logged out
        authButton.innerHTML = `<i class="fas fa-user"></i> Login`;
        authButton.onclick = showAuthModal;
        
        // Reset start learning button text
        startLearningBtn.innerHTML = `<i class="fas fa-play"></i> Start Learning`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking Firebase initialization...'); // Debug log
    
    // Check if Firebase is available
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase is not loaded!');
        showAuthMessage('Firebase is not loaded. Please refresh the page.', 'error');
        return;
    }
    
    // Check if GyaanamAuth is available
    if (typeof GyaanamAuth === 'undefined') {
        console.error('❌ GyaanamAuth is not loaded!');
        showAuthMessage('Authentication system is not loaded. Please refresh the page.', 'error');
        return;
    }
    
    console.log('✅ Firebase and GyaanamAuth are available'); // Debug log
    
    // Test Firebase Auth initialization
    if (firebase.auth) {
        console.log('✅ Firebase Auth is available');
        
        // Initialize authentication state
        GyaanamAuth.onAuthStateChanged((user) => {
            updateAuthState(user);
            
            if (user) {
                console.log('✅ User is signed in:', user.displayName || user.email);
            } else {
                console.log('ℹ️ User is signed out');
            }
        });
    } else {
        console.error('❌ Firebase Auth is not available');
        showAuthMessage('Firebase Authentication is not available. Please check your internet connection.', 'error');
    }
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        const authModal = document.getElementById('authModal');
        const profileModal = document.getElementById('userProfileModal');
        
        if (e.target === authModal) {
            hideAuthModal();
        }
        
        if (e.target === profileModal) {
            hideUserProfile();
        }
    });
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.15)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .update-item, .tech-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.primary-button, .cta-main-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        button.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Floating cards animation on hover
    const floatingCards = document.querySelectorAll('.card');
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });

    // Feature tags animation
    const featureTags = document.querySelectorAll('.feature-tag');
    featureTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.style.animation = 'fadeInUp 0.6s ease forwards';
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const startCounting = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const finalValue = statElement.textContent;
                
                if (finalValue === '∞') return; // Skip infinity symbol
                
                let current = 0;
                const increment = finalValue / 20;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= finalValue) {
                        current = finalValue;
                        clearInterval(timer);
                    }
                    statElement.textContent = Math.floor(current);
                }, 50);
                
                counterObserver.unobserve(statElement);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounting, {
        threshold: 0.5
    });

    stats.forEach(stat => {
        if (stat.textContent !== '∞') {
            counterObserver.observe(stat);
        }
    });
});

// Global function for scrolling to features (called from button)
function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes glow {
        0%, 100% { box-shadow: 0 0 5px rgba(78, 205, 196, 0.5); }
        50% { box-shadow: 0 0 20px rgba(78, 205, 196, 0.8); }
    }
`;
document.head.appendChild(style);

// Add loading animation for page
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code for special animation
let konamiCode = [];
const konami = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konami.join(',')) {
        // Special animation when konami code is entered
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = 'cardFloat 1s ease-in-out infinite';
        });
        
        // Show a fun message
        const message = document.createElement('div');
        message.textContent = '🎉 You found the secret! Gyaanam AI loves curious learners!';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #4ecdc4, #44a08d);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            animation: fadeInUp 0.5s ease;
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
        
        konamiCode = [];
    }
});

// Initialize Firebase auth listener on page load
if (typeof firebase !== 'undefined') {
    firebase.auth().onAuthStateChanged((user) => {
        const startLearningBtn = document.getElementById('startLearningBtn');
        if (user && startLearningBtn) {
            console.log('User logged in on landing page:', user.email);
        }
    });
}