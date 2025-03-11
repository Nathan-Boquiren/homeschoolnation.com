let cl = console.log;

// DOM elements
const header = document.getElementById("faq-header");
const faqContainer = document.getElementById("faq-container");

// Fetch faq json data

fetch("../articles/faq.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    populateQuestions(data);
  })
  .catch((error) => {
    console.error("There was a problem fetching the articles:", error);
  });

// populate questions
function populateQuestions(categories) {
  Object.values(categories).forEach((category) => {
    category.forEach((pair) => {
      faqContainer.innerHTML += `
        <div class="faq-wrapper">
            <div class="question-wrapper">
                <h3 class="question-text">${pair.question}</h3>
                <button onclick="expandQuestion(this)" class="expand-btn">
                    <span class="material-symbols-rounded">keyboard_arrow_down</span>
                </button>
            </div>
            <div class="answer-wrapper">
                <p class="answer-text">${pair.answer}</p>
            </div>
        </div>
      `;
    });
  });
}

// question expand btn event listener

function expandQuestion(btn) {
  let faqWrapper = btn.parentElement.parentElement;
  let secondFaqWrapper = faqWrapper.nextElementSibling;
  let expandBtn = faqWrapper.querySelector(".material-symbols-rounded");
  let answerWrapper = faqWrapper.querySelector(".answer-wrapper");
  if (expandBtn.innerHTML === "keyboard_arrow_down") {
    expandBtn.innerHTML = "keyboard_arrow_up";
  } else {
    expandBtn.innerHTML = "keyboard_arrow_down";
  }

  answerWrapper.classList.add("show-answer");
  secondFaqWrapper.classList.add("move-wrapper-down");
}

// ===== Sticky scroll navbar =====
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }
  lastScrollY = window.scrollY;
});
