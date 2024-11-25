// Typing Animation
const texts = ["Software Engineer", "Electronics Engineer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;

function typeText() {
    const textElement = document.getElementById('text');
    const currentText = texts[textIndex];

    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, typingDelay);
    } else {
        setTimeout(typeText, isDeleting ? erasingDelay : typingDelay);
    }
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Link Button Click Effect
const linkButtons = document.querySelectorAll('.link-button');
linkButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', typeText);

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        
        // Animate each link separately
        const links = navLinks.querySelectorAll('a');
        links.forEach((link, index) => {
            link.style.animation = `fadeIn 0.3s ease forwards ${index * 0.1}s`;
        });
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.style.animation = '';
        });
    }
});

// Enhanced click outside handling
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.style.animation = '';
        });
    }
});

// Add smooth color transition for menu items
const menuLinks = document.querySelectorAll('.nav-links a');
menuLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.transition = 'color 0.3s ease';
        const randomColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
        link.style.color = randomColor;
    });
    
    link.addEventListener('mouseout', () => {
        link.style.color = '';
    });
});
