// HOME PAGE LOADER
// This function is called when the page is loaded
window.addEventListener("load", () => {
  // Use performance.now() for more accurate timing if needed
  const loader = document.getElementById("pageLoader");

  // Force a reflow to ensure the loader is visible before hiding it
  void loader.offsetWidth;

  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});
