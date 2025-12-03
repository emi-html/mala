// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(248, 246, 240, 0.98)';
    } else {
        navbar.style.background = 'rgba(248, 246, 240, 0.95)';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for subtle fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.facility-card, .gallery-item, .contact-item').forEach(el => {
    observer.observe(el);
});

// Gallery image modal functionality
const galleryImages = document.querySelectorAll('.gallery-img');
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        createImageModal(img.src, img.alt);
    });
});

function createImageModal(src, alt) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;

    // Create modal image
    const modalImg = document.createElement('img');
    modalImg.src = src;
    modalImg.alt = alt;
    modalImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    `;

    // Create close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        z-index: 10001;
    `;

    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Close on Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Subtle parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.2;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Preloader Animation Sequence
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    
    // Start the cursive stroke animation immediately
    setTimeout(() => {
        // After 4 seconds, start the fade out
        preloader.classList.add('fade-out');
        
        // After fade out completes, remove preloader and show main content
        setTimeout(() => {
            preloader.style.display = 'none';
            body.classList.add('loaded');
            
            // Add subtle fade-in animation to sections
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
                setTimeout(() => {
                    section.classList.add('fade-in-up');
                }, index * 200);
            });
        }, 1000);
    }, 4000);
});

// Add CSS for enhanced styling
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.6s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .nav-link.active {
        color: var(--antique-gold) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .image-modal {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    /* Subtle hover effects */
    .elegant-hover {
        transition: all 0.3s ease;
    }
    
    .elegant-hover:hover {
        transform: translateY(-3px);
    }
    
    /* Gentle button interactions */
    .cta-button, .contact-button {
        transition: all 0.3s ease;
    }
    
    .cta-button:hover, .contact-button:hover {
        transform: translateY(-2px);
    }
    
    /* Soft focus states */
    input:focus, textarea:focus {
        outline: none;
        border-color: var(--antique-gold);
        box-shadow: 0 0 0 2px rgba(184, 134, 11, 0.1);
    }
`;
document.head.appendChild(style);