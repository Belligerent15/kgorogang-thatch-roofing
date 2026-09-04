/* ==========================================================================
   MAGNETIC.JS
   Magnetic Button and Interactive Element Effect for Kgorogang Thatch Roofing
   ========================================================================== */

class MagneticElement {
    constructor(element, options = {}) {
        this.element = element;
        this.strength = options.strength || 0.4; // Magnetic pull strength
        this.radius = options.radius || 150; // Distance in pixels to trigger effect
        
        this.boundMouseMove = this.onMouseMove.bind(this);
        this.boundMouseLeave = this.onMouseLeave.bind(this);
        
        this.init();
    }

    init() {
        // Only initialize on desktop devices supporting hover
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            this.element.addEventListener('mousemove', this.boundMouseMove);
            this.element.addEventListener('mouseleave', this.boundMouseLeave);
        }
    }

    onMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < this.radius) {
            const x = distanceX * this.strength;
            const y = distanceY * this.strength;

            // Apply smooth translation to the element
            this.element.style.transform = `translate(${x}px, ${y}px)`;
            
            // Optional child elements or inner spans for parallax feel inside the button
            const child = this.element.querySelector('.btn-text, span');
            if (child) {
                child.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
            }
        } else {
            this.reset();
        }
    }

    onMouseLeave() {
        this.reset();
    }

    reset() {
        this.element.style.transform = 'translate(0px, 0px)';
        const child = this.element.querySelector('.btn-text, span');
        if (child) {
            child.style.transform = 'translate(0px, 0px)';
        }
    }
}

// Automatically initialize all magnetic elements on page load
document.addEventListener('DOMContentLoaded', () => {
    const magneticElements = document.querySelectorAll('.magnetic, .btn-magnetic');
    magneticElements.forEach(el => {
        new MagneticElement(el, {
            strength: 0.35,
            radius: 120
        });
    });
});
