// Removed: createTechParticles - dropping elements removed for cleaner UI

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu after clicking a link
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
            }
        }
    });
});

// Form submission handler
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    alert(`Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
    
    // Reset form
    this.reset();
});

// Animated typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add Java, Spring, Hibernate, Blockchain symbols floating animation
function addFloatingCode() {
    const javaSymbols = [
        '@SpringBoot', '@Autowired', '@Service', '@Repository',
        '@Entity', '@Transactional', 'public class', 'SessionFactory',
        'Block', 'Hash', 'Chain', '⛓️', '🔗', '@Controller',
        'Hibernate', 'JPA', 'Bean', 'Component', 'SmartContract'
    ];
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, sectionIndex) => {
        // Add only 1 Java logo per section, randomly positioned
        if (Math.random() > 0.5) {
            const javaLogo = document.createElement('div');
            const size = Math.random() * 40 + 50;
            javaLogo.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-image: url('java.png');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                left: ${Math.random() * 90}%;
                top: ${Math.random() * 90}%;
                opacity: 0.15;
                animation: float${Math.floor(Math.random() * 2) + 1} ${Math.random() * 10 + 10}s ease-in-out infinite;
                pointer-events: none;
                z-index: 0;
            `;
            section.style.position = 'relative';
            section.appendChild(javaLogo);
        }
        
        for (let i = 0; i < 8; i++) {
            const symbol = javaSymbols[Math.floor(Math.random() * javaSymbols.length)];
            const colors = ['rgba(230, 90, 0, 0.15)', 'rgba(76, 175, 80, 0.15)', 'rgba(247, 147, 26, 0.15)', 'rgba(89, 102, 108, 0.15)'];
            
            const code = document.createElement('div');
            code.textContent = symbol;
            code.style.cssText = `
                position: absolute;
                font-family: 'Courier New', monospace;
                font-size: ${Math.random() * 35 + 20}px;
                color: ${colors[Math.floor(Math.random() * colors.length)]};
                font-weight: bold;
                left: ${Math.random() * 90}%;
                top: ${Math.random() * 90}%;
                animation: float${Math.floor(Math.random() * 2) + 1} ${Math.random() * 10 + 10}s ease-in-out infinite;
                pointer-events: none;
                z-index: 0;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            `;
            section.style.position = 'relative';
            section.appendChild(code);
        }
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'fadeInUp 1s ease forwards';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .timeline-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Active navigation highlight
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
let mobileMenuCreated = false;
function createMobileMenu() {
    if (mobileMenuCreated) return; // Prevent duplicate creation
    
    const nav = document.querySelector('nav .container');
    const menuBtn = document.createElement('button');
    menuBtn.classList.add('mobile-menu-btn');
    menuBtn.innerHTML = '☰';
    menuBtn.setAttribute('aria-label', 'Toggle menu');
    
    nav.insertBefore(menuBtn, nav.firstChild);
    
    menuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('mobile-active');
        
        // Change icon based on state
        if (navLinks.classList.contains('mobile-active')) {
            menuBtn.innerHTML = '✕';
        } else {
            menuBtn.innerHTML = '☰';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const navLinks = document.querySelector('.nav-links');
        const isClickInsideNav = nav.contains(event.target);
        
        if (!isClickInsideNav && navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
            menuBtn.innerHTML = '☰';
        }
    });
    
    // Handle resize to close menu when switching to desktop
    window.addEventListener('resize', function() {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth > 768 && navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
            menuBtn.innerHTML = '☰';
        }
    });
    
    mobileMenuCreated = true;
}

// Removed: createBinaryRain - code rain effect removed for cleaner UI

// Optimized smooth cursor trail effect with infinity icon
let cursorTrail = [];
let lastX = 0;
let lastY = 0;
let mouseX = 0;
let mouseY = 0;

// Create custom cursor
const customCursor = document.createElement('div');
customCursor.className = 'custom-cursor';
document.body.appendChild(customCursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
cursorDot.innerHTML = '∞'; // Infinity symbol
document.body.appendChild(cursorDot);

// Smooth cursor movement with RAF
let rafId;
function updateCursor() {
    const dx = mouseX - parseFloat(customCursor.style.left || mouseX);
    const dy = mouseY - parseFloat(customCursor.style.top || mouseY);
    
    customCursor.style.left = mouseX + 'px';
    customCursor.style.top = mouseY + 'px';
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    
    rafId = requestAnimationFrame(updateCursor);
}

updateCursor();

// Track mouse position
let trailThrottle = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create trail with throttling for performance
    const now = Date.now();
    if (now - trailThrottle > 80) { // Reduced frequency
        const distance = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
        
        if (distance > 15) { // Increased threshold
            const trail = document.createElement('div');
            trail.className = 'cursor-trail-smooth';
            trail.innerHTML = '∞';
            trail.style.cssText = `
                position: fixed;
                font-size: 12px;
                color: rgba(230, 90, 0, 0.4);
                pointer-events: none;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                transform: translate(-50%, -50%);
                z-index: 9998;
                animation: infinityFade 1s ease-out forwards;
            `;
            document.body.appendChild(trail);
            
            cursorTrail.push(trail);
            if (cursorTrail.length > 10) { // Reduced max trails
                const oldTrail = cursorTrail.shift();
                if (oldTrail && oldTrail.parentNode) {
                    oldTrail.remove();
                }
            }
            
            lastX = e.clientX;
            lastY = e.clientY;
        }
        trailThrottle = now;
    }
});

// Add hover effect for interactive elements using event delegation
document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, .btn, input, textarea, [role="button"]');
    if (target) {
        cursorDot.classList.add('cursor-hover');
        cursorDot.style.color = '#2563eb';
    }
});

document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, .btn, input, textarea, [role="button"]');
    if (target) {
        cursorDot.classList.remove('cursor-hover');
        cursorDot.style.color = '#ff6b00';
    }
});

// Hide default cursor
document.body.style.cursor = 'none';
document.querySelectorAll('a, button, .btn, input, textarea').forEach(el => {
    el.style.cursor = 'none';
});

const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .custom-cursor {
        display: none;
    }
    
    .cursor-dot {
        position: fixed;
        font-size: 28px;
        color: #ff6b00;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 10000;
        transition: transform 0.1s ease, color 0.2s ease;
        will-change: transform;
        font-weight: bold;
    }
    
    .cursor-dot.cursor-hover {
        transform: translate(-50%, -50%) scale(1.4);
        color: #2563eb !important;
    }
    
    @keyframes infinityFade {
        0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 0.6;
        }
        100% {
            transform: translate(-50%, -50%) scale(0.3) rotate(180deg);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .custom-cursor,
        .cursor-dot,
        .cursor-trail-smooth {
            display: none !important;
        }
        body, body * {
            cursor: auto !important;
        }
    }
`;
document.head.appendChild(cursorStyles);

// Initialize all effects
window.addEventListener('DOMContentLoaded', () => {
    addFloatingCode();
    createMobileMenu(); // Create once on load
    
    // Typing effect for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => typeWriter(subtitle, originalText, 30), 1000);
    }
});
