// ======================= COMPLETE AND CORRECTED SCRIPT.JS =======================

document.addEventListener('DOMContentLoaded', () => {

    // --- NAVBAR & HEADER LOGIC ---
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('header nav a');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.header');
    const resumeBtn = document.querySelector(".btn-container");
 
const projectContainer = document.querySelector(".projects-container");

projectContainer.addEventListener("wheel", (e) => {
    e.stopPropagation();
});

projectContainer.addEventListener("touchmove", (e) => {
    e.stopPropagation();
});

document.addEventListener("click", (e) => {

    if (resumeBtn.contains(e.target)) {
        // Clicked inside the button
        resumeBtn.classList.toggle("active");
    } else {
        // Clicked outside → close it
        resumeBtn.classList.remove("active");
    }

});
const projects = document.querySelectorAll(".project-box-link");

projects.forEach(card=>{
card.addEventListener("click",(e)=>{

if(!card.classList.contains("active")){
e.preventDefault();

projects.forEach(c=>c.classList.remove("active"));
card.classList.add("active");

}else{
card.classList.remove("active");
}

});
});

document.addEventListener("click",(e)=>{

if(!e.target.closest(".project-box-link")){
projects.forEach(card=>card.classList.remove("active"));
}

});

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-xmark');
        navbar.classList.toggle('active');
    };

    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    
                });
                const activeLink = document.querySelector(`header nav a[href*="${id}"]`);

                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });

        header.classList.toggle('sticky', window.scrollY > 100);

        menuIcon.classList.remove('fa-xmark');
        navbar.classList.remove('active');
    };

    // --- THEME, ANIMATION, & INTERACTIVITY LOGIC ---

    // 1. Initialize Animate On Scroll (AOS)
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
    });

    // 2. Typed.js for the home section
    new Typed('.multiple-text', {
        strings: ['Software Engineer', 'FullStack developer', 'UI/UX Enthusiast', 'Problem Solver'],
        typeSpeed: 70,
        backSpeed: 70,
        backDelay: 1000,
        loop: true
    });

    // 3. Animated Slogan Logic
    const slogans = ["Code with purpose.", "Building tomorrow's web.", "Elegance in every line.", "Logic is my art."];
    let sloganIndex = 0;
    const sloganElement = document.querySelector('.slogan');

    function changeSlogan() {
        if (sloganElement) { // Check if the element exists before using it
            sloganElement.textContent = slogans[sloganIndex];
            sloganIndex = (sloganIndex + 1) % slogans.length;
        }
    }
    if (sloganElement) {
        setInterval(changeSlogan, 5000); // Change slogan every 5 seconds
        changeSlogan(); // Initial call
    }

    // 4. Dark/Light Mode Toggle
    const themeToggle = document.querySelector('#theme-toggle');

    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');

            if (document.body.classList.contains('light-mode')) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // 5. Theme Color Palette Logic
    const colorPaletteToggle = document.querySelector('#color-palette-toggle');
    const colorPalette = document.querySelector('.color-palette');
    const colorOptions = document.querySelectorAll('.color-option');

    if (colorPaletteToggle && colorPalette) {
        colorPaletteToggle.addEventListener('click', () => {
            colorPalette.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!colorPalette.contains(e.target) && !colorPaletteToggle.contains(e.target)) {
                colorPalette.classList.remove('active');
            }
        });

        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                const root = document.documentElement;

                if (option.hasAttribute('data-gradient')) {
                    const newGradient = option.getAttribute('data-gradient');
                    root.style.setProperty('--main-background', newGradient);
                    const firstColor = newGradient.split(',')[1].trim();
                    root.style.setProperty('--main-color', firstColor);
                    localStorage.setItem('accentGradient', newGradient);
                    localStorage.removeItem('accentColor');
                } else {
                    const newColor = option.getAttribute('data-color');
                    root.style.setProperty('--main-color', newColor);
                    root.style.setProperty('--main-background', newColor);
                    localStorage.setItem('accentColor', newColor);
                    localStorage.removeItem('accentGradient');
                }
            });
        });
    }

    // 6. Load Saved Preferences on Page Load
    function loadPreferences() {
        const savedTheme = localStorage.getItem('theme');
        const savedColor = localStorage.getItem('accentColor');
        const savedGradient = localStorage.getItem('accentGradient');
        const root = document.documentElement;

        if (savedTheme === 'light' && themeToggle) {
            document.body.classList.add('light-mode');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }

        if (savedGradient) {
            root.style.setProperty('--main-background', savedGradient);
            const firstColor = savedGradient.split(',')[1].trim();
            root.style.setProperty('--main-color', firstColor);
        } else if (savedColor) {
            root.style.setProperty('--main-color', savedColor);
            root.style.setProperty('--main-background', savedColor);
        }
    }
    loadPreferences();




}); // --- THIS IS THE SINGLE, CLOSING BRACKET FOR DOMCONTENTLOADED ---


// --- CONTACT FORM SUBMISSION LOGIC (STAYS OUTSIDE) ---
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                contactForm.style.transition = 'opacity 0.5s ease-out';
                contactForm.style.opacity = '0';

                setTimeout(() => {
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.style.transition = 'opacity 0.5s ease-in';
                        successMessage.style.opacity = '1';
                    }, 10);
                }, 500);

                contactForm.reset();

                setTimeout(() => {
                    successMessage.style.transition = 'opacity 0.5s ease-out';
                    successMessage.style.opacity = '0';

                    setTimeout(() => {
                        successMessage.style.display = 'none';
                        contactForm.style.display = 'block';
                        setTimeout(() => {
                            contactForm.style.transition = 'opacity 0.5s ease-in';
                            contactForm.style.opacity = '1';
                        }, 10);
                    }, 500);
                }, 5000);

            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Oops! There was a problem submitting your form.');
                    }
                })
            }
        }).catch(error => {
            alert('Oops! There was a problem with your network. Please try again.');
        });
    });
}