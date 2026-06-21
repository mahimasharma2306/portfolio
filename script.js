document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. DYNAMIC TEXT TYPING EFFECT FOR HERO SUBTITLE
    // ==========================================
    const subtitleElement = document.querySelector(".hero-subtitle");
    if (subtitleElement) {
        // Clear hardcoded HTML text to let JavaScript handle typing cleanly
        subtitleElement.innerHTML = 'MERN Stack Developer <br> <span class="typing-target"></span>';
        
        const words = ["C++ Programmer", "Python Programmer", "Problem Solver"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingTarget = document.querySelector(".typing-target");

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Remove characters
                typingTarget.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Add characters
                typingTarget.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            // Typing Speed Control
            let typeSpeed = isDeleting ? 50 : 100;

            // Switch to deleting mode when word is fully typed
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1500; // Pause at the end of the word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Loop to next word
                typeSpeed = 300; // Small pause before typing next word
            }

            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start typing effect after a small initial delay
        setTimeout(typeEffect, 1000);
    }

    // ==========================================
    // 2. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav .nav-links a");

    function highlightNavigation() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Highlight a bit before the section reaches the exact top of the viewport
            const sectionTop = current.offsetTop - 150; 
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }
    
    window.addEventListener("scroll", highlightNavigation);

    // ==========================================
    // 3. REVEAL SECTIONS ON SCROLL (INTERSECTION OBSERVER)
    // ==========================================
    const layoutSections = document.querySelectorAll(".layout-section, .mini-project-card, .cert-card");
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("section-visible");
                observer.unobserve(entry.target); // Stop observing once animated in
            }
        });
    }, revealOptions);

    layoutSections.forEach(section => {
        // Add default hidden setup class dynamically
        section.classList.add("section-hidden");
        sectionObserver.observe(section);
    });
});
