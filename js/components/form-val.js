/* ==========================================================================
   FORM-VAL.JS
   Client-side Form Validation and Interactive Feedback for Kgorogang Thatch Roofing
   ========================================================================== */

class FormValidator {
    constructor(formElement, options = {}) {
        this.form = formElement;
        this.options = Object.assign({
            successMessage: 'Thank you. Your request has been successfully submitted.',
            errorClass: 'is-invalid',
            validClass: 'is-valid'
        }, options);

        this.init();
    }

    init() {
        if (!this.form) return;

        // Disable native browser validation tooltips to use custom styles
        this.form.setAttribute('novalidate', 'true');

        // Attach submit event listener
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Attach live validation on blur/input for inputs
        const inputs = this.form.querySelectorAll('.form-control, input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains(this.options.errorClass)) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        // Skip hidden or disabled fields
        if (field.disabled || field.type === 'hidden') return true;

        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Check required fields
        if (field.hasAttribute('required') && value === '') {
            isValid = false;
            errorMessage = 'This field is required.';
        } 
        // Check email format
        else if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        } 
        // Check phone format (South African or international general)
        else if (field.type === 'tel' && value !== '') {
            const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
        } 
        // Check minimum length if specified
        else if (field.hasAttribute('minlength') && value.length > 0) {
            const minLength = parseInt(field.getAttribute('minlength'), 10);
            if (value.length < minLength) {
                isValid = false;
                errorMessage = `Must be at least ${minLength} characters long.`;
            }
        }

        this.setFieldStatus(field, isValid, errorMessage);
        return isValid;
    }

    setFieldStatus(field, isValid, message = '') {
        const formGroup = field.closest('.form-group') || field.parentElement;
        let errorElement = formGroup.querySelector('.form-error-message');

        if (!isValid) {
            field.classList.add(this.options.errorClass);
            field.classList.remove(this.options.validClass);

            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'form-error-message';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        } else {
            field.classList.remove(this.options.errorClass);
            field.classList.add(this.options.validClass);

            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const fields = this.form.querySelectorAll('.form-control, input, textarea, select');
        let formIsValid = true;

        fields.forEach(field => {
            const isFieldValid = this.validateField(field);
            if (!isFieldValid) {
                formIsValid = false;
            }
        });

        if (formIsValid) {
            this.handleSuccessfulSubmission();
        } else {
            // Focus the first invalid field for accessibility
            const firstInvalid = this.form.querySelector(`.${this.options.errorClass}`);
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    }

    handleSuccessfulSubmission() {
        const submitButton = this.form.querySelector('button[type="submit"], input[type="submit"]');
        let originalButtonText = '';

        if (submitButton) {
            originalButtonText = submitButton.textContent || submitButton.value;
            submitButton.disabled = true;
            if (submitButton.tagName === 'BUTTON') {
                submitButton.textContent = 'Sending...';
            } else {
                submitButton.value = 'Sending...';
            }
        }

        // Simulate secure async network request / submission handle
        setTimeout(() => {
            let feedbackContainer = this.form.querySelector('.form-success-message');
            if (!feedbackContainer) {
                feedbackContainer = document.createElement('div');
                feedbackContainer.className = 'form-success-message';
                feedbackContainer.style.cssText = 'padding: 1rem; margin-top: 1rem; background: rgba(56, 161, 105, 0.1); border: 1px solid #38a169; color: #38a169; border-radius: 4px; text-align: center; font-size: 0.9rem;';
                this.form.appendChild(feedbackContainer);
            }
            feedbackContainer.textContent = this.options.successMessage;

            this.form.reset();
            this.form.querySelectorAll(`.${this.options.validClass}`).forEach(el => {
                el.classList.remove(this.options.validClass);
            });

            if (submitButton) {
                submitButton.disabled = false;
                if (submitButton.tagName === 'BUTTON') {
                    submitButton.textContent = originalButtonText;
                } else {
                    submitButton.value = originalButtonText;
                }
            }

            // Automatically hide success message after 6 seconds
            setTimeout(() => {
                if (feedbackContainer) {
                    feedbackContainer.remove();
                }
            }, 6000);
        }, 1000);
    }
}

// Automatically initialize all luxury forms on the page
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.form-luxury, .quote-form, .contact-form');
    forms.forEach(form => {
        new FormValidator(form);
    });
});
