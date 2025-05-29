// DOM elements
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
            <div onclick="expandQuestion(this)" class="question-wrapper">
                <h3 class="question-text">${pair.question}</h3>
                <button class="expand-btn">
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
  let questionWrapper = btn;
  let expandBtn = questionWrapper.querySelector(".material-symbols-rounded");
  let answerWrapper = questionWrapper.nextElementSibling;

  document.querySelectorAll(".question-wrapper").forEach((wrapper) => {
    if (
      wrapper !== questionWrapper &&
      wrapper.classList.contains("show-answer")
    ) {
      wrapper.classList.remove("show-answer");
      wrapper.querySelector(".material-symbols-rounded").innerHTML =
        "keyboard_arrow_down";
      wrapper.nextElementSibling.style.maxHeight = "0px";
    }
  });

  questionWrapper.classList.toggle("show-answer");

  if (!questionWrapper.classList.contains("show-answer")) {
    expandBtn.innerHTML = "keyboard_arrow_down";
    answerWrapper.style.maxHeight = "0px";
  } else {
    expandBtn.innerHTML = "keyboard_arrow_up";
    answerWrapper.style.maxHeight = `${answerWrapper.scrollHeight}px`;
  }
}
