// Get items from local storage
const subtitle = localStorage.getItem("generatedSubtitle");
const day = localStorage.getItem("day");
const hour = localStorage.getItem("hour");
const month = localStorage.getItem("month");
const year = localStorage.getItem("year");
const startHour = localStorage.getItem("start-hour");


function showGeneratedSubtitle() {
    const subtitleElement = document.getElementById("subtitle");
    subtitleElement.innerText = subtitle;
    console.log("Generated subtitle " + subtitle);
}

window.addEventListener('DOMContentLoaded', () => showGeneratedSubtitle());

const form = document.querySelector('form');

const addBusyTimeInterval = async (e) => {

    console.log("submit pressed");

    e.preventDefault(); // prevents submit from refreshing the window

    // put the new busy date into db.json
    const newBusyTimeInterval = {
        "day": day,
        "month": month,
        "year": year,
        "start-hour": startHour,
        "customer-name": form.name.value,
        "email": form.email.value
    }

    await fetch('http://localhost:3000/busy-time-intervals', {
        method: 'POST',
        body: JSON.stringify(newBusyTimeInterval),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    window.location.replace("index.html");     // go back to main page
}

form.addEventListener('submit', addBusyTimeInterval);