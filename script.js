// ===================================
// Navigation & Scroll Effects
// ===================================

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const navBrand = document.querySelector('.nav-brand');
if (navBrand) {
    navBrand.innerHTML = '<span class="nav-name">Anand Kumar</span><span class="nav-scope">systems / embedded / security / edge-ai</span>';
}
const notesLink = document.createElement('li');
notesLink.innerHTML = '<a href="/notes/" class="nav-link">Notes</a>';
document.querySelector('.nav-menu')?.appendChild(notesLink);
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
            <li><strong>Production systems:</strong> integrated test results with AWS for traceability and remote failure diagnosis; led board-level manufacturing validation in China and final assembled-product integration and testing in Vietnam, including remote production troubleshooting with factory operators.</li>
        </ul>
        <div class="tech-tags"><span class="tag">Embedded Linux</span><span class="tag">BLE / Wi-Fi</span><span class="tag">V4L2</span><span class="tag">GStreamer</span><span class="tag">OpenCV</span><span class="tag">Python / PyQt</span><span class="tag">AWS</span></div>`;
}

const ibmExperience = [...document.querySelectorAll('.timeline-item')]
    .find((item) => item.querySelector('.company')?.textContent.includes('IBM'));
if (ibmExperience) {
    const content = ibmExperience.querySelector('.timeline-content');
    content.innerHTML = `
        <div class="timeline-header"><h3>Advisory System Development Engineer</h3><span class="company">IBM</span><span class="duration">Feb 2024 – Present</span></div>
        <p class="timeline-subtitle">Core OS · UNIX Systems · Security</p>
        <ul class="timeline-list">
            <li>Engineered low-level C/POSIX systems software for enterprise UNIX services, adapting runtime behavior and platform assumptions across operating-system boundaries.</li>
            <li>Implemented and integrated authentication/authorization, process-identity validation, UID/EUID transitions and privileged execution in an IBM z/OS UNIX and RACF/SAF environment.</li>
            <li>Debugged identity, environment, execution and security-sensitive failures across OpenSSH/SFTP, sudo integration and OS utilities; hardened error handling and runtime behavior.</li>
            <li>Owned substantial work from platform-gap analysis and implementation through security analysis, testing, build configuration, packaging and product delivery, coordinating with upstream and cross-team contributors.</li>
        </ul>
        <div class="tech-tags"><span class="tag">C / POSIX</span><span class="tag">Core OS</span><span class="tag">z/OS UNIX</span><span class="tag">RACF / SAF</span><span class="tag">Security</span></div>`;
}

function addArchitecture(item, label, flow) {
    if (!item) return;
    const visual = document.createElement('div');
    visual.className = 'architecture-visual';
    visual.innerHTML = `<span class="architecture-label">${label}</span><div class="architecture-flow">${flow.map((step, i) => `<span class="architecture-step">${step}</span>${i < flow.length - 1 ? '<span class="architecture-arrow">→</span>' : ''}`).join('')}</div>`;
    item.querySelector('.timeline-content')?.appendChild(visual);
}

const ibmItem = [...document.querySelectorAll('.timeline-item')]
    .find((item) => item.querySelector('.company')?.textContent.includes('IBM'));
addArchitecture(ibmItem, 'Where the systems work sits', [
    'Applications / Users', 'z/OS UNIX', 'OpenSSH / sudo / shell & utilities', 'SAF / RACF', 'z/OS'
]);

addArchitecture(cradlewiseItem, 'Embedded product path', [
    'BLE onboarding', 'Wi-Fi provisioning', 'ARM / Linux services', 'V4L2 / GStreamer / OpenCV', 'Edge ML'
]);

const cadItem = [...document.querySelectorAll('.timeline-item')]
    .find((item) => item.querySelector('.company')?.textContent.includes('CAD Lab'));
if (cadItem) {
    const content = cadItem.querySelector('.timeline-content');
    content.innerHTML = `
        <div class="timeline-header"><h3>CNC Digital Twin for Tool Health & Remaining Useful Life</h3><span class="company">CAD Lab, IISc Bangalore</span><span class="duration">Dec 2021 – Jun 2022</span></div>
        <p class="timeline-subtitle">Virtual sensing and tool-wear prediction for CNC machining</p>
        <p>Built an end-to-end research pipeline that reconciled physical and machine-side signals into a synchronized dataset for virtual force sensing, progressive flank-wear prediction and remaining useful life estimation.</p>
        <ul class="timeline-list">
            <li><strong>Instrumentation:</strong> combined accelerometer, acoustic-emission, thermocouple, CNC controller telemetry and dynamometer reference-force measurements during controlled machining experiments.</li>
            <li><strong>Signal engineering:</strong> synchronized heterogeneous, multi-rate acquisition sources through preprocessing, filtering of active cutting cycles, windowing and downsampling.</li>
            <li><strong>Two-stage ML system:</strong> used a time-series deep-learning virtual soft sensor to estimate cutting forces from non-invasive signals, then combined inferred force, acoustic emission and machining parameters for flank-wear and RUL estimation.</li>
        </ul>
        <details class="technical-details"><summary>Technical details</summary><p>Controller telemetry and sensor streams were aligned so that high-frequency vibration and acoustic signals could be analyzed alongside lower-frequency controller and thermal measurements. The work also investigated transfer-learning/generalization across machining experiments and changing conditions.</p></details>
        <div class="architecture-visual"><span class="architecture-label">CNC tool-health pipeline</span><div class="architecture-flow"><span class="architecture-step">CNC lathe</span><span class="architecture-arrow">→</span><span class="architecture-step">Accelerometer · AE · temperature · telemetry · reference force</span><span class="architecture-arrow">→</span><span class="architecture-step">Synchronization + preprocessing</span><span class="architecture-arrow">→</span><span class="architecture-step">Virtual force sensor</span><span class="architecture-arrow">→</span><span class="architecture-step">Tool wear / RUL</span></div></div>
        <div class="tech-tags"><span class="tag">Time-series ML</span><span class="tag">Signal Processing</span><span class="tag">Sensor Fusion</span><span class="tag">Transfer Learning</span></div>`;
}
const education = document.querySelector('.education');
if (education) {
    education.innerHTML = `<div class="container"><h2 class="section-title"><span class="title-number">05.</span> Education</h2><div class="education-entry"><h3>Indian Institute of Science (IISc), Bangalore</h3><p><strong>M.Tech — Smart Manufacturing</strong> · 2020–2022</p><p class="education-label">Systems &amp; Computing Focus</p><p class="education-focus">Embedded Systems · TCP/IP &amp; Networking · Processor Design · High-Performance Computing · Computer Vision · Machine Learning</p><p class="education-summary">Applied this coursework through hands-on systems and research projects spanning embedded computing, sensing, computer vision and ML-driven manufacturing systems.</p></div><div class="education-entry"><h3>M.Tech — Computer Science &amp; Engineering</h3><p>Lakshmi Narain College of Technology · 2018–2020</p></div><div class="education-entry"><h3>B.E. — Information Technology</h3><p>Lakshmi Narain College of Technology · 2012–2016</p></div></div>`;
}

const researchSection = [...document.querySelectorAll('section.experience')]
    .find((section) => section.querySelector('.section-title')?.textContent.includes('Research Experience'));
if (researchSection) {
    const contactSection = document.querySelector('#contact');
    if (contactSection) contactSection.parentNode.insertBefore(researchSection, contactSection);
    const timeline = researchSection.querySelector('.timeline');
    if (timeline && !timeline.textContent.includes('I3D Lab')) {
        const i3d = document.createElement('div');
        i3d.className = 'timeline-item';
        i3d.innerHTML = `<div class="timeline-dot"></div><div class="timeline-content"><div class="timeline-header"><h3>Student Researcher</h3><span class="company">I3D Lab, IISc Bangalore</span><span class="duration">Jun 2021 – Nov 2021</span></div><p class="timeline-subtitle">Robotics, augmented reality and human-robot interaction</p><ul class="timeline-list"><li>Developed gesture-recognition and spatial-mapping pipelines using Microsoft HoloLens.</li><li>Worked with ROS and communication protocols for human-robot interaction and robotic control systems.</li></ul><div class="tech-tags"><span class="tag">HoloLens</span><span class="tag">ROS</span><span class="tag">Spatial Mapping</span><span class="tag">Gesture Recognition</span></div></div>`;
        timeline.appendChild(i3d);
    }
}

const projectsGrid = document.querySelector('#projects .projects-grid');
if (projectsGrid) {
    projectsGrid.innerHTML = `
        <div class="project-card project-card-featured"><div class="project-header"><i class="fas fa-shield-alt"></i></div><h3 class="project-title">OS Security & Privileged Execution</h3><p class="project-subtitle">IBM · Enterprise UNIX / IBM z/OS</p><p class="project-description">Engineered major parts of the adaptation and productization of a mature privileged-execution subsystem for an enterprise OS, spanning C/POSIX portability, process identity, native authentication, privilege transitions, security hardening and delivery.</p><p class="project-description"><strong>Core OS integration:</strong> account and group structures, runtime APIs, environment handling, UID/EUID transitions and privileged subprocess execution.</p><p class="project-description"><strong>Security architecture:</strong> RACF/SAF authentication, identity validation, credential handling and command-policy integration.</p><p class="project-description"><strong>Lifecycle ownership:</strong> source analysis → platform-gap analysis → implementation → debugging → hardening → testing and scanning → build → packaging and delivery.</p><div class="architecture-visual"><span class="architecture-label">OS security path</span><div class="architecture-flow"><span class="architecture-step">Users / Applications</span><span class="architecture-arrow">→</span><span class="architecture-step">UNIX System Services</span><span class="architecture-arrow">→</span><span class="architecture-step">OpenSSH · Privileged Execution · UNIX Utilities</span><span class="architecture-arrow">↔</span><span class="architecture-step">Policy / Identity → SAF / RACF → z/OS Services</span></div></div><div class="project-tech"><span>IBM</span><span>C / POSIX</span><span>Core OS</span><span>Security</span></div></div>
        <div class="project-card"><div class="project-header"><i class="fas fa-link"></i></div><h3 class="project-title">Embedded Linux & Connected Systems</h3><p class="project-subtitle">Cradlewise</p><p class="project-description">ARM/Linux device services, BLE-to-Wi-Fi onboarding and provisioning, connectivity, hardware interfaces, V4L2/GStreamer/OpenCV camera and media pipelines, and system-level debugging.</p><div class="project-tech"><span>Embedded Linux</span><span>BLE / Wi-Fi</span><span>OpenCV</span></div></div>
        <div class="project-card"><div class="project-header"><i class="fas fa-industry"></i></div><h3 class="project-title">Product Bring-up & Edge Intelligence</h3><p class="project-subtitle">Cradlewise</p><p class="project-description">Python/PyQt manufacturing automation, secure firmware provisioning, compute/camera/power validation, CPU/GPU and peripheral tests, camera calibration, audio/motor/sensor validation, Edge ML, AWS traceability and China/Vietnam production engineering.</p><div class="project-tech"><span>Python / PyQt</span><span>Bring-up</span><span>Edge ML</span><span>AWS</span></div></div>
        <div class="project-card"><div class="project-header"><i class="fas fa-wave-square"></i></div><h3 class="project-title">Industrial Sensing, Virtual Sensors & ML</h3><p class="project-subtitle">IISc CAD Lab</p><p class="project-description">End-to-end CNC system: multi-rate sensing → synchronization and preprocessing → virtual cutting-force sensing → tool-wear and RUL prediction → transfer/generalization experiments.</p><div class="architecture-visual"><div class="architecture-flow"><span class="architecture-step">CNC machining</span><span class="architecture-arrow">→</span><span class="architecture-step">Sensors + controller telemetry</span><span class="architecture-arrow">→</span><span class="architecture-step">Synchronization</span><span class="architecture-arrow">→</span><span class="architecture-step">Virtual force</span><span class="architecture-arrow">→</span><span class="architecture-step">Tool wear / RUL</span></div></div><div class="project-tech"><span>Signal Processing</span><span>Sensor Fusion</span><span>Time-series ML</span></div></div>`;
    projectsGrid.querySelector('.project-card-featured')?.classList.add('project-card-featured');
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
