let cl = console.log;

const gallery = document.getElementById("product-gallery-container");

for (let i = 1; i <= 21; i++) {
  gallery.innerHTML += `<div class="product-card to-animate">
    <img src='../imgs/product-imgs/product-img(${i}).png' alt="product image">
</div>`;
}

const productCards = document.querySelectorAll(".product-card");
const productInfoScreen = document.getElementById("product-info-screen");
const productInfoImg = document.getElementById("product-img-wrapper");
const closeBtn = document.querySelector(".close-btn");

if (document.body.clientWidth <= 768) {
  productCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      // cl("clicked");
      const img = card.firstElementChild.src;
      productInfoImg.innerHTML = `<img class="lightbox-img" src='${img}' alt="product image">`;
      showInfoScreen();
    });
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

// Sticky scroll navbar
const header = document.getElementById("products-header");

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
