/*
 * Lizbeth Faye Taguinod — Portfolio JavaScript
 * CC107 Activity 4: Application Development - Web Platforms
 *
 * Features:
 * - Mobile hamburger navigation.
 * - Closes the menu after a navigation link is selected.
 * - Allows keyboard users to close the menu with Escape.
 * - Shows a portrait placeholder if the profile image fails to load.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Get the hamburger button and the navigation menu.
  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");

  // Set up the menu only when both elements exist on the page.
  if (menuToggle && primaryNav) {
    /**
     * Open or close the mobile navigation menu.
     * @param {boolean} isOpen - Whether the menu should be visible.
     */
    function setMenuOpen(isOpen) {
      // The CSS uses the "open" class to show the mobile menu.
      primaryNav.classList.toggle("open", isOpen);

      // Keep the button's accessibility state and label up to date.
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    }

    // Toggle the menu when the hamburger button is clicked.
    menuToggle.addEventListener("click", () => {
      const menuIsOpen = menuToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!menuIsOpen);
    });

    // Close the menu after a visitor selects a navigation link.
    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    // Let keyboard users close the menu by pressing Escape.
    document.addEventListener("keydown", (event) => {
      const menuIsOpen = menuToggle.getAttribute("aria-expanded") === "true";

      if (event.key === "Escape" && menuIsOpen) {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    // Close the mobile menu when the screen returns to desktop size.
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 681px)").matches) {
        setMenuOpen(false);
      }
    });
  }

  // Find the profile image and its HTML placeholder.
  const profileImage = document.querySelector(".portrait-placeholder img");
  const profileFallback = document.querySelector(".portrait-fallback");

  // Show the placeholder if the profile image cannot be loaded.
  if (profileImage && profileFallback) {
    function showProfileFallback() {
      profileImage.hidden = true;
      profileImage.alt = "Portrait unavailable; placeholder shown instead";
      profileFallback.style.display = "grid";
    }

    // Handle an image that fails after the page has loaded.
    profileImage.addEventListener("error", showProfileFallback, { once: true });

    // Also handle an image that already failed before this code ran.
    if (profileImage.complete && profileImage.naturalWidth === 0) {
      showProfileFallback();
    }
  }
});
