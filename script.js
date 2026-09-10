// ===================================
// Navigation & Scroll Effects
// ===================================

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const navBrand = document.querySelector('.nav-brand');
if (navBrand) {
    navBrand.innerHTML = '<span class="nav-name">Anand Kumar</span><span class="nav-scope">systems / embedded / security / edge-ai</span>';
}
const codeComment = document.querySelector('.code-content .comment');
if (codeComment) codeComment.textContent = '// Systems software | Linux/UNIX | security | embedded | edge AI';

const cradlewiseItem = [...document.querySelectorAll('.timeline-item')]
    .find((item) => item.querySelector('.company')?.textContent.includes('Cradlewise'));
if (cradlewiseItem) {
    const content = cradlewiseItem.querySelector('.timeline-content');
    content.innerHTML = `
        <div class="timeline-header"><h3>Embedded Software Engineer</h3><span class="company">Cradlewise Inc</span><span class="duration">Jul 2022 – Jan 2024</span></div>
        <p class="timeline-subtitle">Embedded Linux, connected devices, vision and production validation</p>
        <ul class="timeline-list">
            <li><strong>Embedded product & connectivity:</strong> designed and implemented first-time device onboarding and provisioning, using BLE for initial discovery and Wi-Fi credential provisioning before handoff to Wi-Fi. Built Linux device services and debugged system-level integration issues.</li>
            <li><strong>Vision & hardware integration:</strong> integrated and debugged camera and media pipelines across the device stack, working with V4L2, GStreamer and OpenCV alongside hardware/software interfaces.</li>
            <li><strong>Bring-up & manufacturing validation:</strong> led board bring-up and manufacturing test automation with Python/PyQt tools and automated jigs across compute, camera and power boards. Covered secure firmware provisioning, CPU/GPU/video workloads, I2C/SPI peripherals, camera calibration, power/cable checks, motor/accelerometer tests, and FFT-based speaker/microphone analysis.</li>
            <li><strong>Production systems:</strong> integrated test results with AWS for traceability and remote failure diagnosis; led board validation in China, end-of-line system integration in Vietnam, and remote resolution of production issues with factory operators.</li>
        </ul>
        <div class="tech-tags"><span class="tag">Embedded Linux</span><span class="tag">BLE / Wi-Fi</span><span class="tag">V4L2</span><span class="tag">GStreamer</span><span class="tag">OpenCV</span><span class="tag">Python / PyQt</span><span class="tag">AWS</span></div>`;
}
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Typing Animation
// ===================================

const typingText = document.querySelector('.typing-text');
const phrases = [
    'Systems Software Engineer',
    'Linux / UNIX & POSIX',
    'Embedded Systems',
    'Computer Vision & Edge AI',
    'AI Systems / Accelerated Computing'
];

// Keep the resume action visible without changing the existing visual layout.
const heroButtons = document.querySelector('.hero-buttons');
if (heroButtons) {
    const resume = document.createElement('a');
    resume.className = 'btn btn-secondary';
    resume.textContent = 'Resume (coming soon)';
    resume.setAttribute('aria-disabled', 'true');
    resume.setAttribute('title', 'Public Systems Software Engineer resume coming soon');
    resume.style.opacity = '0.55';
    resume.style.pointerEvents = 'none';
    heroButtons.appendChild(resume);
}

document.querySelectorAll('.timeline-list li').forEach((item) => {
    item.innerHTML = item.innerHTML
        .replace('profile metrics record', 'measured results include')
        .replace('and few-shot approaches', 'transfer-learning approaches');
});


let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation
setTimeout(typeEffect, 1000);

// ===================================
// Particle Background Animation
// ===================================

const particlesContainer = document.querySelector('.hero-particles');
const particleCount = 50;

function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(100, 255, 218, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
    
    return particle;
}

// Add particles
for (let i = 0; i < particleCount; i++) {
    particlesContainer.appendChild(createParticle());
}

// Add float animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-category')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category, .timeline-item').forEach(el => {
    observer.observe(el);
});

// ===================================
// Dynamic Stats Counter
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            // Extract number from text (e.g., "99.7%" -> 99.7)
            const match = text.match(/[\d.]+/);
            if (match) {
                const number = parseFloat(match[0]);
                const suffix = text.replace(match[0], '');
                
                let current = 0;
                const increment = number / 100;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        statNumber.textContent = number + suffix;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = current.toFixed(1) + suffix;
                    }
                }, 20);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// Active Navigation Link Highlighting
// ===================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Project Card Tilt Effect
// ===================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// Terminal Cursor Blink
// ===================================

setInterval(() => {
    document.querySelectorAll('.cursor-blink').forEach(cursor => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    });
}, 500);

// ===================================
// Scroll Progress Indicator
// ===================================

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #64ffda, #50fa7b);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===================================
// Copy Email Functionality (if needed)
// ===================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show notification
        const notification = document.createElement('div');
        notification.textContent = 'Copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #64ffda;
            color: #0a192f;
            padding: 15px 25px;
            border-radius: 5px;
            font-family: 'JetBrains Mono', monospace;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    });
}

// ===================================
// Easter Egg: Konami Code
// ===================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ===================================
// Performance Optimization
// ===================================

// Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Console Message
// ===================================

console.log('%c👋 Hello, fellow developer!', 'color: #64ffda; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'color: #8892b0; font-size: 14px;');
console.log('%c🚀 Built with vanilla JavaScript, HTML, and CSS', 'color: #64ffda; font-size: 12px;');

// ===================================
// Initialize
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
    
    // Initialize scroll progress
    updateScrollProgress();
    
    // Highlight current navigation
    highlightNavigation();
});

// Made with Bob
