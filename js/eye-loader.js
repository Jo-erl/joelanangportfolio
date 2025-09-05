// Home Page Loader 
(() => {
  const LOADER_DURATION = 2000; // 2 seconds
  const startTime = performance.now();
  let loaderHidden = false;

  const hideLoader = () => {
    if (loaderHidden) return;

    const loader = document.getElementById('pageLoader');
    if (loader) {
      loader.style.display = 'none';
      loaderHidden = true;
      
      // Start reveal animation after loader hides
      startRevealAnimation();
    }
  };

  const scheduleLoaderHide = () => {
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, LOADER_DURATION - elapsed);

    setTimeout(hideLoader, remaining);
  };

  // Handle Case Where Dom Is Already Loaded
  if (document.readyState === 'complete') {
    scheduleLoaderHide();
  } else {
    // Wait For Full Page Load, Then Schedule Hide Based On Timing
    window.addEventListener('load', scheduleLoaderHide, { once: true });

    // Fallback: Always Hide After Exactly 2 Seconds, Regardless Of Load Status
    setTimeout(hideLoader, LOADER_DURATION);
  }
})();

// Reveal animation function
function startRevealAnimation() {
  const revealTexts = document.querySelectorAll('.reveal-text');
  revealTexts.forEach((text, index) => {
    setTimeout(() => {
      text.classList.add('revealed');
    }, index * 500);
  });
}
