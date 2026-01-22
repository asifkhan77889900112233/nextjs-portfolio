// Create stars function
function createStars() {
  const starsContainer = document.getElementById("stars-container");
  const starsCount = 500; // Number of stars

  for (let i = 0; i < starsCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    // Random size
    const size = Math.random() * 3;

    // Random animation properties
    const duration = 2 + Math.random() * 5;
    const delay = Math.random() * 5;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.setProperty("--duration", `${duration}s`);
    star.style.setProperty("--delay", `${delay}s`);

    starsContainer.appendChild(star);
  }
}

// Initialize when page loads
window.addEventListener("load", () => {
  createStars();
});
document.addEventListener("DOMContentLoaded", () => {
  // ==================== NAVIGATION ====================
  // Mobile Menu Toggle
  const menuToggle = document.createElement("div");
  menuToggle.className = "menu-toggle";
  menuToggle.innerHTML = '<i class="ri-menu-line"></i>';
  document.querySelector("nav").appendChild(menuToggle);

  // Menu Functionality
  const menu = document.querySelector(".menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Smooth Scroll Navigation
  document.querySelectorAll(".menu a").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        // Close menu on mobile
        menu.classList.remove("active");
        menuToggle.classList.remove("active");

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Cart Functionality
  const cartIcon = document.querySelector(".ri-shopping-bag-4-fill");
  const cartCounter = document.querySelector(".nav-icon span");
  if (cartIcon && cartCounter) {
    cartIcon.addEventListener("click", () => {
      let count = parseInt(cartCounter.textContent) || 0;
      cartCounter.textContent = count + 1;

      // Add cart animation
      gsap.to(cartIcon, {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });
    });
  }

  // ==================== HERO SECTION ====================

  // Social Media Icons Animation
  document.querySelectorAll(".hero_side_icons i").forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      gsap.to(icon, {
        rotation: 360,
        duration: 0.5,
      });
    });
  });
  document.body.style.backgroundColor = "#030303ff"; // Set background color
  // Client Statistics Animation
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    counter.innerText = "0";
    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.innerText;
      const increment = target / 100;

      if (current < target) {
        counter.innerText = `${Math.ceil(current + increment)}`;
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    updateCounter();
  });

  // Swiper Slider Initialization
  const swiper = new Swiper(".swiper-logo", {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 5 },
    },
  });
  // ==================== ABOUT SECTION ====================
  // Reveal on scroll animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // ==================== SERVICES SECTION ====================
  gsap.utils.toArray(".services-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.2,
      ease: "power2.out",
    });

    // Hover Effects
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -10,
        duration: 0.3,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
      });
    });
  });

  // ==================== TEAM SECTION ====================
  gsap.utils.toArray(".our-team-box").forEach((box, i) => {
    gsap.from(box, {
      scrollTrigger: {
        trigger: box,
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.2,
    });
  });

  // Number counter animation
  const counterBoxes = document.querySelectorAll(".counter-box");

  counterBoxes.forEach((box) => {
    const h1 = box.querySelector("h1");
    const originalText = h1.textContent;
    const suffix = originalText.replace(/\d/g, ""); // Get non-numeric characters
    const targetNumber = parseInt(originalText.replace(/\D/g, "")); // Get numeric value

    // Reset number to 0 initially
    h1.textContent = "0" + suffix;

    // Create animation
    gsap.to(h1, {
      innerText: targetNumber,
      duration: 2,
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: box,
        start: "top center",
        toggleActions: "play none none none",
      },
      onUpdate: function () {
        // Format number with suffix
        h1.textContent = Math.floor(this.targets()[0].innerText) + suffix;
      },
    });
  });
  // ==================== BENEFITS SECTION ====================
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".com-box").forEach((box, i) => {
    gsap.from(box, {
      scrollTrigger: {
        trigger: box,
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
      x: -100,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
    });

    box.addEventListener("mouseenter", () => {
      gsap.to(box.querySelector("img"), {
        rotation: 360,
        duration: 0.6,
        ease: "power2.inOut",
      });
    });

    box.addEventListener("mouseleave", () => {
      gsap.to(box.querySelector("img"), {
        rotation: 0,
        duration: 0.6,
      });
    });
  });

  // ==================== MARKETING MARQUEE ====================
  const marquee = document.querySelector(".sm-marquee-text");
  if (marquee) {
    gsap.to(marquee, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ".marketing-marquee",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      duration: 20,
      repeat: -1,
    });
  }

  // ==================== MARKETING CLIENTS ====================
  document.querySelectorAll(".sm-client-card").forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 100,
      duration: 0.8,
    });

    card.addEventListener("click", () => {
      gsap.to(card, {
        scale: 0.95,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });
    });
  });

  // ==================== SCROLL TRIGGERS ====================
  // Navbar Scroll Effect
  window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Hero Image Animations
  gsap.from(".hero-img-box-1", {
    opacity: 0,
    x: 100,
    duration: 1,
    delay: 0.5,
  });

  gsap.from(".hero-img-box-2", {
    opacity: 0,
    x: -100,
    duration: 1,
    delay: 0.8,
  });

  // Page Load Animations
  gsap.from("nav", {
    opacity: 0,
    y: -50,
    duration: 1,
  });

  gsap.from(".hero-content", {
    opacity: 0,
    x: -100,
    duration: 1,
    delay: 0.3,
  });
});
const testimonials = [
  {
    img: "images/testimonials1.jpg",
    quote:
      "Client feedback helps us grow stronger, building trust and delivering high-quality service.",
    name: "Asif Ali",
    role: "CEO, Data Science",
  },
  {
    img: "images/15.jpg",
    quote:
      "Marketing strategy that transformed our brand visibility and brought real engagement.",
    name: "Asif Khan",
    role: "Marketing Lead",
  },
  {
    img: "images/fida+noor ahmad.PNG",
    quote:
      "Product development handled with care, skill, and incredible professionalism.",
    name: "Fida Ullah",
    role: "Product Manager",
  },
];

