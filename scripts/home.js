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
