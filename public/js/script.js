document.addEventListener("DOMContentLoaded", () => {
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

  // Folder toggle
  document.querySelectorAll(".folder-name").forEach((folder) => {
    folder.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent sidebar from closing when clicking folders
      const parentFolder = folder.parentElement;
      parentFolder.classList.toggle("active");
    });
  });
});

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

// Function to handle navbar active states
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(
    ".nav-menu a:not([href*='resume'])"
  );

  const scrollPosition = window.scrollY;
  const viewportHeight = window.innerHeight;
  const offset = viewportHeight * 0.2;

  let currentSection = null;
  let minDistance = Infinity;

  const skillsSection = document.querySelector("#skills");
  const skillsRect = skillsSection.getBoundingClientRect();
  const skillsTop = skillsRect.top + scrollPosition;

  if (scrollPosition < skillsTop - viewportHeight * 0.3) {
    currentSection = document.querySelector("#about");
  } else {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollPosition;
      const sectionBottom = sectionTop + rect.height;

      const threshold = Math.min(viewportHeight * 0.15, 150);

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

let scrollTimeout;
window.addEventListener("scroll", () => {
  if (!scrollTimeout) {
    scrollTimeout = requestAnimationFrame(() => {
      updateActiveNavLink();
      scrollTimeout = null;
    });
  }
});

document.addEventListener("DOMContentLoaded", updateActiveNavLink);

window.addEventListener("resize", () => {
  updateActiveNavLink();
});
