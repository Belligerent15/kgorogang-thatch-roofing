/* ==========================================================================
   MAIN.JS
   Core Application Entry Point and Module Integrator for Kgorogang Thatch Roofing
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Kgorogang Thatch Roofing initialized successfully.');

    // 1. Initialize Active Navigation Highlighting on Scroll
    initActiveNavHighlight();

    // 2. Initialize Dynamic Year Stamping for Copyright Notices
    initDynamicYear();

    // 3. Initialize Lazy Loading / Fade-In Fallbacks for Images
    initImageFallbacks();
});

/**
 * Highlights the correct header navigation link based on current scroll position
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const highlightNavOnScroll = () => {
        const scrollPosition = window.pageYOffset + 150;

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
    };

    window.addEventListener('scroll', highlightNavOnScroll);
}

/**
 * Automatically sets the current year in footer copyright elements
 */
function initDynamicYear() {
    const yearElements = document.querySelectorAll('.current-year, #current-year');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

/**
 * Handles image load errors gracefully by applying a fallback or placeholder state
 */
function initImageFallbacks() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            this.style.border = '1px dashed var(--color-glass-border, rgba(255, 255, 255, 0.1))';
            // Optional: assign a placeholder or alt styling if image asset is missing
        });
    });
}
