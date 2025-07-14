// Typed.js initialization for dynamic text
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS (replace with your EmailJS public key)
    emailjs.init("YOUR_PUBLIC_KEY"); // Get this from https://www.emailjs.com/
    
    // Initialize typed text animation
    const typed = new Typed('.text', {
        strings: ['Software Engineer', 'Data Scientist', 'AI/ML Enthusiast', 'Data Analyst', 'DL Engineer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('bx-menu');
                icon.classList.add('bx-x');
            } else {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        });
        
        // Close mobile menu when clicking a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            });
        });
    }

    // Contact form submission with EmailJS
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('user_name');
            const email = formData.get('user_email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormStatus('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            showFormStatus('Sending your message...', 'loading');
            
            // EmailJS send (replace with your service details)
            emailjs.send(
                'YOUR_SERVICE_ID',    // Replace with your EmailJS service ID
                'YOUR_TEMPLATE_ID',   // Replace with your EmailJS template ID
                {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_email: 'hemanthyembuluri777@gmail.com'
                }
            ).then(function(response) {
                showFormStatus('✅ Thank you! Your message has been sent successfully. I will get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }).catch(function(error) {
                console.error('EmailJS Error:', error);
                showFormStatus('❌ Sorry, there was an error sending your message. Please try again or contact me directly at hemanthyembuluri777@gmail.com', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

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

    // Observe skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe certificate cards
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add loading animation to buttons and handle navigation
    const buttons = document.querySelectorAll('.btn-box');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Handle different button types
            if (this.type === 'submit') {
                // Let form submission handle this
                return;
            }
            
            if (this.classList.contains('download-resume')) {
                // Let downloadResume function handle this
                return;
            }
            
            // Handle navigation buttons
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active navigation link
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === href) {
                            link.classList.add('active');
                        }
                    });
                }
            }
            
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn-box {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Mobile menu toggle (for future enhancement)
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    console.log('Portfolio website loaded successfully!');
});

// Resume download function
function downloadResume(event) {
    event.preventDefault();
    
    // Create a temporary message
    const button = event.target.closest('.download-resume');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="bx bx-loader bx-spin"></i> Preparing...';
    
    setTimeout(() => {
        // Check if resume file exists
        const resumeFileName = 'Hemanth Resume.pdf';
        const link = document.createElement('a');
        link.href = resumeFileName;
        link.download = resumeFileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Try to download the file
        try {
            link.click();
            // Show success message
            showNotification('Resume download started!', 'success');
        } catch (error) {
            // Show error message if file not found
            showNotification('Resume file not found. Please add "Hemanth Resume.pdf" to your project root folder.', 'error');
        }
        
        document.body.removeChild(link);
        button.innerHTML = originalText;
    }, 1000);
    
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
        border: 1px solid ${type === 'success' ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)'};
        color: ${type === 'success' ? '#00ff00' : '#ff6b6b'};
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1000;
        font-weight: 500;
        max-width: 300px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Certificate modal functions
function openCertificateModal(imageSrc, title) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalCertificateImage');
    const modalTitle = document.getElementById('modalCertificateTitle');
    
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modal.style.display = 'block';
    
    // Add escape key listener
    document.addEventListener('keydown', handleEscapeKey);
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeCertificateModal();
    }
}

// Close modal when clicking outside the image
document.getElementById('certificateModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeCertificateModal();
    }
});
