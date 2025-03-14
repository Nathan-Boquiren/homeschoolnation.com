let cl = console.log;

// ===== DOM Elements =====
const header = document.getElementById("order-header");
const orderForm = document.getElementById("order-form");
const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");
const phoneInput = document.getElementById("phone-input");

// Order Form

labels.forEach((label) => {
  label.addEventListener("click", () => {
    let input = label.nextElementSibling;
    input.focus();
  });
});

function updateFilledClass(input) {
  let parentWrapper = input.parentElement;
  if (input.value.trim() !== "") {
    parentWrapper.classList.add("filled");
  } else {
    parentWrapper.classList.remove("filled");
  }
}

inputs.forEach((input) => {
  updateFilledClass(input);
  input.addEventListener("input", () => updateFilledClass(input));
});

let telNumInput = "";

phoneInput.addEventListener("input", (e) => {
  telNumInput += e.data;
  if (telNumInput.length === 3 || telNumInput.length === 6) {
    phoneInput.value += "-";
  } else if (telNumInput.length === 10 || phoneInput.value.length === 0) {
    telNumInput = "";
  }
});

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
