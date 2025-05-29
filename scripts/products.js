let cl = console.log;

// DOM Elements
const header = document.getElementById("products-header");
const gallery = document.getElementById("product-gallery-container");

for (let i = 0; i < 12; i++) {
  gallery.innerHTML += `
    <div class="product-card placeholder">
      <div class="img-wrapper"></div>
      <div class="info-wrapper">
          <h4 class="product-id">. . . . . . . . </h4>
          <h4 class="product-name">. . . . . . . . . . . .</h4>
      </div>
    </div>`;
}

// fetch product data

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://hs-nation-imgs-backend.onrender.com/images", {
    cache: "no-store",
  })
    .then((res) => res.json())
    .then((data) => {
      gallery.innerHTML = "";

      data.forEach((item) => {
        gallery.innerHTML += `
          <div class="product-card" tabindex="0">
            <div class="img-wrapper">
              <img alt="${item.name}" loading="lazy" style="opacity:0.2">
            </div>
            <div class="info-wrapper">
              <h4 class="product-id">#${item.id}</h4>
              <hr>
              <h4 class="product-name">${item.name}</h4>
          </div>
        `;
      });

      data.forEach((item, idx) => {
        const card = gallery.children[idx];
        const img = card.querySelector("img");
        img.src = `https://drive.google.com/thumbnail?id=${item.fileId}&sz=s1000`;
        img.setAttribute("data-id", item.fileId);
        img.onload = () => {
          img.style.transition = "opacity 0.3s";
          img.style.opacity = "1";
        };
      });
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

    const imgLink = card.querySelector("img").src;
    const name = card.querySelector(".product-name").innerHTML;
    const id = card.querySelector(".product-id").innerHTML;
    productInfoImg.innerHTML = `<img class="lightbox-img" src='${imgLink}' alt="product image">`;
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
  document.body.style.overflow = "clip";
  productInfoScreen.classList.add("show");
}

function hideInfoScreen() {
  document.body.style.overflow = "auto";
  productInfoScreen.classList.remove("show");
}

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
