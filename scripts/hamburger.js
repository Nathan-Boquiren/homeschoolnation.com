let cl = console.log;

cl(
  "This website was created by Nathan Boquiren. For your own personal website, or an online resume/cv, contact me at nathanjboquiren@gmail."
);

const navBar = document.querySelector(".navbar-links");
const hamburger = document.getElementById("hamburger");
const contactBtns = document.querySelectorAll(".contact-wrapper");

document.addEventListener("click", (e) => {
  const isHamburger = hamburger.contains(e.target);
  const isNavBar = navBar.contains(e.target);

  if (isHamburger) {
    navBar.classList.toggle("open");
  } else if (!isNavBar && navBar.classList.contains("open")) {
    navBar.classList.remove("open");
  }
});

// ===== Footer Contact Links Event listeners =====
contactBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "email-link") {
      window.location.href = "mailto:nathanjboquiren@gmail.com";
    } else if (btn.id === "phone-link") {
      window.location.href = "tel:+18438722917";
    }
  });
});

// ===== Scroll Animation =====
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        let delay = index * 200;
        setTimeout(() => {
          entry.target.classList.add("animate-in");
          entry.target.classList.remove("animate-out");
          observer.unobserve(entry.target); // Stop observing after animation
        }, delay);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  document.querySelectorAll(".to-animate").forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(element);
  });
});

// ===== Sticky Navbar =====
let lastScrollY = 0;

window.addEventListener("scroll", () => {
  let currentScrollY = Math.max(0, window.scrollY);

  if (currentScrollY > lastScrollY + 5) {
    header.classList.add("hidden");
  } else if (currentScrollY < lastScrollY - 5) {
    header.classList.remove("hidden");
  }

  lastScrollY = currentScrollY;
});
