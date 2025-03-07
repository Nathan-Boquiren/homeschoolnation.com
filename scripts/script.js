let cl = console.log;

// Product gallery image carousel
let imageContainer = document.getElementById("images-container");

let stickerImagesArray = [
  // "../imgs/sticker()",
  // "../imgs/STKR - keep homeschool weird.png",
  // "../imgs/STKR - goat (circle).png",
  // "../imgs/STKR - home sweet homeschool.png",
  // "../imgs/STKR - homeschool mom.png",
  // "../imgs/STKR - I speak fluent sarcasm.png",
];

for (let i = 1; i <= 7; i++) {
  stickerImagesArray.push(`stkr-${i}.png`);
}

function displayImages() {
  imageContainer.innerHTML = "";
  for (let i = 0; i < stickerImagesArray.length; i++) {
    if (i === 2) {
      imageContainer.innerHTML += `<img class="make-main" src="imgs/sticker-imgs/${stickerImagesArray[i]}" alt="sticker">`;
    } else if (i === 3) {
      imageContainer.innerHTML += `<img class="to-be-main" src="imgs/sticker-imgs/${stickerImagesArray[i]}" alt="sticker">`;
    } else {
      imageContainer.innerHTML += `<img src="imgs/sticker-imgs/${stickerImagesArray[i]}" alt="sticker">`;
    }
  }
}

displayImages();

function updateCarousel() {
  document.querySelectorAll("#images-container img").forEach((img) => {
    if (img.classList.contains("make-main")) {
      img.classList.remove("make-main");
      img.classList.add("move");
    } else if (img.classList.contains("to-be-main")) {
      img.classList.remove("to-be-main");
      img.classList.add("make-main");
      img.classList.add("move-to-be-main");
    } else {
      img.classList.add("move");
    }
  });
  setTimeout(rotateArray, 500, stickerImagesArray);
}

setInterval(updateCarousel, 2000);

function rotateArray(arr) {
  let firstElement = arr[0];
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
  }
  arr[arr.length - 1] = firstElement;
  displayImages();
  return arr;
}

// Intersection observer for animation on scroll
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        entry.target.classList.remove("animate-out");
      } else {
        entry.target.classList.add("animate-out");
        entry.target.classList.remove("animate-in");
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  document
    .querySelectorAll(".reason-card")
    .forEach((element) => observer.observe(element));

  document
    .querySelectorAll(".testimonial-card")
    .forEach((element) => observer.observe(element));
});
