let cl = console.log;

// ===== DOM Elements =====
const header = document.getElementById("order-header");
const orderForm = document.getElementById("order-form");
const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll(".form-input");
const phoneInput = document.getElementById("phone-input");
const confirmationMsg = document.getElementById("confirmation-msg");

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

orderForm.addEventListener("submit", () => {
  confirmationMsg.classList.add("show");

  inputs.forEach((input) => {
    input.value = "";
  });

  setTimeout(() => {
    confirmationMsg.classList.remove("show");
  }, 3000);
});

// ===== Sticky scroll navbar =====
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
