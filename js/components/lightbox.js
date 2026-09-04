/* ==========================================================================
   LIGHTBOX.JS
   Fullscreen Image Viewer and Gallery Modal for Kgorogang Thatch Roofing
   ========================================================================== */

class Lightbox {
    constructor() {
        this.currentIndex = 0;
        this.items = [];
        this.lightboxElement = null;
        
        this.init();
    }

    init() {
        this.createLightboxDOM();
        this.bindEvents();
    }

    createLightboxDOM() {
        if (document.getElementById('luxury-lightbox')) return;

        const lightboxHTML = `
            <div id="luxury-lightbox" class="lightbox-modal" aria-hidden="true" role="dialog" aria-label="Image gallery lightbox">
                <button class="lightbox-close" aria-label="Close lightbox">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <button class="lightbox-prev" aria-label="Previous image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button class="lightbox-next" aria-label="Next image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <div class="lightbox-content">
                    <img class="lightbox-img" src="" alt="Enlarged project view" />
                    <div class="lightbox-caption"></div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        this.lightboxElement = document.getElementById('luxury-lightbox');
        this.injectStyles();
    }

    injectStyles() {
        if (document.getElementById('lightbox-styles')) return;

        const styleTag = document.createElement('style');
        styleTag.id = 'lightbox-styles';
        styleTag.textContent = `
            .lightbox-modal {
                position: fixed;
                inset: 0;
                z-index: 2000;
                background-color: rgba(5, 5, 5, 0.95);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 300ms ease, visibility 300ms ease;
            }
            .lightbox-modal.active {
                opacity: 1;
                visibility: visible;
            }
            .lightbox-content {
                max-width: 90vw;
                max-height: 85vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            .lightbox-img {
                max-width: 100%;
                max-height: 75vh;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.8);
                border: 1px solid rgba(255,255,255,0.05);
            }
            .lightbox-caption {
                margin-top: 1rem;
                font-family: var(--font-sans, 'Montserrat', sans-serif);
                font-size: 0.95rem;
                color: var(--color-text-secondary, #a0a0a0);
                letter-spacing: 0.05em;
            }
            .lightbox-close, .lightbox-prev, .lightbox-next {
                position: absolute;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #ffffff;
                width: 48px;
                height: 48px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 150ms ease;
                z-index: 2010;
            }
            .lightbox-close:hover, .lightbox-prev:hover, .lightbox-next:hover {
                background-color: var(--color-accent, #c5a059);
                border-color: var(--color-accent, #c5a059);
                color: #050505;
                transform: scale(1.05);
            }
            .lightbox-close { top: 2rem; right: 2rem; }
            .lightbox-prev { left: 2rem; top: 50%; transform: translateY(-50%); }
            .lightbox-next { right: 2rem; top: 50%; transform: translateY(-50%); }
            .lightbox-prev:hover { transform: translateY(-50%) scale(1.05); }
            .lightbox-next:hover { transform: translateY(-50%) scale(1.05); }
        `;
        document.head.appendChild(styleTag);
    }

    bindEvents() {
        // Collect lightbox trigger elements on the page
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-lightbox], .lightbox-trigger, .project-card img');
            if (!trigger) return;

            e.preventDefault();
            this.collectGalleryItems(trigger);
        });

        // Close and navigation events
        this.lightboxElement.querySelector('.lightbox-close').addEventListener('click', () => this.close());
        this.lightboxElement.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
        this.lightboxElement.querySelector('.lightbox-next').addEventListener('click', () => this.next());

        // Close on background click
        this.lightboxElement.addEventListener('click', (e) => {
            if (e.target === this.lightboxElement) {
                this.close();
            }
        });

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (!this.lightboxElement.classList.contains('active')) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    collectGalleryItems(clickedElement) {
        const galleryGroup = clickedElement.getAttribute('data-gallery') || 'default';
        const triggers = document.querySelectorAll(`[data-gallery="${galleryGroup}"], .project-card img, [data-lightbox]`);
        
        this.items = [];
        let targetIndex = 0;

        triggers.forEach((el, index) => {
            const src = el.getAttribute('href') || el.src || el.getAttribute('data-src');
            const caption = el.getAttribute('data-caption') || el.alt || '';
            
            if (src) {
                this.items.push({ src, caption });
                if (el === clickedElement || el.contains(clickedElement)) {
                    targetIndex = this.items.length - 1;
                }
            }
        });

        // Fallback if single item
        if (this.items.length === 0) {
            const src = clickedElement.getAttribute('href') || clickedElement.src;
            const caption = clickedElement.getAttribute('data-caption') || clickedElement.alt || '';
            this.items.push({ src, caption });
            targetIndex = 0;
        }

        this.open(targetIndex);
    }

    open(index) {
        this.currentIndex = index;
        this.updateContent();
        this.lightboxElement.classList.add('active');
        this.lightboxElement.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightboxElement.classList.remove('active');
        this.lightboxElement.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateContent();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateContent();
    }

    updateContent() {
        const currentItem = this.items[this.currentIndex];
        const imgElement = this.lightboxElement.querySelector('.lightbox-img');
        const captionElement = this.lightboxElement.querySelector('.lightbox-caption');

        imgElement.src = currentItem.src;
        captionElement.textContent = currentItem.caption;
        captionElement.style.display = currentItem.caption ? 'block' : 'none';
    }
}

// Automatically initialize Lightbox on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
});
