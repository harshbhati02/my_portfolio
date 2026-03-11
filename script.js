const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeIcon = document.getElementById('theme-icon');
const navbar = document.getElementById('navbar');

// 1. Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 2. Sticky Navbar Effect on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.style.padding = "12px 0";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    } else {
        navbar.style.padding = "20px 0";
        navbar.style.boxShadow = "none";
    }
});

// 3. Theme Toggle Logic
themeIcon.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    if (document.body.classList.contains('light-theme')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// Close menu on link click
document.querySelectorAll('.nav-item').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Typing Effect Logic
const typingSpan = document.getElementById('typing');
const roles = [
    "Developer", 
    "Content Creator", 
    "Content Writer", 
    "Artificial Intelligence Expert", 
    "Graphics Designer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Cursor Glow Effect
const cursor = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Start Typing Effect on Load
document.addEventListener('DOMContentLoaded', type);

// section 2nd js......................................................
// Hover Tilt Effect for Tech Cards
const cards = document.querySelectorAll('.tech-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
});

//particles js,....................................
// --- Global Particles Configuration ---

// Ye function particles ko initialize karega
const loadParticles = async () => {
    // tsParticles bundle already loaded hai HTML mein
    await tsParticles.load("tsparticles", {
        // Particles ki basic settings
        particles: {
            number: {
                value: 60, // Kitne dots honge (performance ke liye low rakha hai)
                density: {
                    enable: true,
                    area: 800 // Kitne area mein distribute honge
                }
            },
            color: {
                value: "#D4AF37" // Golden color dots ke liye
            },
            shape: {
                type: "circle" // Dots ki shape
            },
            opacity: {
                value: 0.4, // Halka transparent look
                random: true, // Kuch dots kam chamkenge, kuch zyada
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3, // Dots ka size
                random: true, // Kuch chote, kuch bade
                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 1,
                    sync: false
                }
            },
            // Lines jo dots ko connect karengi
            links: {
                enable: true,
                distance: 150, // Kitni door tak connect honge
                color: "#D4AF37", // Golden lines
                opacity: 0.2, // Bahut halki lines
                width: 1
            },
            // Auto-floating (Movement) logic
            move: {
                enable: true,
                speed: 1.5, // Dheere move honge (futuristic feel)
                direction: "none", // Kisi bhi direction mein
                random: true, // Random movement
                straight: false,
                outModes: {
                    default: "out" // Screen se bahar jane par wapas aayenge
                },
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        // Interactivity (Mouse hover/click par kya hoga)
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab" // Mouse le jane par dots connect honge
                },
                onClick: {
                    enable: true,
                    mode: "push" // Click karne par naye dots add honge
                }
            },
            modes: {
                grab: {
                    distance: 200,
                    links: {
                        opacity: 0.5
                    }
                },
                push: {
                    quantity: 4
                }
            }
        },
        // Performance settings
        detectRetina: true,
        fpsLimit: 60
    });
};

// Start particles initialization
loadParticles();


// section 3rd js......................................................


/* =============================================
   SINGLE CARD FOCUS SLIDER LOGIC
   ============================================= */

let currentIdx = 0;
const stage = document.getElementById('cardsStage');
const items = document.querySelectorAll('.focus-item');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// 1. Function to Update Slider
function updateSlider() {
    // Stage ko move karo
    stage.style.transform = `translateX(-${currentIdx * 100}%)`;
    
    // Active class update karo
    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentIdx) {
            item.classList.add('active');
        }
    });
}

// 2. Button Listeners
nextBtn.addEventListener('click', () => {
    if (currentIdx < items.length - 1) {
        currentIdx++;
    } else {
        currentIdx = 0; // Loop back to start
    }
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    if (currentIdx > 0) {
        currentIdx--;
    } else {
        currentIdx = items.length - 1; // Loop to end
    }
    updateSlider();
});

// 3. 3D Flip Function
function flipFocusCard(cardId) {
    const card = document.querySelector(`#${cardId} .card-inner`);
    card.classList.toggle('is-flipped');
}

