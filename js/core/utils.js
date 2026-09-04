/* ==========================================================================
   UTILS.JS
   Core Utility Functions and Helper Helpers for Kgorogang Thatch Roofing
   ========================================================================== */

/**
 * Debounces a function call to limit how often it can fire.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
export function debounce(func, wait = 250) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

/**
 * Throttles a function call to ensure it runs at most once per specified period.
 * @param {Function} func - The function to throttle.
 * @param {number} limit - The time limit in milliseconds.
 * @returns {Function} - The throttled function.
 */
export function throttle(func, limit = 250) {
    let inThrottle;
    return function(...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Generates a random unique ID string.
 * @param {string} prefix - Optional prefix for the ID.
 * @returns {string} - The unique identifier.
 */
export function generateId(prefix = 'id') {
    return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Formats a number as South African Currency (ZAR).
 * @param {number} amount - The numerical amount.
 * @returns {string} - Formatted currency string (e.g., R 15,000.00).
 */
export function formatCurrencyZAR(amount) {
    return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 2
    }).format(amount);
}

/**
 * Checks if an element is currently in the viewport.
 * @param {HTMLElement} element - The DOM element to check.
 * @returns {boolean} - True if element is visible in viewport.
 */
export function isInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Safely parses JSON data from localStorage with a fallback default.
 * @param {string} key - The localStorage key.
 * @param {*} fallback - Default value if key does not exist or parsing fails.
 * @returns {*} - Parsed data or fallback.
 */
export function getLocalStorage(key, fallback = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return fallback;
    }
}

/**
 * Safely saves data to localStorage.
 * @param {string} key - The localStorage key.
 * @param {*} value - The value to store.
 */
export function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Error saving to localStorage key "${key}":`, error);
    }
}
