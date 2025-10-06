document.addEventListener('DOMContentL  oaded', () => {
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
                alert('an error occured.');
                contactForm.reset(); // Clear the form
            }
        });
    }
     function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
     
});

