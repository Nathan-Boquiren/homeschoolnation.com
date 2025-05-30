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
      faqContainer.innerHTML += `<details class="faq-wrapper" name="faq">
          <summary class="question">${pair.question}</summary>
          <p class="answer">${pair.answer}</p>
        </details>`;
    });
  });
}
