let cl = console.log;

// DOM Elements
const header = document.getElementById("products-header");
const gallery = document.getElementById("product-gallery-container");

// fetch product data

fetch("../articles/product-data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    populateProducts(data);
  })
  .catch((error) => {
    console.error("There was a problem fetching the product data:", error);
  });

function populateProducts(data) {
  for (let i = 0; i < data.length; i++) {
    gallery.innerHTML += `<div class="product-card to-animate">
      <img src='../imgs/product-imgs/product-img(${data[i].index}).png' alt="product image">
      <h4 class="product-name">${data[i].name}</h4>
      <h4 class="product-id">${data[i].id}</h4>
  </div>`;
  }
  // animateProducts();
}

const productCards = document.querySelectorAll(".product-card");
const productInfoScreen = document.getElementById("product-info-screen");
const productInfoImg = document.getElementById("product-img-wrapper");
const productInfoName = document.getElementById("product-name");
const productInfoId = document.getElementById("product-id");
const closeBtn = document.querySelector(".close-btn");

if (document.body.clientWidth <= 768) {
  gallery.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    e.preventDefault();
    e.stopPropagation();

    const img = card.querySelector("img").src;
    const name = card.querySelector(".product-name").innerHTML;
    const id = card.querySelector(".product-id").innerHTML;
    productInfoImg.innerHTML = `<img class="lightbox-img" src='${img}' alt="product image">`;
    productInfoName.innerHTML = name;
    productInfoId.innerHTML = id;
    showInfoScreen();
  });

  document.body.addEventListener("click", (e) => {
    const lightBoxImg = document.querySelector(".lightbox-img");
    if (
      lightBoxImg &&
      !lightBoxImg.contains(e.target) &&
      !e.target.closest(".product-card")
    ) {
      hideInfoScreen();
    }
  });

  closeBtn.addEventListener("click", () => {
    hideInfoScreen();
  });
}

function showInfoScreen() {
  document.body.style.overflow = "hidden";
  productInfoScreen.style.display = "flex";
  if (productInfoScreen.classList.contains("hide")) {
    productInfoScreen.classList.remove("hide");
  }
  productInfoScreen.classList.add("show");
}

function hideInfoScreen() {
  document.body.style.overflow = "auto";
  productInfoScreen.classList.add("hide");
  setTimeout(() => {
    productInfoScreen.classList.remove("show");
    productInfoScreen.style.display = "none";
  }, 200);
}

// Intersection observer for animation on scroll
// function animateProducts() {
//   const observerOptions = {
//     root: null,
//     rootMargin: "0px",
//     threshold: 0.1,
//   };

//   const observerCallback = (entries, observer) => {
//     entries.forEach((entry, index) => {
//       if (entry.isIntersecting) {
//         let delay = index * 200;
//         setTimeout(() => {
//           entry.target.classList.add("animate-in");
//           entry.target.classList.remove("animate-out");
//           observer.unobserve(entry.target); // Stop observing after animation
//         }, delay);
//       }
//     });
//   };

//   const observer = new IntersectionObserver(observerCallback, observerOptions);

//   document.querySelectorAll(".to-animate").forEach((element, index) => {
//     element.style.transitionDelay = `${index * 0.2}s`;
//     observer.observe(element);
//   });
// }

// Sticky scroll navbar

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
