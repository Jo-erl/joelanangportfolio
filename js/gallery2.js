//==================================================================================//
//SHOWCASE//
const showcase = document.getElementById("showcase");
const loadMoreBtn = document.getElementById("load-more-showcase");
const showcaseModal = document.getElementById("showcase-modal");
const showcaseModalImage = document.getElementById("showcase-modal-image");
const prevBtn = document.getElementById("showcase-prev-btn");
const nextBtn = document.getElementById("showcase-next-btn");
const closeBtn = document.getElementById("showcase-close-btn");
const filterButtons = document.querySelectorAll(".showcase-filter");

const images = Array.from(document.querySelectorAll(".showcase-item img")).map(
  (img) => ({
    src: img.src,
    category: img.parentElement.dataset.category,
  })
);

let currentIndex = 0;
const imagesPerLoad = 8;
let currentCategory = "all";

function loadImages() {
  const items = Array.from(document.querySelectorAll(".showcase-item"));
  const filteredItems = items.filter(
    (item) =>
      currentCategory === "all" || item.dataset.category === currentCategory
  );

  filteredItems.forEach((item, index) => {
    if (index < currentIndex + imagesPerLoad) {
      item.classList.add("show");
    }
  });

  currentIndex += imagesPerLoad;

  if (currentIndex >= filteredItems.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

function filterImages(category) {
  currentCategory = category;
  currentIndex = 0;
  const items = document.querySelectorAll(".showcase-item");
  
  items.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
    item.classList.remove("show");
  });
  
  loadImages();
}

function scrollToActiveFilter(isInitial = false) {
  const filtersWrapper = document.querySelector('.showcase-filters-wrapper');
  const activeFilter = document.querySelector('.showcase-filter.active');
  
  if (activeFilter) {
    if (isInitial) {
      // For initial load, set scroll to 0 to show "All" at the start
      filtersWrapper.scrollLeft = 0;
    } else {
      const filterRect = activeFilter.getBoundingClientRect();
      const wrapperRect = filtersWrapper.getBoundingClientRect();
      
      const scrollLeft = filterRect.left - wrapperRect.left - (wrapperRect.width / 2) + (filterRect.width / 2);
      
      filtersWrapper.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }
}

function initializeShowcase() {
  // Set "All" as the active category
  const allButton = document.querySelector('.showcase-filter[data-category="all"]');
  if (allButton) {
    allButton.classList.add('active');
  }
  
  // Load initial images
  filterImages("all");
}

loadMoreBtn.addEventListener("click", loadImages);

showcase.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    showcaseModalImage.src = e.target.src;
    showcaseModal.style.display = "flex";
    showcaseModal.style.opacity = "0";
    showcaseModalImage.style.transform = "translateY(20px)";
    setTimeout(() => {
      showcaseModal.style.opacity = "1";
      showcaseModalImage.style.transform = "translateY(0)";
    }, 50);
  }
});

closeBtn.addEventListener("click", () => {
  showcaseModal.style.opacity = "0";
  showcaseModalImage.style.transform = "translateY(20px)";
  setTimeout(() => {
    showcaseModal.style.display = "none";
  }, 300);
});

prevBtn.addEventListener("click", () => {
  const currentSrc = showcaseModalImage.src;
  const currentIndex = images.findIndex((img) => img.src === currentSrc);
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  showcaseModalImage.src = images[prevIndex].src;
});

nextBtn.addEventListener("click", () => {
  const currentSrc = showcaseModalImage.src;
  const currentIndex = images.findIndex((img) => img.src === currentSrc);
  const nextIndex = (currentIndex + 1) % images.length;
  showcaseModalImage.src = images[nextIndex].src;
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    filterImages(button.dataset.category);
  });
});


// Call initializeShowcase when the page loads
window.addEventListener('load', initializeShowcase);
//==================================================================================//