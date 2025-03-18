let cl = console.log;

// const gitHubLink = "https://nathan-boquiren.github.io/homeschoolnation.com";

// Product gallery image carousel
const firstBtn = document.getElementById("first-set");
const secondBtn = document.getElementById("second-set");
const dotBtns = document.querySelectorAll(".dot-btn");
const slider = document.getElementById("images-container");

function scrollToPosition(position) {
  const scrollAmount = slider.clientWidth;
  slider.scrollTo({ left: position * scrollAmount, behavior: "smooth" });
}

// desktop view
firstBtn.addEventListener("click", () => {
  scrollToPosition(0);
  secondBtn.classList.remove("active");
  firstBtn.classList.add("active");
});
secondBtn.addEventListener("click", () => {
  scrollToPosition(1);
  firstBtn.classList.remove("active");
  secondBtn.classList.add("active");
});

// mobile view
dotBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    dotBtns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    const targetNum = this.dataset.target;
    const targetElement = document.getElementById(`img-${targetNum}`);

    slider.scrollTo({
      left: targetElement.offsetLeft,
      behavior: "smooth",
    });
  });
});

// swipe functionality

slider.addEventListener("scroll", () => {
  const scrollLeft = slider.scrollLeft;
  const scrollWidth = slider.scrollWidth - slider.clientWidth;
  const scrollFraction = scrollLeft / scrollWidth;
  const activeIndex = Math.round(scrollFraction * (dotBtns.length - 1));

  dotBtns.forEach((btn, index) => {
    btn.classList.toggle("active", index === activeIndex);
  });
});

// const imageContainer = document.getElementById("images-container");

// let arrows = document.querySelectorAll(".arrow");
// let imgs = [];
// let stickerImagesArray = [];

// for (let i = 3; i <= 7; i++) {
//   stickerImagesArray.push(`product-img(${i}).png`);
// }

// function populateImages() {
//   imageContainer.innerHTML = `<span class="material-symbols-rounded arrow" id="prev">chevron_left</span>
//                 <span class="material-symbols-rounded arrow" id="next">chevron_right</span>`;
//   for (let i = 0; i < stickerImagesArray.length; i++) {
//     imageContainer.innerHTML += `
//     <div class=stkr-img>
//       <img src="${gitHubLink}/imgs/product-imgs/${stickerImagesArray[i]}" alt="sticker">
//     </div>
//       `;
//   }

//   imgs = document.querySelectorAll(".stkr-img");
//   arrows = document.querySelectorAll(".arrow");
//   arrows.forEach((arrow) => {
//     arrow.addEventListener("click", () => {
//       handleArrowClick(arrow.id);
//     });
//   });
//   styleImages(imgs);
// }

// populateImages();

// function styleImages(imgs) {
//   let mainImgIndex = 2;
//   imgs[mainImgIndex].style.zIndex = 3;

//   for (let i = 0; i < imgs.length; i++) {
//     imgs[i].style.zIndex = `${3 - Math.abs(mainImgIndex - i)}`;
//     if (i < mainImgIndex) {
//       imgs[i].style.transform = `translateX(-${(mainImgIndex - i) * 50 + 50}%)`;
//       imgs[i].style.filter = "blur(5px) saturate(0.7)";
//     } else if (i > mainImgIndex) {
//       imgs[i].style.transform = `translateX(${(i - mainImgIndex) * 50 - 50}%)`;
//       imgs[i].style.filter = "blur(5px) saturate(0.7)";
//     }
//   }
// }

// // event listener for arrows
// let autoRotateImgs = setInterval(shiftImgsToRight, 2000);

// function handleArrowClick(action) {
//   clearInterval(autoRotateImgs);
//   if (action === "next") {
//     shiftImgsToRight();
//   } else if (action === "prev") {
//     shiftImgsToLeft();
//   }
//   autoRotateImgs = setInterval(shiftImgsToRight, 2000);
// }

// function shiftImgsToRight() {
//   for (let i = 0; i < imgs.length; i++) {
//     let mainImgIndex = 2;
//     imgs[mainImgIndex].style.transform = `translateX(-100%)`;
//     imgs[mainImgIndex].style.filter = `blur(5px) saturate(0.7)`;

//     if (i === mainImgIndex - 2) {
//       imgs[i].style.transform = "translateX(50%)";
//     } else if (i === mainImgIndex - 1) {
//       imgs[i].style.transform = `translateX(-150%)`;
//     } else if (i === mainImgIndex + 1) {
//       imgs[i].style.transform = "translateX(-50%)";
//       imgs[i].style.zIndex = "4";
//       imgs[i].style.filter = "blur(0) saturate(1)";
//     } else if (i === mainImgIndex + 2) {
//       imgs[i].style.transform = "translateX(0%)";
//       imgs[i].style.zIndex = "2";
//     }
//   }
//   setTimeout(() => {
//     stickerImagesArray.push(stickerImagesArray.shift());
//     populateImages();
//   }, 400);
// }

// function shiftImgsToLeft() {
//   for (let i = 0; i < imgs.length; i++) {
//     let mainImgIndex = 2;
//     imgs[mainImgIndex].style.transform = `translateX(0%)`;
//     imgs[mainImgIndex].style.filter = `blur(5px) saturate(0.7)`;

//     if (i === mainImgIndex - 2) {
//       imgs[i].style.transform = "translateX(-100%)";
//     } else if (i === mainImgIndex - 1) {
//       imgs[i].style.transform = `translateX(-50%)`;
//       imgs[i].style.zIndex = "4";
//       imgs[i].style.filter = "blur(0) saturate(1)";
//     } else if (i === mainImgIndex + 1) {
//       imgs[i].style.transform = "translateX(50%)";
//     } else if (i === mainImgIndex + 2) {
//       imgs[i].style.zIndex = "0";
//       imgs[i].style.transform = "translateX(-150%)";
//     }
//   }
//   setTimeout(() => {
//     stickerImagesArray.unshift(stickerImagesArray.pop());
//     populateImages();
//   }, 400);
// }
