const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const resetButton = document.getElementById("reset");

const sampleTexts = [
  "I am a front-end engineer who loves building user interfaces.",
  "With JavaScript, React, and CSS, I create smooth web experiences.",
  "I am earning my Software Engineering degree at WGU.",
  "Agile methods and debugging improve my development process.",
  "Based in Seattle, I seek front-end roles that push my skills.",
  "I've built inventory tools, event apps, and more.",
  "Git, Docker, and PostgreSQL help me build scalable apps.",
  "I focus on user-friendly design and web accessibility.",
  "My portfolio features projects using React and Flask.",
  "I write clean, efficient code for great user experiences."
];



let chosenText = "";
let startTime = null;
let timerInterval;
let totalCorrectChars = 0;
let totalTypedChars = 0;
const totalTime = 60; // Total time for the test in seconds

// Function to start the test
function startTest() {
  chosenText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  textDisplay.innerHTML = chosenText
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");

  textInput.value = "";
  focusInput(); // Ensure input is focused
  clearInterval(timerInterval);
  timerDisplay.textContent = totalTime.toString();
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "100";

  startTime = null;
  totalCorrectChars = 0;
  totalTypedChars = 0;
}

// Function to update WPM & accuracy
function updateStats() {
  if (!startTime) return;

  const elapsedTime = (Date.now() - startTime) / 1000 / 60; // in minutes
  const correctChars = textInput.value
    .split("")
    .filter((char, index) => char === chosenText[index]).length;
  const wpm = Math.round((totalCorrectChars + correctChars) / 5 / elapsedTime);

  wpmDisplay.textContent = isNaN(wpm) || elapsedTime < 1 / 60 ? "0" : wpm;

  // Calculate accuracy
  let correctCharsCount = 0;
  const inputChars = textInput.value.split("");
  const textChars = chosenText.split("");

  textChars.forEach((char, index) => {
    const span = textDisplay.children[index];
    if (inputChars[index] === char) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
      correctCharsCount++;
    } else if (inputChars[index] !== undefined) {
      span.classList.add("incorrect");
      span.classList.remove("correct");
    } else {
      span.classList.remove("correct", "incorrect");
    }
  });

  totalTypedChars += inputChars.length;

  const accuracy = ((totalCorrectChars / totalTypedChars) * 100).toFixed(2);
  accuracyDisplay.textContent = accuracy;
}

// Function to ensure input is always focused
function focusInput() {
  textInput.focus();
}

// Function to start the timer and continuously update WPM
function startTimer() {
  if (startTime) return; // Prevent multiple timers
  startTime = Date.now();

  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const remainingTime = totalTime - elapsedTime;
    timerDisplay.textContent = remainingTime.toString();

    updateStats(); // Update WPM continuously

    // Check if time is up
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      textInput.disabled = true;
      timerDisplay.textContent = "0";
    }
  }, 1000); // Update every second
}

// Event Listener for typing
textInput.addEventListener("input", () => {
  startTimer();
  updateStats();

  // Check if completed
  if (textInput.value === chosenText) {
    totalCorrectChars += textInput.value.length; // Add the length of the completed text to totalCorrectChars
    chosenText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textDisplay.innerHTML = chosenText
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");
    textInput.value = "";
  }
});

// Ensure input is focused when clicking anywhere on the page
document.addEventListener("click", focusInput);

// Ensure input is focused when any key is pressed
document.addEventListener("keydown", focusInput);

// Reset Button
resetButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  startTest();
  textInput.disabled = false;
});

// Initialize test
startTest();
