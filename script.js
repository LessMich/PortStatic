// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Audio player functionality
    initAudioPlayers();
    
    // Contact form functionality
    initContactForm();
    
    // Scroll animations
    initScrollAnimations();
});

// Navigation
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Audio Players
function initAudioPlayers() {
    const audioButtons = document.querySelectorAll('.audio-btn');
    let currentAudio = null;
    let currentButton = null;

    audioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioId = this.getAttribute('data-audio');
            const audio = document.getElementById(audioId);
            const playIcon = this.querySelector('.play-icon');
            const btnText = this.querySelector('.btn-text');
            const progressBar = this.closest('.audio-player').querySelector('.progress-bar');
            const currentTimeSpan = this.closest('.audio-player').querySelector('.current-time');
            const totalTimeSpan = this.closest('.audio-player').querySelector('.total-time');

            // Stop current audio if playing different track
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                updateButtonState(currentButton, false);
                updateProgressBar(currentButton.closest('.audio-player').querySelector('.progress-bar'), 0);
            }

            if (audio.paused) {
                // Play audio
                audio.play().then(() => {
                    currentAudio = audio;
                    currentButton = button;
                    updateButtonState(button, true);
                }).catch(error => {
                    console.error('Error playing audio:', error);
                    showNotification('Unable to play audio. Please try again.');
                });
            } else {
                // Pause audio
                audio.pause();
                updateButtonState(button, false);
            }

            // Update progress bar and time
            audio.addEventListener('timeupdate', function() {
                const progress = (audio.currentTime / audio.duration) * 100;
                updateProgressBar(progressBar, progress);
                updateTimeDisplay(currentTimeSpan, audio.currentTime);
            });

            // Update total time when metadata loads
            audio.addEventListener('loadedmetadata', function() {
                updateTimeDisplay(totalTimeSpan, audio.duration);
            });

            // Reset when audio ends
            audio.addEventListener('ended', function() {
                updateButtonState(button, false);
                updateProgressBar(progressBar, 0);
                updateTimeDisplay(currentTimeSpan, 0);
                currentAudio = null;
                currentButton = null;
            });
        });
    });
}

function updateButtonState(button, isPlaying) {
    const playIcon = button.querySelector('.play-icon');
    const btnText = button.querySelector('.btn-text');
    
    if (isPlaying) {
        playIcon.textContent = '⏸️';
        btnText.textContent = 'Pause';
        button.classList.add('playing');
    } else {
        playIcon.textContent = '▶️';
        btnText.textContent = 'Play Track';
        button.classList.remove('playing');
    }
}

function updateProgressBar(progressBar, percentage) {
    progressBar.style.width = `${percentage}%`;
}

function updateTimeDisplay(timeSpan, seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    timeSpan.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            projectType: formData.get('project-type'),
            message: formData.get('message')
        };
        
        // Validate form
        if (validateForm(data)) {
            // Simulate form submission
            submitForm(data);
        }
    });
}

function validateForm(data) {
    const { name, email, projectType, message } = data;
    
    if (!name.trim()) {
        showNotification('Please enter your name.');
        return false;
    }
    
    if (!email.trim() || !isValidEmail(email)) {
        showNotification('Please enter a valid email address.');
        return false;
    }
    
    if (!projectType) {
        showNotification('Please select a project type.');
        return false;
    }
    
    if (!message.trim()) {
        showNotification('Please enter a message.');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm(data) {
    const submitBtn = document.querySelector('.btn-full');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        
        // Show success message
        showNotification('Thank you for your message! Michele will get back to you soon.', 'success');
        
        // In a real implementation, you would send the data to a server
        console.log('Form data:', data);
    }, 2000);
}

// Notifications
function showNotification(message, type = 'error') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: '#ffffff',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        zIndex: '9999',
        fontSize: '0.875rem',
        fontWeight: '500',
        maxWidth: '300px',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Scroll Animations
function initScrollAnimations() {
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
    const animatedElements = document.querySelectorAll('.portfolio-item, .service-item, .about-text, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scrolling for navigation links (fallback for older browsers)
function smoothScroll(target) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Add click handlers for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
});

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Prevent iOS zoom on input focus
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
    }
}