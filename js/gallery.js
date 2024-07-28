//==================================================================================//
//EXHIBITION//

const exhibition = document.getElementById("exhibition");
const loadMoreBtn = document.getElementById("load-more-exhibit");
const exhibitPopup = document.getElementById("exhibit-popup");
const exhibitPopupImage = document.getElementById("exhibit-popup-image");
const prevBtn = document.getElementById("exhibit-prev-btn");
const nextBtn = document.getElementById("exhibit-next-btn");
const exitBtn = document.getElementById("exhibit-exit-btn");

const images = Array.from(document.querySelectorAll(".exhibit-item img")).map(
  (img) => img.src
);

let currentIndex = 0;
const imagesPerLoad = 8;

function loadImages() {
  const items = document.querySelectorAll(".exhibit-item");
  const endIndex = Math.min(currentIndex + imagesPerLoad, items.length);

  for (let i = currentIndex; i < endIndex; i++) {
    items[i].classList.add("show");
  }

  currentIndex = endIndex;

  if (currentIndex >= items.length) {
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

prevBtn.addEventListener("click", () => {
  const currentSrc = exhibitPopupImage.src;
  const currentIndex = images.indexOf(currentSrc);
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  exhibitPopupImage.src = images[prevIndex];
});

nextBtn.addEventListener("click", () => {
  const currentSrc = exhibitPopupImage.src;
  const currentIndex = images.indexOf(currentSrc);
  const nextIndex = (currentIndex + 1) % images.length;
  exhibitPopupImage.src = images[nextIndex];
});

loadImages();
//==================================================================================//
