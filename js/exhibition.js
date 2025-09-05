//Exhibition//

const exhibition = document.getElementById("exhibition");
const loadMoreBtn = document.getElementById("load-more-exhibit");
const exhibitPopup = document.getElementById("exhibit-popup");
const exhibitPopupImage = document.getElementById("exhibit-popup-image");
const prevBtn = document.getElementById("exhibit-prev-btn");
const nextBtn = document.getElementById("exhibit-next-btn");
const exitBtn = document.getElementById("exhibit-exit-btn");
const hiddenExhibits = document.getElementById("hidden-exhibits");

const images = Array.from(document.querySelectorAll(".exhibit-item img")).map(
  (img) => img.src
);

const imagesPerLoad = 6;

function loadImages() {
  const visibleItems = exhibition.querySelectorAll(".exhibit-item");
  const hiddenItems = hiddenExhibits.querySelectorAll(".exhibit-item");
  const itemsToShow = Array.from(hiddenItems).slice(0, imagesPerLoad);

  itemsToShow.forEach((item) => {
    exhibition.appendChild(item);
    item.classList.add("show");
  });

  if (hiddenItems.length <= imagesPerLoad) {
    loadMoreBtn.style.display = "none";
  }
}

loadMoreBtn.addEventListener("click", loadImages);

exhibition.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    exhibitPopupImage.src = e.target.src;
    exhibitPopup.style.display = "flex";
    exhibitPopup.style.opacity = "0";
    exhibitPopupImage.style.transform = "translateY(20px)";
    setTimeout(() => {
      exhibitPopup.style.opacity = "1";
      exhibitPopupImage.style.transform = "translateY(0)";
    }, 50);
  }
});

exitBtn.addEventListener("click", () => {
  exhibitPopup.style.opacity = "0";
  exhibitPopupImage.style.transform = "translateY(20px)";
  setTimeout(() => {
    exhibitPopup.style.display = "none";
  }, 300);
});

function changeImage(direction) {
  const currentSrc = exhibitPopupImage.src;
  const currentIndex = images.indexOf(currentSrc);
  const newIndex = (currentIndex + direction + images.length) % images.length;
  exhibitPopupImage.src = images[newIndex];
}

prevBtn.addEventListener("click", () => changeImage(-1));
nextBtn.addEventListener("click", () => changeImage(1));

// Blur Items Till They Are Loaded
function handleImageLoad(img) {
  img.classList.add("loaded");
}

document.addEventListener("DOMContentLoaded", function () {
  const allImages = document.querySelectorAll(".exhibit-item img");

  allImages.forEach((img) => {
    img.addEventListener("load", () => handleImageLoad(img));
    if (img.complete) handleImageLoad(img);
  });

  // Move All Exhibit Items To Hidden Exhibits Initially
  const allItems = Array.from(document.querySelectorAll(".exhibit-item"));
  allItems.forEach((item) => hiddenExhibits.appendChild(item));

  // Initial Load Of Images
  loadImages();
});
