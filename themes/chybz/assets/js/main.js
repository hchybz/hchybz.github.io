/**
 * Main JavaScript file for interactivity
 * Handles mobile menu toggle and other UI interactions
 */

document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const sidebar = document.getElementById("sidebar");
  let overlay = null;

  /**
   * Create overlay element for mobile menu
   */
  function createOverlay() {
    overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";
    overlay.addEventListener("click", closeSidebar);
    document.body.appendChild(overlay);
  }

  /**
   * Open sidebar on mobile
   */
  function openSidebar() {
    sidebar.classList.remove("-translate-x-full");
    sidebar.classList.add("translate-x-0");

    if (overlay) {
      overlay.classList.add("active");
    }
  }

  /**
   * Close sidebar on mobile
   */
  function closeSidebar() {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("-translate-x-full");

    if (overlay) {
      overlay.classList.remove("active");
    }
  }

  /**
   * Toggle sidebar visibility
   */
  function toggleSidebar() {
    if (sidebar.classList.contains("-translate-x-full")) {
      openSidebar();
    } else {
      closeSidebar();
    }
  }

  // Create overlay on page load
  createOverlay();

  // Mobile menu button click handler
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleSidebar);
  }

  // Close sidebar when clicking on a category link (mobile only)
  const categoryLinks = document.querySelectorAll(".category-link");
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Only close on mobile (when sidebar has -translate-x-full class)
      if (window.innerWidth < 768) {
        closeSidebar();
      }
    });
  });

  // Handle window resize - close sidebar on mobile when resizing
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth >= 768) {
        // Desktop view - remove mobile classes
        sidebar.classList.remove("translate-x-0");
        if (overlay) {
          overlay.classList.remove("active");
        }
      } else {
        // Mobile view - ensure sidebar is hidden
        if (!sidebar.classList.contains("-translate-x-full")) {
          closeSidebar();
        }
      }
    }, 250);
  });

  // Handle category switching (optional - for future enhancement)
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Remove active class from all links
      categoryLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");
    });
  });

  // Set active link based on URL hash on page load
  const currentHash = window.location.hash;
  if (currentHash) {
    const activeLink = document.querySelector(`a[href="${currentHash}"]`);
    if (activeLink && activeLink.classList.contains("category-link")) {
      categoryLinks.forEach((l) => l.classList.remove("active"));
      activeLink.classList.add("active");
    }
  }

  /**
   * Handle collapsible category sections
   */
  const categoryToggles = document.querySelectorAll(".category-toggle");

  categoryToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const articleList = this.nextElementSibling;
      const chevron = this.querySelector("svg");

      // Toggle the article list visibility
      if (articleList && articleList.classList.contains("article-list")) {
        const isHidden = articleList.classList.contains("hidden");

        if (isHidden) {
          // Show the list
          articleList.classList.remove("hidden");
          chevron.classList.add("rotate-180");
        } else {
          // Hide the list
          articleList.classList.add("hidden");
          chevron.classList.remove("rotate-180");
        }
      }
    });
  });

  // Auto-expand the category of the current page
  const currentPath = window.location.pathname;
  let categoryFound = false;

  // Check if we're on an article page by looking for article links in the sidebar
  categoryToggles.forEach((toggle) => {
    const articleList = toggle.nextElementSibling;
    if (articleList && articleList.classList.contains("article-list")) {
      const links = articleList.querySelectorAll("a");
      let foundInThisCategory = false;

      links.forEach((link) => {
        const linkHref = link.getAttribute("href");
        // Normalize paths for comparison (remove trailing slashes)
        const normalizedLinkHref = linkHref.replace(/\/$/, "");
        const normalizedCurrentPath = currentPath.replace(/\/$/, "");

        // If the current page matches this link, expand this category
        if (normalizedLinkHref === normalizedCurrentPath) {
          foundInThisCategory = true;
          categoryFound = true;
          // Highlight the active article link
          link.classList.add("bg-blue-50", "text-blue-600", "font-medium");
        }
      });

      // If we found a matching article in this category, expand it
      if (foundInThisCategory) {
        const chevron = toggle.querySelector("svg");
        articleList.classList.remove("hidden");
        chevron.classList.add("rotate-180");
      }
    }
  });

  // If no category was opened (e.g., on home page), auto-expand IT category as default
  if (!categoryFound) {
    const itToggle = document.querySelector(
      '.category-toggle[data-category="it"]',
    );
    if (itToggle) {
      const articleList = itToggle.nextElementSibling;
      const chevron = itToggle.querySelector("svg");
      if (articleList) {
        articleList.classList.remove("hidden");
        chevron.classList.add("rotate-180");
      }
    }
  }

  // Close sidebar when clicking on an article link (mobile only)
  const articleLinks = document.querySelectorAll(".article-list a");
  articleLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 768) {
        closeSidebar();
      }
    });
  });
});

// Carousel functionality
const carousels = document.querySelectorAll(".carousel-container");

carousels.forEach((carousel) => {
  const slides = carousel.querySelectorAll(".carousel-slide");
  const prevBtn = carousel.querySelector(".carousel-prev");
  const nextBtn = carousel.querySelector(".carousel-next");
  const indicators = carousel.querySelectorAll(".carousel-indicator");
  let currentSlide = 0;

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Show the target slide
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    slides[currentSlide].classList.add("active");
    indicators[currentSlide].classList.add("active");
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide(currentSlide + 1);
    });
  }

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(currentSlide - 1);
    });
  }

  // Indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      showSlide(currentSlide - 1);
    } else if (e.key === "ArrowRight") {
      showSlide(currentSlide + 1);
    }
  });

  // Optional: Auto-advance (uncomment to enable)
  // setInterval(() => {
  //     showSlide(currentSlide + 1);
  // }, 5000);
});
