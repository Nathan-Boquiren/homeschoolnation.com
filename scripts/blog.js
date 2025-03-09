let cl = console.log;

// ===== DOM Elements =====
const header = document.getElementById("blog-header");
const articleListContainer = document.getElementById("article-list-container");
const articleContainer = document.getElementById("blog-article-container");
const articleTitleWrapper = document.getElementById("article-title");
const articleContentWrapper = document.getElementById("article-content");

// ===== Global variables =====
let articleTitles = [];

// ===== Fetch blog articles =====

fetch("../articles/blog-articles.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((art) => {
      //   cl(art.title);
      articleTitles.push(art.title);
    });

    articleTitles = formatArticleTitles(articleTitles);
    populateArticles(articleTitles);
  })
  .catch((error) => {
    console.error("There was a problem fetching the articles:", error);
  });

// format blog article titles
function formatArticleTitles(titles) {
  for (let i = 0; i < titles.length; i++) {
    let newTitle = titles[i].replace(new RegExp("-", "g"), " ");
    titles.splice(i, 1, newTitle);
  }
  return titles;
}

// populate articles

function populateArticles(titles) {
  cl(titles);
  titles.forEach((title) => {
    articleListContainer.innerHTML += `
        <div class="article-prev-card">
            <div class="article-img"></div>
            <h3 class="article-title">${title}</h3>
        </div>`;
  });
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
