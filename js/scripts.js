// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  //==================================================================================//
  // Navigation bar hide/show on scroll
  let prevScrollPos = window.pageYOffset;
  const nav = document.querySelector("nav");
  const navHeight = nav.offsetHeight;

  window.addEventListener("scroll", function () {
    let currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
      // Scrolling up
      nav.style.transform = "translateY(0)";
      nav.classList.remove("hidden");
    } else {
      // Scrolling down
      if (currentScrollPos > navHeight) {
        nav.style.transform = `translateY(-${navHeight}px)`;
        nav.classList.add("hidden");
      }
    }

    prevScrollPos = currentScrollPos;
  });

  // Add padding to body to prevent content from being hidden under fixed nav
  document.body.style.paddingTop = navHeight + "px";

  //==================================================================================//
  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".close-btn");
  const menuItems = mobileMenu.querySelectorAll("ul li a");

  // Toggle mobile menu on hamburger icon click
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  // Close mobile menu on close button click
  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !mobileMenu.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      mobileMenu.classList.remove("active");
    }
  });

  // Close menu when a menu item is clicked
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });

  //==================================================================================//
  // Footer functionality
  const footer = document.querySelector("footer");
  const currentYearSpan = document.querySelector(".current-year");

  // Set the current year in the footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  function handleScroll() {
    // Footer reveal animation
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop < windowHeight * 0.8) {
      footer.classList.add("reveal");
    } else {
      footer.classList.remove("reveal");
    }

    // Footer parallax effect
    const scrollPosition = window.pageYOffset;
    const parallaxOffset = scrollPosition * 0.3; // Adjust this value to change parallax intensity
    footer.style.backgroundPositionY = `${parallaxOffset}px`;
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Call initially to set the correct state on page load

  //==================================================================================//
  // Header text animation
  let lastScrollTop = 0;
  const header = document.querySelector(".header-text");
  const headerContainer = document.querySelector(".parallax-header");
  const headerHeight = headerContainer.offsetHeight;
  const shootThreshold = 50;

  // Remove transition initially to prevent animation on page load
  headerContainer.style.transition = "none";
  headerContainer.style.transform = "translateY(0)";
  headerContainer.offsetHeight; // Force a reflow

  // Re-enable transition after a short delay
  setTimeout(() => {
    headerContainer.style.transition = "";
  }, 0);

  window.addEventListener(
    "scroll",
    function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scrolling down
        if (scrollTop > shootThreshold && scrollTop <= headerHeight) {
          header.classList.remove("sliding-down");
          header.classList.add("shooting-up");
          header.style.transform = `translate(-50%, -150%)`;
          header.style.opacity = "0";
        }
      } else {
        // Scrolling up
        if (scrollTop <= headerHeight) {
          header.classList.remove("shooting-up");
          header.classList.add("sliding-down");
          header.style.transform = `translate(-50%, -50%)`;
          header.style.opacity = "1";
        }
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    },
    false
  );

  //==================================================================================//
  // Set header height and scroll to main section
  function setHeaderHeight() {
    const header = document.querySelector(".parallax-header");
    const headerContent = document.querySelector(".header-text");

    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );

    header.style.height = `${vh}px`;

    const contentHeight =
      headerContent.offsetHeight + scrollDown.offsetHeight + 40; // Added padding

    if (contentHeight > vh) {
      header.style.height = `${contentHeight}px`;
    }

    document.documentElement.style.setProperty(
      "--header-height",
      `${header.offsetHeight}px`
    );
  }

  window.addEventListener("load", setHeaderHeight);
  window.addEventListener("resize", setHeaderHeight);

  //==================================================================================//
  // Portfolio item reveal animation
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
        } else {
          entry.target.classList.remove("reveal");
        }
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

  //==================================================================================//
  // AOS (Animate On Scroll) initialization
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      offset: 200,
      once: false,
      mirror: true,
    });
  } else {
    console.error(
      "AOS is not defined. Make sure the AOS library is properly loaded."
    );
  }

  function handleWidthReveal() {
    const elements = document.querySelectorAll('[data-aos="width-reveal"]');

    elements.forEach((element) => {
      const isVisible = element.classList.contains("aos-animate");
      element.style.width = isVisible ? "100%" : "0";
    });
  }

  window.addEventListener("scroll", handleWidthReveal);
  handleWidthReveal(); // Call initially to set the correct state on page load

  //==================================================================================//
  // Skills percentage animation
  const skills = document.querySelectorAll(".percent");
  let counted = new Set();

  // Animate percentage count
  const animateCount = (element, target) => {
    let count = 0;
    const duration = 2000;
    const start = performance.now();
    const numberSpan = element.querySelector(".number");

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      numberSpan.textContent = Math.floor(progress * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const isInView = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const startAnimation = () => {
    skills.forEach((skill) => {
      const target = +skill.getAttribute("data-percent");
      if (isInView(skill) && !counted.has(skill)) {
        animateCount(skill, target);
        counted.add(skill);
      } else if (!isInView(skill)) {
        counted.delete(skill);
      }
    });
  };

  window.addEventListener("scroll", startAnimation);
  startAnimation(); // Call initially to animate skills that are already in view

  //==================================================================================//
  // Contact section animations
  const getInTouchH2 = document.getElementById("get-in-touch-h2");
  const getInTouchDivider = document.querySelector(".get-in-touch-divider");
  const contactItems = document.querySelectorAll(".contact-item");

  const revealOnScroll = () => {
    const revealElements = [getInTouchH2, getInTouchDivider];
    const windowHeight = window.innerHeight;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight * 0.8) {
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";

        if (element === getInTouchDivider) {
          getInTouchDivider.style.width = "60px";
        }
      } else {
        element.style.opacity = 0;
        element.style.transform = "translateY(20px)";
      }
    });
  };

  const revealContactItems = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    contactItems.forEach((item) => {
      const elementTop = item.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        item.style.opacity = 1;
        item.style.transform = "translateY(0)";
      } else {
        item.style.opacity = 0;
        item.style.transform = "translateY(20px)";
      }
    });
  };

  const revealText = () => {
    let text = getInTouchH2.textContent;
    getInTouchH2.textContent = "";
    getInTouchH2.style.opacity = 1;

    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        getInTouchH2.textContent += text[i];
        if (i === text.length - 1) {
          getInTouchDivider.style.opacity = 1;
        }
      }, 100 * i);
    }
  };

  window.addEventListener("scroll", () => {
    revealOnScroll();
    revealContactItems();
  });

  // Initial reveal check
  revealOnScroll();
  revealContactItems();
  revealText();

  //==================================================================================//
  // Back to top button functionality
  var backToTopButton = document.getElementById("myBtn");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  }

  backToTopButton.addEventListener("click", function () {
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Fallback for browsers that don't support smooth scrolling
      const currentPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentPosition > 0) {
        window.requestAnimationFrame(topFunction);
      }
    }
  });
});