// Auto-init (Ensure items[0] is active)
updateSlider();

/* =============================================
   SMOOTH SCROLLING (LENIS SETUP)
   ============================================= */

const lenis = new Lenis({
  duration: 1.2, // Scroll kitna smooth hoga (Zyaada number = Zyaada smooth)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Linear feeling ke liye
  direction: 'vertical', 
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false, // Touch devices pe native scroll rehne do
  touchMultiplier: 2,
  infinite: false,
})

// Scroll loop function
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Agar tum AOS use kar rahe ho, toh ye line add karo:
lenis.on('scroll', () => {
  // AOS.refresh(); // Ye ensure karega ki animations sahi time pe trigger hon
}) 



/* =============================================
   MAGNETIC BUTTONS & SMOOTH INTERACTIVE LOGIC
   ============================================= */

// Magnetic Effect for Buttons
const mBtns = document.querySelectorAll('.magnetic-btn');

mBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const pos = btn.getBoundingClientRect();
        const x = e.clientX - pos.left - pos.width / 2;
        const y = e.clientY - pos.top - pos.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
    });
});

// Refresh AOS on Scroll to sync with Lenis
if (typeof lenis !== 'undefined') {
    lenis.on('scroll', () => {
        // Optional: Trigger any updates during scroll
    });
}


/* =============================================
   CONTACT FORM LOGIC (GOOGLE SHEETS INTEGRATION)
   ============================================= */

const contactForm = document.getElementById('luxuryContactForm');
const responseMsg = document.getElementById('formResponse');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerHTML = "<span>SENDING...</span>";
    submitBtn.style.opacity = "0.7";

    // FormData Collection
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // NOTE: Replace 'YOUR_GOOGLE_SCRIPT_URL' with your deployed Apps Script URL
    // This will send data to Google Sheets which acts as your Excel sheet.
    fetch('https://script.google.com/macros/s/AKfycbxVT06KhY6mputhRjArFh6ECFBXox6NzxNJkGUDTlMPhjPNQltaFfVkwFodHsxUS9-rLA/exec', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(res => {
        responseMsg.style.color = "var(--gold-primary)";
        responseMsg.innerHTML = "Success! Data saved to Excel & Notification Sent.";
        contactForm.reset();
        submitBtn.innerHTML = "<span>SEND MESSAGE</span> <i class='fas fa-paper-plane'></i>";
        submitBtn.style.opacity = "1";
    })
    .catch(err => {
        responseMsg.style.color = "#ff4d4d";
        responseMsg.innerHTML = "Error! Connection failed. Please check script URL.";
        submitBtn.innerHTML = "<span>RETRY</span>";
    });
});

// Magnetic Effect to Submit Button
const sBtn = document.querySelector('.submit-btn');
sBtn.addEventListener('mousemove', (e) => {
    const pos = sBtn.getBoundingClientRect();
    const x = e.clientX - pos.left - pos.width / 2;
    const y = e.clientY - pos.top - pos.height / 2;
    sBtn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
});
sBtn.addEventListener('mouseleave', () => {
    sBtn.style.transform = `translate(0,0)`;
});



/* =============================================
   FOOTER MAGNETIC SOCIALS LOGIC
   ============================================= */

// Humne HTML mein 'magnetic-btn' class pehle hi add kar di hai
// Toh pichla magnetic logic inpe bhi kaam karega automatically.

// Extra logic: Smooth scroll to top for bottom links
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if(targetId.startsWith('#')) {
            e.preventDefault();
            lenis.scrollTo(targetId);
        }
    });
});
 // card who harsh bhati logic


 function toggleAboutModal() {
    const modal = document.getElementById('aboutModal');
    if (modal.style.display === "flex") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    } else {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

// Click outside to close
function closeModalOutside(event) {
    const modal = document.getElementById('aboutModal');
    if (event.target === modal) {
        toggleAboutModal();
    }
}
function toggleAboutModal() {
    const modal = document.getElementById('aboutModal');
    if (modal.style.display === "flex") {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Main page scroll on
    } else {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Main page scroll off
    }
}