console.log(
  "This website was created by Nathan Boquiren. For your own personal website, or an online resume/cv, contact me at nathanjboquiren@gmail."
);

const navBar = document.querySelector(".navbar-links");
const lineOne = document.querySelector(".line-1");
const lineTwo = document.querySelector(".line-2");
const lineThree = document.querySelector(".line-3");
const hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", () => {
  if (navBar.style.left === "0px") {
    closeMenu();
  } else {
    openMenu();
  }
});

function openMenu() {
  navBar.style.left = "0";
  hamburger.style.transform = "rotate(-90deg)";
  lineOne.style.transform = "translateY(9px) rotate(45deg)";
  lineTwo.style.width = "0px";
  lineThree.style.transform = "translateY(-9px)rotate(-45deg)";
}

function closeMenu() {
  navBar.style.left = "-65vw";
  hamburger.style.transform = "rotate(0deg)";
  lineOne.style.transform = "rotate(0deg)";
  lineTwo.style.width = "30px";
  lineThree.style.transform = "rotate(0deg)";
}

document.body.addEventListener("click", (e) => {
  if (
    e.target !== navBar &&
    e.target !== hamburger &&
    navBar.style.left === "0px"
  ) {
    closeMenu();
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
