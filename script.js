// Add your JavaScript code here
// Modern interactive website functionality

class PersonalWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileNavigation();
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupSkillBars();
        this.setupStatCounters();
        this.setupContactForm();
        this.setupParallaxEffects();
        this.setupIntersectionObserver();
    }

    // Mobile navigation toggle
    setupMobileNavigation() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuToggle.classList.toggle('active');

                // Animate toggle bars
                const bars = menuToggle.querySelectorAll('span');
                bars.forEach((bar, index) => {
                    if (navLinks.classList.contains('active')) {
                        if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                        if (index === 1) bar.style.opacity = '0';
                        if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                    } else {
                        bar.style.transform = 'none';
                        if (index === 1) bar.style.opacity = '1';
                    }
                });
            });

            // Close mobile menu on link click
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.querySelectorAll('span').forEach(bar => {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    });
                });
            });
        }
    }

    // Smooth scrolling for navigation
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const targetTop = target.offsetTop;
                    const headerHeight = document.querySelector('.header').offsetHeight;

                    window.scrollTo({
                        top: targetTop - headerHeight,
                        behavior: 'smooth'
                    });

                    // Update active navigation link
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
    }

    // Header background change on scroll
    setupScrollAnimations() {
        const header = document.querySelector('.header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // Skill bars animation
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        let animated = false;

        const animateSkillBars = () => {
            if (animated) return;

            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const skillLevel = bar.getAttribute('data-skill');
                    bar.style.width = `${skillLevel}%`;
                }, index * 200);
            });

            animated = true;
        };

        // Animate when skills section comes into view
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillBars();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(skillsSection);
        }
    }

    // Animated stat counters
    setupStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        let animated = false;

        const animateCounters = () => {
            if (animated) return;

            statNumbers.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 100;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                requestAnimationFrame(updateCounter);
            });

            animated = true;
        };

        // Animate when about section comes into view
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(aboutSection);
        }
    }

    // Contact form handling
    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Get form data
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');

                // Basic validation
                if (!name || !email || !message) {
                    alert('Please fill in all fields.');
                    return;
                }

                // Show success message (in a real app, you'd submit to a server)
                alert(`Thank you ${name}! Your message has been sent successfully.`);
                contactForm.reset();
            });
        }
    }

    // Parallax effects for floating elements
    setupParallaxEffects() {
        const floatingElements = document.querySelectorAll('.floating-element');

        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 2;
                const moveX = (mouseX - 0.5) * speed;
                const moveY = (mouseY - 0.5) * speed;

                element.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            });
        });
    }

    // Intersection Observer for general animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Observe hobby cards for staggered animation
        document.querySelectorAll('.hobby-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
            observer.observe(card);
        });
    }
}

// Utility functions
const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Performance optimizations
const optimizedResize = debounce(() => {
    // Handle resize events here if needed
}, 250);

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PersonalWebsite();

    // Add loading class to body
    document.body.classList.add('loaded');
});

// Add some additional CSS for animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }

        .section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .section.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .hobby-card {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hobby-card.visible {
            opacity: 1;
            transform: translateY(0);
        }

        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 100%;
                left: 0;
                right: 0;
                background-color: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 2rem;
                transform: translateY(-100%);
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
        }

        body.loaded .hero-content {
            animation: slideInUp 0.8s ease-out;
        }

        body.loaded .hero-image {
            animation: fadeIn 1s ease-out 0.3s both;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .header.scrolled {
            background-color: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
        }
    </style>
`);

// Add some performance optimizations
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
    const target = window.location.hash;
    if (target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: element.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    }
});