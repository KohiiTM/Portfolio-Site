const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = ["bisque"];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

document.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const distanceFromCenter = Math.sqrt(
    Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
  );

  const circles = document.querySelectorAll(".circle");
  // Increased to 0.75 to push the color change threshold closer to the edges
  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.82;

  circles.forEach((circle) => {
    if (distanceFromCenter > radius) {
      circle.style.backgroundColor = "#322d1a";
      circle.style.transition = "background-color 0.3s ease";
    } else {
      circle.style.backgroundColor = "#edebde";
      circle.style.transition = "background-color 0.3s ease";
    }
  });
});
