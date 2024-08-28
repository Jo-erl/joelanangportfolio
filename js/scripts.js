document.addEventListener("DOMContentLoaded", () => {
  function toggleClassOnScroll(element, className, threshold = 0) {
    const rect = element.getBoundingClientRect();
    if (rect.bottom <= window.innerHeight + threshold) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }

  function setElementHeight(element, height) {
    element.style.height = `${height}px`;
    document.documentElement.style.setProperty(
      "--header-height",
      `${element.offsetHeight}px`
    );
  }

  function animateCount(element, target) {
    let count = 0;
    const duration = 2000;
    const start = performance.now();
    const numberSpan = element.querySelector(".number");

    function step(timestamp) {
      const progress = Math.min((timestamp - start) / duration, 1);
      numberSpan.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function isInView(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // NAVIGATION BAR
  (function navigationBar() {
    let prevScrollPos = window.pageYOffset;
    const nav = document.querySelector("nav");
    const navHeight = nav.offsetHeight;

    window.addEventListener("scroll", function () {
      let currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        nav.style.transform = "translateY(0)";
        nav.classList.remove("hidden");
      } else {
        if (currentScrollPos > navHeight) {
          nav.style.transform = `translateY(-${navHeight}px)`;
          nav.classList.add("hidden");
        }
      }
      prevScrollPos = currentScrollPos;
    });

    document.body.style.paddingTop = navHeight + "px";
  })();

  // MOBILE MENU
  (function mobileMenu() {
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeBtn = document.querySelector(".close-btn");
    const menuItems = mobileMenu.querySelectorAll("ul li a");

    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });

    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });

    document.addEventListener("click", (e) => {
      if (
        !mobileMenu.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)
      ) {
        mobileMenu.classList.remove("active");
      }
    });

    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    });
  })();

  // FOOTER FUNCTIONALITY
  (function footerFunctionality() {
    const footer = document.querySelector("footer");
    const footerContent = footer.querySelector(".footer-content");

    function handleScroll() {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const footerHeight = footer.offsetHeight;

        // Check if the footer is in the viewport
        if (scrollPosition + windowHeight > documentHeight - footerHeight) {
            footer.classList.add("reveal");
        } else {
            footer.classList.remove("reveal");
        }

        // Parallax effect
        const parallaxOffset = Math.max(0, scrollPosition * 0.3);
        footer.style.backgroundPositionY = `${parallaxOffset}px`;
    }

    // Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add("reveal");
            } else {
                footer.classList.remove("reveal");
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(footer);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
})();

  // HEADER TEXT ANIMATION
  (function headerTextAnimation() {
    let lastScrollTop = 0;
    const header = document.querySelector(".header-text");
    const headerContainer = document.querySelector(".parallax-header");
    const headerHeight = headerContainer.offsetHeight;
    const shootThreshold = 50;

    headerContainer.style.transition = "none";
    headerContainer.style.transform = "translateY(0)";
    headerContainer.offsetHeight;

    setTimeout(() => {
      headerContainer.style.transition = "";
    }, 0);

    window.addEventListener("scroll", function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        if (scrollTop > shootThreshold && scrollTop <= headerHeight) {
          header.classList.remove("sliding-down");
          header.classList.add("shooting-up");
          header.style.transform = `translate(-50%, -150%)`;
          header.style.opacity = "0";
        }
      } else {
        if (scrollTop <= headerHeight) {
          header.classList.remove("shooting-up");
          header.classList.add("sliding-down");
          header.style.transform = `translate(-50%, -50%)`;
          header.style.opacity = "1";
        }
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  })();

  // SET HEADER HEIGHT AND SCROLL TO MAIN SECTION
  (function setHeaderAndScroll() {
    const header = document.querySelector(".parallax-header");
    const headerContent = document.querySelector(".header-text");

    function setHeaderHeight() {
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      setElementHeight(header, vh);

      const contentHeight =
        headerContent.offsetHeight +
        document.getElementById("scrollDownHere").offsetHeight +
        40;
      if (contentHeight > vh) {
        setElementHeight(header, contentHeight);
      }
    }

    setHeaderHeight();

    window.addEventListener("load", setHeaderHeight);
    window.addEventListener("resize", setHeaderHeight);
  })();

  // PORTFOLIO ITEM REVEAL ANIMATION
  (function portfolioReveal() {
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("reveal", entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    portfolioItems.forEach((item) => {
      observer.observe(item);
    });
  })();

  // SKILLS PERCENTAGE ANIMATION
  (function skillsPercentageAnimation() {
    const skills = document.querySelectorAll(".percent");
    let counted = new Set();

    function startAnimation() {
      skills.forEach((skill) => {
        const target = +skill.getAttribute("data-percent");
        if (isInView(skill) && !counted.has(skill)) {
          animateCount(skill, target);
          counted.add(skill);
        } else if (!isInView(skill)) {
          counted.delete(skill);
        }
      });
    }

    window.addEventListener("scroll", startAnimation);
    startAnimation();
  })();

  // LOADER
  window.addEventListener("load", function () {
    const loader = document.getElementById("pageLoader", "pagesLoader");
    loader.style.display = "flex";

    setTimeout(function () {
      loader.style.display = "none";
      startRevealAnimation();
    }, 3000);
  });

  function startRevealAnimation() {
    const revealTexts = document.querySelectorAll(".reveal-text");
    revealTexts.forEach((text, index) => {
      setTimeout(() => {
        text.classList.add("revealed");
      }, index * 500);
    });
  }

  // MOUSE SCROLL DOWN BTN
  document
    .getElementById("scrollDownTo")
    .addEventListener("click", function () {
      document
        .getElementById("scrollDownHere")
        .scrollIntoView({ behavior: "smooth" });
    });

  // BACK TO TOP BUTTON FUNCTIONALITY
  (function backToTopButton() {
    const backToTopButton = document.getElementById("myBtn");

    // CHECK IF THE BUTTON EXISTS
    if (!backToTopButton) {
      console.warn("Back to top button not found.");
      return;
    }

    // HIDE THE BUTTON INITIALLY
    backToTopButton.style.display = "none";

    window.addEventListener("scroll", function () {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    });

    backToTopButton.addEventListener("click", function () {
      if ("scrollBehavior" in document.documentElement.style) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // FALLBACK FOR BROWSERS THAT DON'T SUPPORT SMOOTH SCROLLING
        document.body.scrollTop = 0; // FOR SAFARI
        document.documentElement.scrollTop = 0; // FOR CHROME, FIREFOX, IE AND OPERA
      }
    });
  })();

  // SERVICES SCROLL FADE EFFECT
  (function servicesScrollFade() {
    window.addEventListener("scroll", function () {
      document.querySelectorAll(".service-hidden").forEach((element) => {
        toggleClassOnScroll(
          element,
          "service-visible",
          window.innerHeight * 0.1
        );
      });
    });
  })();

  // DIVIDER REVEAL
  (function revealDividers() {
    function reveal() {
      document.querySelectorAll(".divider").forEach((divider) => {
        if (isInView(divider)) {
          divider.classList.add("reveal");
        } else {
          divider.classList.remove("reveal");
        }
      });
    }

    window.addEventListener("scroll", reveal);
    window.addEventListener("load", reveal);
  })();
});
