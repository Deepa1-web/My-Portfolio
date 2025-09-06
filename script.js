document.addEventListener('DOMContentLoaded', () => {
     // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
     const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('footer p');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} Deepa Paneru. All rights reserved.`;
    }
    
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
             const nameInput = contactForm.querySelector('input[type="text"][placeholder=" Name"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');
 // Simple validation checks
            if (nameInput.value.trim() === '') {
                alert('Please enter your name.');
                isValid = false;
            } else if (emailInput.value.trim() === '') {
                alert('Please enter your email.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                alert('Please enter a valid email address.');
                isValid = false;
            } else if (messageInput.value.trim() === '') {
                alert('Please enter a message.');
                isValid = false;
            }
             if (!isValid) {
                e.preventDefault(); // Stop form submission if invalid
            } else {  e.preventDefault();
                alert('Thank you for your message! Your form has been submitted.');
                contactForm.reset(); // Clear the form
            }
        });
    }
     function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
      // A button or element that becomes visible on scroll
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.textContent = '↑';
    scrollToTopBtn.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopBtn);
  // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
      scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});

