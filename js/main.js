
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        var menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            
            // Remove animation classes after completion to prevent hover glitches
            entry.target.addEventListener('animationend', function() {
                entry.target.classList.remove('animate-on-scroll', 'animate-fade-in-up');
                entry.target.style.animationDelay = '';
            }, { once: true });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => {
    observer.observe(el);
});
