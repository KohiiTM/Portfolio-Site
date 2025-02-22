const toggleSwitch = document.getElementById('theme-toggle');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  toggleSwitch.checked = true;
}

// Toggle Theme on Switch
toggleSwitch.addEventListener('change', () => {
  if (toggleSwitch.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});

document.addEventListener("DOMContentLoaded", function() {
  function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  if (isMobileDevice()) {
    document.querySelector(".sidebar").style.display = "none";
  }
});

document.querySelectorAll('.project-card').forEach(card => {
  const previewUrl = card.dataset.preview;
  card.style.setProperty('--preview-image', `url('${previewUrl}')`);
});