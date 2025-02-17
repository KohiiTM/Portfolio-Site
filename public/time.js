document.addEventListener("DOMContentLoaded", function() {
    const timeDisplay = document.getElementById("seattle-time");

    function fetchTime() {
        fetch("https://timeapi.io/api/Time/current/zone?timeZone=America/Los_Angeles")
            .then(response => response.json())
            .then(data => {
                const timeString = new Date(data.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                timeDisplay.textContent = `| Time: ${timeString}`;
            })
            .catch(error => console.error("Error fetching time:", error));
    }

    fetchTime();
    setInterval(fetchTime, 1000); // Update time every minute
});