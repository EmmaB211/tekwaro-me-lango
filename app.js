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

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#form-notice").textContent =
    "Demo only: this form does not transmit or store your message. An approved contact service must be connected before launch.";
});

document.querySelector("#year").textContent = new Date().getFullYear();
