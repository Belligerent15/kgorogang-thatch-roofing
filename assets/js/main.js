document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Mobile Menu Toggle Functionality --- */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Initially hide the mobile menu completely off-canvas using transform
    if (mobileMenu) {
        mobileMenu.style.transform = 'translateX(100%)';
        mobileMenu.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    function openMobileMenu() {
        if (mobileMenu) {
            mobileMenu.style.transform = 'translateX(0)';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.style.transform = 'translateX(100%)';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when clicking any link inside it
    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    /* --- 2. Navbar Scroll Effects (Glassmorphism on Scroll) --- */
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        }
    });

    /* --- 3. Simple Contact Form Submission Handler --- */
    const contactForm = document.querySelector('form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form details (ready for backend / email service integration)
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            console.log('Consultation Inquiry Submitted:', data);

            // Provide a refined success feedback UI state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Inquiry Received Successfully';
                submitButton.style.backgroundColor = '#c5a059';
                submitButton.style.color = '#050505';
                submitButton.disabled = true;

                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    contactForm.reset();
                }, 4000);
            }
        });
    }

});
