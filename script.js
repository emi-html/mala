// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => {
    n.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

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

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
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
}

window.addEventListener('scroll', updateActiveNav);

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Gallery Lightbox with Navigation
const galleryImages = document.querySelectorAll('.gallery-img');
const body = document.body;

// Store all gallery images data
const galleryData = Array.from(galleryImages).map(img => ({
    src: img.src,
    alt: img.alt
}));

let currentImageIndex = 0;
let currentLightbox = null;

function createLightbox(imgIndex) {
    // Remove existing lightbox if any
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        document.body.removeChild(existingLightbox);
    }
    
    currentImageIndex = imgIndex;
    
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox active';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-label', 'Image lightbox');
    currentLightbox = lightbox;
    
    // Create lightbox content
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    // Create navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-nav lightbox-prev';
    prevBtn.innerHTML = '&#8249;';
    prevBtn.setAttribute('aria-label', 'Previous image');
    if (currentImageIndex === 0) {
        prevBtn.classList.add('disabled');
    }
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-nav lightbox-next';
    nextBtn.innerHTML = '&#8250;';
    nextBtn.setAttribute('aria-label', 'Next image');
    if (currentImageIndex === galleryData.length - 1) {
        nextBtn.classList.add('disabled');
    }
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'lightbox-image-container';
    
    // Create image
    const lightboxImg = document.createElement('img');
    lightboxImg.src = galleryData[currentImageIndex].src;
    lightboxImg.alt = galleryData[currentImageIndex].alt;
    lightboxImg.className = 'lightbox-img';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    
    // Create caption
    const caption = document.createElement('div');
    caption.className = 'lightbox-caption';
    caption.textContent = `${currentImageIndex + 1} / ${galleryData.length} - ${galleryData[currentImageIndex].alt}`;
    
    // Assemble lightbox
    imageContainer.appendChild(lightboxImg);
    lightboxContent.appendChild(closeBtn);
    lightboxContent.appendChild(prevBtn);
    lightboxContent.appendChild(nextBtn);
    lightboxContent.appendChild(imageContainer);
    lightboxContent.appendChild(caption);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    // Prevent body scroll
    body.style.overflow = 'hidden';
    
    // Navigation functions
    const showNext = () => {
        if (currentImageIndex < galleryData.length - 1) {
            currentImageIndex++;
            updateLightboxImage();
        }
    };
    
    const showPrev = () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateLightboxImage();
        }
    };
    
    const updateLightboxImage = () => {
        lightboxImg.src = galleryData[currentImageIndex].src;
        lightboxImg.alt = galleryData[currentImageIndex].alt;
        caption.textContent = `${currentImageIndex + 1} / ${galleryData.length} - ${galleryData[currentImageIndex].alt}`;
        
        // Update button states
        prevBtn.classList.toggle('disabled', currentImageIndex === 0);
        nextBtn.classList.toggle('disabled', currentImageIndex === galleryData.length - 1);
        
        // Add fade effect
        imageContainer.style.opacity = '0';
        setTimeout(() => {
            imageContainer.style.opacity = '1';
        }, 150);
    };
    
    // Keyboard navigation handler
    const keyboardHandler = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight' && currentImageIndex < galleryData.length - 1) {
            showNext();
        } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
            showPrev();
        }
    };
    
    // Close function
    const closeLightbox = () => {
        document.removeEventListener('keydown', keyboardHandler);
        lightbox.classList.remove('active');
        setTimeout(() => {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
            body.style.overflow = 'auto';
            currentLightbox = null;
        }, 300);
    };
    
    // Event listeners
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });
    
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', keyboardHandler);
}

// Add click handlers to gallery images
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        createLightbox(index);
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const dates = formData.get('dates');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Create mailto link
        const subject = encodeURIComponent('Booking Inquiry from ' + name);
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone || 'Not provided'}\n` +
            `Dates: ${dates || 'Not specified'}\n\n` +
            `Message:\n${message}`
        );
        
        window.location.href = `mailto:talesofmala@gmail.com?subject=${subject}&body=${body}`;
        
        // Show success message
        alert('Thank you for your inquiry! Your email client should open shortly.');
    });
}

// Intersection Observer for fade-in animations
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
document.querySelectorAll('.feature-card, .amenity-card, .place-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in-up');
        }, index * 100);
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .lightbox {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);
