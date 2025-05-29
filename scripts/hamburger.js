console.log(
  "This website was created by Nathan Boquiren. For your own personal website, or an online resume/cv, contact me at nathanjboquiren@gmail."
);

const navBar = document.querySelector(".navbar-links");
const lineOne = document.querySelector(".line-1");
const lineTwo = document.querySelector(".line-2");
const lineThree = document.querySelector(".line-3");
const hamburger = document.getElementById("hamburger");

document.addEventListener("click", (e) => {
  const isHamburger = hamburger.contains(e.target);
  const isNavBar = navBar.contains(e.target);

  if (isHamburger) {
    navBar.classList.toggle("open");
  } else if (!isNavBar && navBar.classList.contains("open")) {
    navBar.classList.remove("open");
  }
});

// Intersection observer for animation on scroll
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

// Event listeners for contacting in footer

const contactBtns = document.querySelectorAll(".contact-wrapper");

contactBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "email-link") {
      window.location.href = "mailto:nathanjboquiren@gmail.com";
    } else if (btn.id === "phone-link") {
      window.location.href = "tel:+18438722917";
    }
  });
});
