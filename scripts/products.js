let cl = console.log;

// DOM Elements
const header = document.getElementById("products-header");
const gallery = document.getElementById("product-gallery-container");

// fetch product data

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://hs-nation-imgs-backend.onrender.com/images", {
    cache: "no-store",
  })
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      for (const item of data) {
        html += `
              <div class="product-card to-animate">
                <div class="img-wrapper">
                  <img
                    src="https://drive.google.com/thumbnail?id=${item.fileId}"
                    alt="${item.name}"
                    loading="lazy"
                  >
                </div>
                <h4 class="product-name">${item.name}</h4>
                <h4 class="product-id">${item.id}</h4>
              </div>
            `;
      }
      gallery.innerHTML = html;
    })
    .catch((err) => console.error("Fetch error:", err));
});

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
