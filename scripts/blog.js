let cl = console.log;

// ===== DOM Elements =====
const header = document.getElementById("blog-header");
const mainBlogScreen = document.getElementById("main-blog-screen");
const articleListContainer = document.getElementById("article-list-container");
const blogContainer = document.getElementById("blog-article-container");
const blogTitleWrapper = document.getElementById("article-title");
const blogContentWrapper = document.getElementById("article-content");

// ===== Global variables =====

// ===== Fetch blog articles =====

fetch("../articles/blog-articles.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    populateArticleCards(data);
  })
  .catch((error) => {
    console.error("There was a problem fetching the articles:", error);
  });

// populate articles

function populateArticleCards(data) {
  data.forEach((article) => {
    articleListContainer.innerHTML += `
        <div class="article-prev-card">
          <span class="line"></span>
          <h3 class="article-title">${article.title}</h3>
          <p class="article-date">${article.date}</p>
          <p class="prev-text">${article.preview_text}</p>
        </div>`;
  });

  // add event listener
  let articleCards = document.querySelectorAll(".article-prev-card");
  articleCards.forEach((card) => {
    card.addEventListener("click", () => {
      let articleTitle = card.querySelector(".article-title").innerHTML;
      articleTitle = formatArticleTitle(articleTitle);
      getArticle(articleTitle);
    });
  });
}

// format blog article titles
function formatArticleTitle(title) {
  return title
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/[^\w-]/g, "");
}

// fetch full article

async function fetchArticleData(title) {
  try {
    let response = await fetch(`../articles/${title}.json`);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem fetching the article:", error);
    return null;
  }
}

async function getArticle(title) {
  let article = await fetchArticleData(title);
  if (article) {
    populateBlogContainer(article);
  } else {
    console.log("Failed to fetch article.");
  }
}

// populate full blog

function populateBlogContainer(article) {
  document.title = article.title;
  blogContainer.style.display = "flex";
  mainBlogScreen.style.display = "none";
  blogTitleWrapper.innerHTML = article.title;
  article.content.forEach((section) => {
    blogContentWrapper.innerHTML += `
        <h3>${section.section}</h3>
        <p>${section.text}</p>`;
  });
  // blogContainer.classList.add("fade-in");
  // setTimeout(() => {
  //   blogContainer.classList.remove("fade-in");
  // }, 300);
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