const thumbs = document.querySelectorAll(".thumb");
const mainImg = document.getElementById("mainImg");
const quote = document.getElementById("quote");
const clientName = document.getElementById("clientName");
const clientRole = document.getElementById("clientRole");

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    document.querySelector(".thumb.active").classList.remove("active");
    thumb.classList.add("active");

    const testimonial = testimonials[index];
    mainImg.src = testimonial.img;
    quote.textContent = `"${testimonial.quote}"`;
    clientName.textContent = testimonial.name;
    clientRole.textContent = testimonial.role;
  });
});

function register() {
  const user = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value;
  const confirmPass = document.getElementById("confirm-password").value;

  if (!user || !email || !pass || !confirmPass) {
    alert("Please fill in all fields.");
    return;
  }

  if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)) {
    alert("Invalid email address.");
    return;
  }

  if (pass !== confirmPass) {
    alert("Passwords do not match.");
    return;
  }

  alert(`Welcome ${user}, your account is created!`);
}

function subscribe() {
  const name = document.getElementById("sub-name").value.trim();
  const email = document.getElementById("sub-email").value.trim();

  if (!name || !email) {
    alert("Please enter name and email.");
    return;
  }

  if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)) {
    alert("Invalid email.");
    return;
  }

  alert(`Thank you ${name}, you've subscribed successfully!`);
}
const planetSpeeds = {
  mercury: 6, // Fastest
  venus: 10,
  earth: 14,
  mars: 18,
  jupiter: 26,
  saturn: 34,
  uranus: 42,
  neptune: 50, // Slowest
};

Object.keys(planetSpeeds).forEach((planet) => {
  const element = document.querySelector(`.${planet}`);
  if (element) {
    const orbit = document.createElement("style");
    orbit.innerHTML = `
          @keyframes orbit-${planet} {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `;
    document.head.appendChild(orbit);
    element.style.animation = `orbit-${planet} ${planetSpeeds[planet]}s linear infinite`;
    element.style.transformOrigin = "center";
  }
});
 const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
      let windowHeight = window.innerHeight;
      let elementTop = reveals[i].getBoundingClientRect().top;
      let revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  window.addEventListener("scroll", revealOnScroll);