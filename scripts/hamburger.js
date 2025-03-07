// Function for hamburger menu
document.getElementById("hamburger").addEventListener("click", function () {
  let navBar = document.querySelector(".navbar-links");
  let lineOne = document.querySelector(".line-1");
  let lineTwo = document.querySelector(".line-2");
  let lineThree = document.querySelector(".line-3");
  let hamburger = document.getElementById("hamburger");

  if (navBar.style.left === "0px") {
    navBar.style.left = "-65vw";
    hamburger.style.transform = "rotate(0deg)";
    lineOne.style.transform = "rotate(0deg)";
    lineTwo.style.width = "30px";
    lineThree.style.transform = "rotate(0deg)";
  } else {
    navBar.style.left = "0";
    hamburger.style.transform = "rotate(-90deg)";
    lineOne.style.transform = "translateY(9px) rotate(45deg)";
    lineTwo.style.width = "0px";
    lineThree.style.transform = "translateY(-9px)rotate(-45deg)";
  }
});
