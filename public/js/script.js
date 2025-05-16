// Wait for both DOM and resources to be fully loaded
window.addEventListener("load", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileMenuBtn.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    }
  });

  // dark mode toggle
  const themeToggle = document.getElementById("theme-toggle");
  const modeText = document.querySelector(".mode-text");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.checked = true;
    modeText.textContent = "Light Mode";
  }

  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      modeText.textContent = "Light Mode";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      modeText.textContent = "Dark Mode";
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        navMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
      }
    });
  });

  const sidebarTab = document.querySelector(".sidebar-tab");
  const sidebar = document.querySelector(".sidebar");

  sidebarTab.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    sidebarTab.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !sidebarTab.contains(e.target)) {
      sidebar.classList.remove("active");
      sidebarTab.classList.remove("active");
    }
  });

  document.querySelectorAll(".folder-name").forEach((folder) => {
    folder.addEventListener("click", (e) => {
      e.stopPropagation();
      const parentFolder = folder.parentElement;
      parentFolder.classList.toggle("active");
    });
  });

  // Initialize active nav link
  updateActiveNavLink();
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(
    ".nav-menu a:not([href*='resume'])"
  );

  const scrollPosition = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const offset = viewportHeight * 0.2;

  const isAtBottom = scrollPosition + viewportHeight >= documentHeight - 100;

  let currentSection = null;
  let minDistance = Infinity;

  if (isAtBottom) {
    currentSection = document.querySelector("#education");
  } else {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollPosition;
      const sectionBottom = sectionTop + rect.height;

      const threshold = Math.min(viewportHeight * 0.2, 200);

      if (
        scrollPosition + offset >= sectionTop - threshold &&
        scrollPosition + offset <= sectionBottom + threshold
      ) {
        const distance = Math.abs(sectionTop - (scrollPosition + offset));
        if (distance < minDistance) {
          minDistance = distance;
          currentSection = section;
        }
      }
    });
  }

  // If no section is found and we're not at the bottom, default to the first section
  if (!currentSection && !isAtBottom) {
    currentSection = document.querySelector("#about");
  }

  // Update active state for nav links
  if (currentSection) {
    const currentId = currentSection.getAttribute("id");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === currentId) {
        link.classList.add("active");
      }
    });
  }
}

// Add scroll event listener with improved throttling
let scrollTimeout;
window.addEventListener(
  "scroll",
  () => {
    if (!scrollTimeout) {
      scrollTimeout = requestAnimationFrame(() => {
        updateActiveNavLink();
        scrollTimeout = null;
      });
    }
  },
  { passive: true }
);

// Update active state on resize with debounce
let resizeTimeout;
window.addEventListener(
  "resize",
  () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
      updateActiveNavLink();
    }, 100);
  },
  { passive: true }
);

// Initial call after a short delay to ensure proper calculation
setTimeout(updateActiveNavLink, 100);

document.addEventListener("DOMContentLoaded", function () {
  function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  if (isMobileDevice()) {
    document.querySelector(".sidebar").style.display = "none";
  }
});

document.querySelectorAll(".project-card").forEach((card) => {
  const previewUrl = card.dataset.preview;
  card.style.setProperty("--preview-image", `url('${previewUrl}')`);
});
