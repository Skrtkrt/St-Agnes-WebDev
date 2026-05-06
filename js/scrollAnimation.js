window.addEventListener('scroll', reveal);
window.addEventListener('scroll', navbarScroll);

function reveal() {
    let reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
        let windowheight = window.innerHeight;
        let revealtop = reveals[i].getBoundingClientRect().top;
        let revealpoint = 150;

        if(revealtop < windowheight - revealpoint){
            reveals[i].classList.add('active');
        }
        else{
            reveals[i].classList.remove('active');
        }
    }
}

// Navbar scroll effect - transparent to solid
function navbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.remove('transparent');
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.add('transparent');
        navbar.classList.remove('scrolled');
    }
}

// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');

    // Get all gallery images
    const galleryImages = document.querySelectorAll('.carousel .card .img img');
    let currentIndex = 0;

    // Update lightbox counter
    function updateCounter() {
        lightboxCurrent.textContent = currentIndex + 1;
        lightboxTotal.textContent = galleryImages.length;
    }

    // Open lightbox
    galleryImages.forEach((img, index) => {
        img.parentElement.parentElement.addEventListener('click', function() {
            currentIndex = index;
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            updateCounter();
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Navigate images
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
        updateCounter();
    });

    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
        updateCounter();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            lightboxImg.src = galleryImages[currentIndex].src;
            updateCounter();
        }
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            lightboxImg.src = galleryImages[currentIndex].src;
            updateCounter();
        }
    });
});

// Section highlighting (Scroll Spy)
window.addEventListener('scroll', highlightSection);

function highlightSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Form Validation and Feedback
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const feedback = document.getElementById('form-feedback');
    
    let isValid = true;
    let errors = [];
    
    // Reset previous states
    [name, email, message].forEach(field => {
        field.classList.remove('error', 'success');
    });
    
    // Name validation
    if (!name.value.trim()) {
        name.classList.add('error');
        errors.push('Please enter your name');
        isValid = false;
    } else {
        name.classList.add('success');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        email.classList.add('error');
        errors.push('Please enter your email');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        email.classList.add('error');
        errors.push('Please enter a valid email address');
        isValid = false;
    } else {
        email.classList.add('success');
    }
    
    // Message validation
    if (!message.value.trim()) {
        message.classList.add('error');
        errors.push('Please enter your message');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        message.classList.add('error');
        errors.push('Message must be at least 10 characters long');
        isValid = false;
    } else {
        message.classList.add('success');
    }
    
    // Show feedback
    feedback.classList.remove('show', 'success', 'error');
    
    if (!isValid) {
        feedback.innerHTML = '<strong>Please fix the following errors:</strong><br>' + errors.join('<br>');
        feedback.classList.add('show', 'error');
    }
    
    return isValid;
}

function showFormSuccess() {
    const feedback = document.getElementById('form-feedback');
    feedback.innerHTML = '<strong>Success!</strong> Your message has been sent. We\'ll get back to you soon.';
    feedback.classList.remove('show', 'error');
    feedback.classList.add('show', 'success');
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    
    // Remove success classes after delay
    setTimeout(() => {
        document.querySelectorAll('.form-control').forEach(field => {
            field.classList.remove('success');
        });
    }, 3000);
}

function showFormError(errorMsg) {
    const feedback = document.getElementById('form-feedback');
    feedback.innerHTML = '<strong>Error!</strong> ' + errorMsg;
    feedback.classList.remove('show', 'success');
    feedback.classList.add('show', 'error');
}