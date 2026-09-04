/* ==========================================================================
   GSAP-SETUP.JS
   GSAP and ScrollTrigger Global Animations for Kgorogang Thatch Roofing
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Fade Up Reveal Animations for Sections & Cards
        const fadeUpElements = document.querySelectorAll('.fade-up, .service-card, .project-card, .testimonial-card');
        fadeUpElements.forEach((element) => {
            gsap.fromTo(element, 
                { 
                    opacity: 0, 
                    y: 50 
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                }
            );
        });

        // 2. Split Layout Stagger Animations
        const splitLayouts = document.querySelectorAll('.split-layout');
        splitLayouts.forEach((layout) => {
            const children = layout.children;
            gsap.fromTo(children,
                {
                    opacity: 0,
                    y: 40
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: layout,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                }
            );
        });

        // 3. Parallax Background Image Effect for Hero Sections
        const parallaxHeroes = document.querySelectorAll('.hero-slide, .parallax-bg');
        parallaxHeroes.forEach((hero) => {
            gsap.to(hero, {
                backgroundPosition: '50% 100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

        // 4. Section Title Header Reveal
        const sectionTitles = document.querySelectorAll('.section-header, h2');
        sectionTitles.forEach((title) => {
            gsap.fromTo(title,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                }
            );
        });

        // Refresh ScrollTrigger after full window load to ensure accurate positioning
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });
    } else {
        console.warn('GSAP or ScrollTrigger is not loaded on this page.');
    }
});
