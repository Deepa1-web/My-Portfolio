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
    // skill..

 const skillBars = document.querySelectorAll('.skill-progress');
            let animationTriggered = false;
            
            // Function to animate skill bars
            function animateSkillBars() {
                if (animationTriggered) return;
                
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.setProperty('--target-width', width);
                    bar.classList.add('animate');
                });
                
                animationTriggered = true;
            }
            
            // Check if skills section is in viewport
            function isElementInViewport(el) {
                const rect = el.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                    rect.bottom >= 0
                );
            }
   // Check on scroll and on load
            function checkScroll() {
                const skillsSection = document.getElementById('skills');
                if (isElementInViewport(skillsSection)) {
                    animateSkillBars();
                }
            }
            
            window.addEventListener('scroll', checkScroll);
            window.addEventListener('load', checkScroll);
       



//conatct-form
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
            } else { 
                 e.preventDefault();
                alert('form submitted successfully.');
            
                contactForm.reset(); // Clear the form
            }
        });
    }
     function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
     
});

