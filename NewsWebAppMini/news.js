// Select the timer div and time element
const timerDiv = document.querySelector('.timer');
const timeElement = document.getElementById('time');

// Function to update the time every second
function updateTime() {
    // Get the current date and time
    const now = new Date();

    // Format the time as HH:MM AM/PM
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Update the time element with the formatted time
    timeElement.textContent = formattedTime;
}

// Call updateTime function every second
setInterval(updateTime, 1000);