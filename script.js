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
   



    const contact-Form = document.querySelector('.contact form');
    if (contact-Form) {
        contact-Form.addEventListener('submit', function(e) {
            let isValid = true;
             const nameInput = contact-Form.querySelector('input[type="text"][placeholder=" Name"]');
            const emailInput = contact-Form.querySelector('input[type="email"]');
            const messageInput = contact-Form.querySelector('textarea');
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
                contact-Form.reset(); // Clear the form
            }
        });
    }
     function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
     
});

