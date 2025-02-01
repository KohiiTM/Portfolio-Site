// Variables
const numCircles = 20; // Number of circles
const coords = { x: 0, y: 0 }; // Current mouse coordinates

// Create the circle container only once
const circleContainer = document.getElementById("circle-container");

// Create circles dynamically and style them
for (let i = 0; i < numCircles; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.position = "absolute";
  circle.style.width = "14px";
  circle.style.height = "14px";
  circle.style.borderRadius = "50%";
  circle.style.transition = "background-color 0.3s ease";
  circleContainer.appendChild(circle);
}

const circles = document.querySelectorAll(".circle");
const colors = ["bisque"]; // Color for the circles

// Initial styling of circles
circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

// Store last position to calculate the movement direction
let lastCoords = { x: 0, y: 0 };

// Mouse move event handler with throttling
let throttleTimeout;
window.addEventListener("mousemove", (e) => {
  coords.x = e.clientX + window.scrollX; // Adjust for scroll position
  coords.y = e.clientY + window.scrollY; // Adjust for scroll position

  // Throttle the updates to optimize performance
  if (throttleTimeout) return; // If a timeout exists, exit the function
  throttleTimeout = setTimeout(() => {
    throttleTimeout = null; // Reset throttle after a short delay
  }, 10); // Adjust the delay for smoothness vs. performance balance
});

// Function to animate circles and sync with mouse movement
function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    const scale = (circles.length - index) / circles.length;

    // Adjust for perfect centering by subtracting half of the circle's size (7px)
    circle.style.left = `${x - 7}px`;
    circle.style.top = `${y - 7}px`;
    circle.style.transform = `scale(${scale})`;

    circle.x = x;
    circle.y = y;

    // Interpolate the positions of each circle for trailing effect
    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  // Request next animation frame for smooth performance
  requestAnimationFrame(animateCircles);
}

// Initial animation loop
animateCircles();

// Handle color change based on mouse position relative to center
document.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const distanceFromCenter = Math.sqrt(
    Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
  );

  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.82;

  circles.forEach((circle) => {
    if (distanceFromCenter > radius) {
      circle.style.backgroundColor = "#322d1a"; // Dark color when far from center
    } else {
      circle.style.backgroundColor = "#edebde"; // Light color when near the center
    }
  });
});

// Optimize cursor visibility when the document becomes inactive
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Hide the circles when the tab is inactive
    circles.forEach((circle) => {
      circle.style.display = "none"; // Hide circles when inactive
    });
  } else {
    // Show the circles when the tab is active again
    circles.forEach((circle) => {
      circle.style.display = "block"; // Show circles when active
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    function isMobileDevice() {
      return /Mobi|Android/i.test(navigator.userAgent);
    }

    if (isMobileDevice()) {
      document.getElementById("circle-container").classList.add("hide-circle");
    }
  });
});
