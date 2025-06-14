// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Welcome speech function
   // Welcome speech function
function speakWelcomeMessage() {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = "Welcome to Cybvars! We build digital dreams with custom software solutions. " +
                      "Specializing in Flask, Node.js, and modern web technologies. " +
                      "Explore our projects and services to find the perfect solution for your business.";
        speech.volume = 1; // Full volume (0 to 1)
        speech.rate = 1; // Normal speed (1x)
        speech.pitch = 1; // Normal pitch (0 to 2)
        
        // Wait for voices to be loaded
        let voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = function() {
                voices = window.speechSynthesis.getVoices();
                setVoice(voices, speech);
                window.speechSynthesis.speak(speech);
            };
        } else {
            setVoice(voices, speech);
            window.speechSynthesis.speak(speech);
        }
    } else {
        console.log("Speech synthesis not supported");
    }
}

// Helper function to set the best available voice
function setVoice(voices, speech) {
    // Preferred voices in order of preference
    const voicePreferences = [
        { name: 'Google US English', lang: 'en-US' },
        { name: 'Microsoft David - English (United States)', lang: 'en-US' },
        { name: 'Microsoft Zira - English (United States)', lang: 'en-US' },
        { lang: 'en-US' }, // Any US English voice
        { lang: 'en-GB' }  // Fallback to British English
    ];

    // Find the first available preferred voice
    for (const preference of voicePreferences) {
        const foundVoice = voices.find(voice => {
            if (preference.name && preference.lang) {
                return voice.name.includes(preference.name) && voice.lang.includes(preference.lang);
            } else if (preference.lang) {
                return voice.lang.includes(preference.lang);
            }
            return false;
        });

        if (foundVoice) {
            speech.voice = foundVoice;
            break;
        }
    }
}

// Call the welcome speech (only on homepage)
if (window.location.pathname.endsWith('index.html') || 
    window.location.pathname === '/' || 
    window.location.pathname === '') {
    // Delay the speech slightly for better UX
    setTimeout(speakWelcomeMessage, 1000);
}
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this demo, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been sent. We'll contact you at ${email} soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.slide-up, .fade-in, .zoom-in, .pop-up');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Project category filter
    const categoryButtons = document.querySelectorAll('.category-filter button');
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Here you would typically filter projects based on category
                // For this demo, we'll just log the category
                console.log(`Filtering by: ${this.textContent}`);
            });
        });
    }
});