let cl = console.log;

// ===== DOM Elements =====
const header = document.getElementById("blog-header");
const mainBlogScreen = document.getElementById("main-blog-screen");
const articleListContainer = document.getElementById("article-list-container");
const blogContainer = document.getElementById("blog-article-container");
const blogTitleWrapper = document.getElementById("article-title");
const blogContentWrapper = document.getElementById("article-content");
const returnBtn = document.getElementById("return-btn");

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
  blogTitleWrapper.innerHTML = article.title;
  article.content.forEach((section) => {
    blogContentWrapper.innerHTML += `
        <h3 class="blog-section">${section.section}</h3>
        <p class="blog-section">${section.text}</p>`;
  });

  transitionPages();
}

// animate transition
function transitionPages() {
  mainBlogScreen.classList.add("fade-out");

  setTimeout(() => {
    mainBlogScreen.classList.remove("fade-out");
    mainBlogScreen.style.display = "none";
    blogContainer.style.display = "flex";

    blogContainer.classList.add("fade-in");
    let sections = document.querySelectorAll(".blog-section");
    animateBlogPost(sections);
  }, 300);
}

// animate blog post sections
function animateBlogPost(sections) {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        let delay = index * 200;
        setTimeout(() => {
          entry.target.classList.add("animate-in");
          entry.target.classList.remove("animate-out");
          observer.unobserve(entry.target);
        }, delay);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(element);
  });
}

// Return to blog posts btn
returnBtn.addEventListener("click", () => {
  window.location.reload();
});

// ===== Sticky scroll navbar =====
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
