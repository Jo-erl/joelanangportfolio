document.addEventListener('DOMContentLoaded', function () {
  const sliderContainer = document.querySelector('.slider-container');
  const slider = document.querySelector('.slider');
  const images = document.querySelectorAll('.slider img');
  const thumbnailsContainer = document.querySelector('.thumbnails');
  const thumbnails = document.querySelector('.thumbnails');
  const prevArrow = document.querySelector('.prev-arrow');
  const nextArrow = document.querySelector('.next-arrow');

  // Show only three thumbnails at a time
  const thumbnailsToShow = 3;
  const totalThumbnails = images.length;
  const thumbnailWidth = thumbnailsContainer.offsetWidth / thumbnailsToShow; // Calculate thumbnail width based on container width

  // Set the width of the thumbnails container to accommodate all thumbnails
  thumbnails.style.width = `${thumbnailWidth * totalThumbnails}px`;

  let currentSlide = 0;

  // Create thumbnails
  images.forEach((img, index) => {
    const thumbnail = document.createElement('div');
    thumbnail.classList.add('thumbnail');
    thumbnail.innerHTML = `<img src="${img.src}" alt="Thumbnail ${index + 1}">`;

    thumbnail.addEventListener('click', function () {
      showSlide(index);
    });

    thumbnails.appendChild(thumbnail);
  });

  // Show the first slide initially
  showSlide(0);

  // Flag to control the automatic looping behavior
  let allowLoop = false;

  // Slide to the next image
  nextArrow.addEventListener('click', function () {
    if (currentSlide < totalThumbnails - 1) {
      currentSlide++;
    } else {
      // If the current slide is the last one, set the flag to enable looping
      allowLoop = true;
    }
    showSlide(currentSlide);
  });

  // Slide to the previous image
  prevArrow.addEventListener('click', function () {
    if (currentSlide > 0) {
      currentSlide--;
    } else {
      // If the current slide is the first one, loop to the last slide
      currentSlide = totalThumbnails - 1;
    }
    showSlide(currentSlide);
  });

  function showSlide(index) {
    images.forEach((img) => (img.style.display = 'none'));
    images[index].style.display = 'block';
    currentSlide = index;

    // Adjust thumbnail container position to show only visible thumbnails
    if (currentSlide >= thumbnailsToShow - 1) {
      thumbnails.style.transform = `translateX(-${thumbnailWidth * currentSlide}px)`;
    } else {
      thumbnails.style.transform = 'translateX(0)';
    }

    // Show the image counter below the thumbnail
    const thumbnailDivs = document.querySelectorAll('.thumbnail');
    const imageCounter = document.querySelector('.image-counter');
    imageCounter.textContent = `${index + 1}/${totalThumbnails}`;

    thumbnailDivs.forEach((div, idx) => {
      if (idx === index) {
        div.innerHTML = `<img src="${images[index].src}" alt="Thumbnail ${index + 1}">`;
      } else {
        div.innerHTML = `<img src="${images[idx].src}" alt="Thumbnail ${idx + 1}">`;
      }
    });

    // Check for looping to the first thumbnail
    if (currentSlide === totalThumbnails - 1 && allowLoop) {
      allowLoop = false; // Reset the flag
      setTimeout(() => {
        currentSlide = 0;
        thumbnails.style.transform = 'translateX(0)';
        showSlide(0);
      }, 1000); // Add a small delay to give time for the transition to finish
    }
  }
});
