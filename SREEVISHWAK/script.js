// Shree Vishwak Electricals Website JavaScript

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add click event to all navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Utility functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[+]?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#2ed573';
            break;
        case 'error':
            notification.style.background = '#ff4757';
            break;
        case 'info':
            notification.style.background = '#3742fa';
            break;
        default:
            notification.style.background = '#2c3e50';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('scroll-animate');
        observer.observe(section);
    });
    
    // Observe cards for staggered animation
    const cards = document.querySelectorAll('.service-card, .quality-card, .about-card, .stat-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = Date.now();
    const originalText = element.textContent;
    const hasPlus = originalText.includes('+');
    const hasPercent = originalText.includes('%');
    const isSpecialFormat = originalText.includes('/') || originalText === '24/7';
    
    // Don't animate special formats like "24/7"
    if (isSpecialFormat) {
        return;
    }
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        let displayText = current.toString();
        if (hasPlus) displayText += '+';
        if (hasPercent) displayText += '%';
        
        element.textContent = displayText;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const targetValue = parseInt(statNumber.textContent);
            animateCounter(statNumber, targetValue);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        statsObserver.observe(card);
    });
});

// Enhanced electrical animation
function enhanceElectricalAnimation() {
    const electricalElements = document.querySelectorAll('.electric-bolt, .electric-plug, .electric-bulb');
    
    electricalElements.forEach((element, index) => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.2)';
            element.style.color = '#fff';
            element.style.textShadow = '0 0 20px #f39c12';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
            element.style.color = '#f39c12';
            element.style.textShadow = 'none';
        });
        
        // Add random glow effect
        setInterval(() => {
            element.style.filter = `drop-shadow(0 0 ${Math.random() * 10 + 5}px #f39c12)`;
        }, 2000 + index * 500);
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', enhanceElectricalAnimation);

// Client carousel auto-scroll with pause on hover
const clientTrack = document.querySelector('.client-track');
if (clientTrack) {
    clientTrack.addEventListener('mouseenter', () => {
        clientTrack.style.animationPlayState = 'paused';
    });
    
    clientTrack.addEventListener('mouseleave', () => {
        clientTrack.style.animationPlayState = 'running';
    });
}

// Add interactive hover effects to service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const pageContent = document.querySelector('.page-content');
    
    // Simulate loading time (3 seconds)
    setTimeout(() => {
        // Add fade-out class to loading screen
        loadingScreen.classList.add('fade-out');
        
        // Show page content
        pageContent.classList.add('loaded');
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
});

// Add entrance animations to sections
window.addEventListener('load', function() {
    // Stagger animation for hero elements
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroFeatures = document.querySelector('.hero-features');
        const heroButtons = document.querySelector('.hero-buttons');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroTitle) {
            heroTitle.style.animation = 'slideInUp 0.8s ease-out 0.2s both';
        }
        if (heroSubtitle) {
            heroSubtitle.style.animation = 'slideInUp 0.8s ease-out 0.4s both';
        }
        if (heroFeatures) {
            heroFeatures.style.animation = 'slideInUp 0.8s ease-out 0.6s both';
        }
        if (heroButtons) {
            heroButtons.style.animation = 'slideInUp 0.8s ease-out 0.8s both';
        }
        if (heroImage) {
            heroImage.style.animation = 'slideInRight 0.8s ease-out 0.4s both';
        }
    }, 3500);
});

// Add slide-in animation keyframes
const additionalStyles = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Console welcome message
console.log(`
%c🔌 SHREE VISHWAK ELECTRICALS 🔌
%cExcellence in Electrical Engineering Services Since 2009
%c24/7 Emergency Service: +91 9177774872
%cEmail: shreevishwakelectricals@gmail.com
`,
'color: #4CAF50; font-size: 20px; font-weight: bold;',
'color: #2c3e50; font-size: 14px;',
'color: #e74c3c; font-size: 12px; font-weight: bold;',
'color: #667eea; font-size: 12px;'
);
