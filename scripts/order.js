let cl = console.log;

// ===== DOM Elements =====
const header = document.getElementById("order-header");

// ===== Sticky scroll navbar =====
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    header.classList.add("hidden");
  } else if (window.scrollY === 0) {
    header.classList.remove("hidden");
  } else {
    header.classList.remove("hidden");
  }
  lastScrollY = window.scrollY;
});
