const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.querySelector(".sr-only").textContent = isOpen ? "Open menu" : "Close menu";
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector(".sr-only").textContent = "Open menu";
    primaryNav.classList.remove("is-open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector(".sr-only").textContent = "Open menu";
    primaryNav.classList.remove("is-open");
    menuToggle.focus();
  }
});

const searchInput = document.querySelector("#archive-search");
const categoryFilter = document.querySelector("#archive-filter");
const archiveItems = [...document.querySelectorAll(".archive-item")];
const noResults = document.querySelector("#no-results");

function filterArchive() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const category = categoryFilter.value;
  let visibleCount = 0;

  for (const item of archiveItems) {
    const matchesText = `${item.dataset.search} ${item.textContent}`.toLocaleLowerCase().includes(query);
    const matchesCategory = category === "all" || item.dataset.category === category;
    const isVisible = matchesText && matchesCategory;
    item.hidden = !isVisible;
    visibleCount += Number(isVisible);
  }

  noResults.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterArchive);
categoryFilter.addEventListener("change", filterArchive);

const dictionaryInput = document.querySelector("#dictionary-search");
const dictionaryFilter = document.querySelector("#dictionary-filter");
const dictionaryEntries = [...document.querySelectorAll(".dictionary-entry[data-status='published']")];
const dictionaryEmpty = document.querySelector("#dictionary-empty");

function filterDictionary() {
  const query = dictionaryInput.value.trim().toLocaleLowerCase();
  const category = dictionaryFilter.value;
  let visibleCount = 0;

  for (const entry of dictionaryEntries) {
    const matchesText = entry.textContent.toLocaleLowerCase().includes(query);
    const matchesCategory = category === "all" || entry.dataset.type === category;
    const isVisible = matchesText && matchesCategory;
    entry.hidden = !isVisible;
    visibleCount += Number(isVisible);
  }

  dictionaryEmpty.hidden = visibleCount > 0;
  dictionaryEmpty.textContent = dictionaryEntries.length === 0
    ? "No language entries have been culturally verified for publication yet."
    : "No verified public entries match this search.";
}

dictionaryInput.addEventListener("input", filterDictionary);
dictionaryFilter.addEventListener("change", filterDictionary);

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#form-notice").textContent =
    "Demo checks passed. Nothing was sent or saved. Do not use this prototype to submit real content or personal information.";
});

document.querySelector("#year").textContent = new Date().getFullYear();
