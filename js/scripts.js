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
      '--header-height',
      `${element.offsetHeight}px`
    );
  }

  function animateCount(element, target) {
    let count = 0;
    const duration = 2000;
    const start = performance.now();
    const numberSpan = element.querySelector('.number');

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

  // Navigation Bar
  (function navigationBar() {
    let prevScrollPos = window.pageYOffset;
    const nav = document.querySelector('nav');
    const navHeight = nav.offsetHeight;

    window.addEventListener('scroll', function () {
      let currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        nav.style.transform = 'translateY(0)';
        nav.classList.remove('hidden');
      } else {
        if (currentScrollPos > navHeight) {
          nav.style.transform = `translateY(-${navHeight}px)`;
          nav.classList.add('hidden');
        }
      }
      prevScrollPos = currentScrollPos;
    });

    document.body.style.paddingTop = navHeight + 'px';
  })();

  // Mobile Menu
  (function mobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = mobileMenu.querySelectorAll('ul li a');

    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
      if (
        !mobileMenu.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)
      ) {
        mobileMenu.classList.remove('active');
      }
    });

    menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  })();

  // Footer Functionality
  (function footerFunctionality() {
    const footer = document.querySelector('footer');
    const footerContent = footer.querySelector('.footer-content');

    function handleScroll() {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const footerHeight = footer.offsetHeight;

      // Check If The Footer Is In The Viewport
      if (scrollPosition + windowHeight > documentHeight - footerHeight) {
        footer.classList.add('reveal');
      } else {
        footer.classList.remove('reveal');
      }

      // Parallax Effect
      const parallaxOffset = Math.max(0, scrollPosition * 0.3);
      footer.style.backgroundPositionY = `${parallaxOffset}px`;
    }

    // Intersection Observer For Better Performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footer.classList.add('reveal');
          } else {
            footer.classList.remove('reveal');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(footer);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
  })();

  // Header Text Animation - Fixed To Sync With 2-Second Loader
  (function headerTextAnimation() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header-text');
    const headerContainer = document.querySelector('.parallax-header');
    const headerHeight = headerContainer ? headerContainer.offsetHeight : 0;
    const shootThreshold = 50;

    // Function To Animate Header Reveal
    function revealHeader() {
      if (!header) return;
      header.classList.remove('shooting-up');
      header.classList.add('sliding-down');
      header.style.transform = `translate(-50%, -50%)`;
      header.style.opacity = '1';
    }

    // Function To Hide Header (Shoot Up)
    function hideHeader() {
      if (!header) return;
      header.classList.remove('sliding-down');
      header.classList.add('shooting-up');
      header.style.transform = `translate(-50%, -150%)`;
      header.style.opacity = '0';
    }

    // Scroll Event Handler
    window.addEventListener('scroll', function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scrolling Down
        if (scrollTop > shootThreshold && scrollTop <= headerHeight) {
          hideHeader();
        }
      } else {
        // Scrolling Up
        if (scrollTop <= headerHeight) {
          revealHeader();
        }
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Reveal Immediately After 2-Second Loader
    const LOADER_DURATION = 2000; // Match The Loader Duration
    const startTime = performance.now();

    const revealAfterLoader = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, LOADER_DURATION - elapsed);

      setTimeout(() => {
        revealHeader();
      }, remaining);
    };

    // Handle Case Where Dom Is Already Loaded
    if (document.readyState === 'complete') {
      revealAfterLoader();
    } else {
      // Wait For Full Page Load, Then Schedule Reveal Based On Timing
      window.addEventListener('load', revealAfterLoader, { once: true });

      // Fallback: Always Reveal After Exactly 2 Seconds
      setTimeout(revealHeader, LOADER_DURATION);
    }
  })();

  // Portfolio Item Reveal Animation
  (function portfolioReveal() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('reveal', entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    portfolioItems.forEach((item) => {
      observer.observe(item);
    });
  })();

  // Skills Percentage Animation
  (function skillsPercentageAnimation() {
    const skills = document.querySelectorAll('.percent');
    let counted = new Set();

    function startAnimation() {
      skills.forEach((skill) => {
        const target = +skill.getAttribute('data-percent');
        if (isInView(skill) && !counted.has(skill)) {
          animateCount(skill, target);
          counted.add(skill);
        } else if (!isInView(skill)) {
          counted.delete(skill);
        }
      });
    }

    window.addEventListener('scroll', startAnimation);
    startAnimation();
  })();

  // Mouse Scroll Down Btn
  document
    .getElementById('scrollDownTo')
    .addEventListener('click', function () {
      document
        .getElementById('scrollDownHere')
        .scrollIntoView({ behavior: 'smooth' });
    });

  // Back To Top Button Functionality
  (function backToTopButton() {
    const backToTopButton = document.getElementById('myBtn');

    // Check If The Button Exists
    if (!backToTopButton) {
      console.warn('Back to top button not found.');
      return;
    }

    // Hide The Button Initially
    backToTopButton.style.display = 'none';

    window.addEventListener('scroll', function () {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });

    backToTopButton.addEventListener('click', function () {
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Fallback For Browsers That Don't Support Smooth Scrolling
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, Ie And Opera
      }
    });
  })();

  // Services Scroll Fade Effect
  (function servicesScrollFade() {
    window.addEventListener('scroll', function () {
      document.querySelectorAll('.service-hidden').forEach((element) => {
        toggleClassOnScroll(
          element,
          'service-visible',
          window.innerHeight * 0.1
        );
      });
    });
  })();

  // Divider Reveal
  (function revealDividers() {
    function reveal() {
      document.querySelectorAll('.divider').forEach((divider) => {
        if (isInView(divider)) {
          divider.classList.add('reveal');
        } else {
          divider.classList.remove('reveal');
        }
      });
    }

    window.addEventListener('scroll', reveal);
    window.addEventListener('load', reveal);
  })();
});
