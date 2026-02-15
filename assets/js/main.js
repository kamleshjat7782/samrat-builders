/* ============================================
   Samrat Builders - Main JavaScript
   ============================================ */

    

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

   
   
    
    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ============================================
    // Form Submission to Send Email
    // ============================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const emailData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                propertyType: formData.get('property-type'),
                budget: formData.get('budget'),
                message: formData.get('message') || 'No message provided'
            };
            console.log(emailData);

            // Use EmailJS to send the email
            emailjs.send('service_67y5i7o', 'template_xusqmai', emailData)
                .then(response => {
                    alert('Thank you for your message! We will get back to you soon.');
                    form.reset();
                })
                .catch(error => {
                    console.error('Error sending email:', error);
                    alert('There was an error sending your message. Please try again later.');
                });
        });
    });


    // ============================================
    // Download Fetcher for Project Details Page
    // ============================================
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const fileType = this.getAttribute('data-file-type');
            const fileUrl = this.getAttribute('data-file-url');

            fetch(fileUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = `download.${fileType}`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => {
                    console.error('Error downloading file:', error);
                    alert('Failed to download the file. Please try again later.');
                });
        });
    });



});