// HOME PAGE LOADER
// Record the start time right away
const startTime = performance.now();

window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");

  // Force a reflow to ensure loader is visible
  void loader.offsetWidth;

  // Calculate how much time has already passed
  const elapsed = performance.now() - startTime;
  const remaining = Math.max(0, 2000 - elapsed); // ensure 2s total

  // Hide loader after remaining time
  setTimeout(() => {
    loader.style.display = "none";
  }, remaining);
});
