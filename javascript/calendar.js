// Current date
const currentDate = new Date();
console.log(currentDate);


// Working hours
const startWorkingDay = 9;
const endWorkingDay = 17;


// Array for months name
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


// Array for weekday names
const weekdayNames = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];


// Adds blank days so that saturday and sunday are on the 6th and 7th collum
function addBlankDays(numberOfDays) {
    const daysElement = document.getElementById("days");
    for (let dayIndex = 1; dayIndex <= numberOfDays; dayIndex++) {
        let liElement = document.createElement("li");
        liElement.setAttribute("class", "blank-day");
        daysElement.appendChild(liElement);
    }
}


// Returns the days in a specified month and year
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}


// Hour format from number (ex: 10 -> 10:00)
function toHourFormat(number) {
    let sol = "";
    if (number < 10) {
        sol += 0;
    }
    sol += number + ":00";
    return sol
}



// Function that marks a day as active and removes the label from any other days
function changeActiveDay(index) {
    console.log("Changing active day to " + index);
    const activeDay = document.getElementsByClassName("active");

    // Clear the active label for all days
    for (let dayIndex = 0; dayIndex < activeDay.length; dayIndex++) {
        activeDay[dayIndex].setAttribute("class", "day");
    }

    // Add active label
    const newActiveDay = document.getElementById(("day-" + index));
    newActiveDay.className += " active";
}




// Shows hour intervals for a specific day
function showDayAvailability(year, month, index) {
    console.log("Show day availability")

    // Change the active day
    changeActiveDay(index);

    // Clear day planner
    const dayPlanner = document.getElementById("day-planner");
    dayPlanner.innerHTML = "";

    // Show the requested date as a title for the day planner
    let title = document.createElement("li");
    title.setAttribute("class", "day-planner-title")
    title.innerText = "Make an appointment for " + index + "/" + (month + 1) + "/" + year;
    dayPlanner.appendChild(title);

    // Add hour intervalls
    for (let currentStartHour = startWorkingDay; currentStartHour < endWorkingDay; currentStartHour++) {

        // Parent element for hour interval
        let liElement = document.createElement("li");
        liElement.setAttribute("class", "day-planner-hour");

        // Child element start hour
        let divStartHour = document.createElement("div");
        divStartHour.setAttribute("class", "day-planner-start-hour");
        divStartHour.innerText = toHourFormat(currentStartHour);
        liElement.appendChild(divStartHour);

        // Child element "-"
        let divBreak = document.createElement("div");
        divBreak.setAttribute("class", "day-planner-break");
        divBreak.innerText = "-";
        liElement.appendChild(divBreak);

        // Child element end hour
        let divEndHour = document.createElement("div");
        divEndHour.setAttribute("class", "day-planner-end-hour");
        divEndHour.innerText = toHourFormat(currentStartHour + 1);
        liElement.appendChild(divEndHour);

        // Check if the hour interval is free


        console.log("checking if the hour interval is free");

        fetch('http://localhost:3000/busy-time-intervals', {
            method: 'get'
        }).then(function (response) {
            response.json().then((data) => {

                const busyTimeIntervals = data;

                // Check if the time interval can be found in busyTimeIntervals
                console.log("checking", year.toString(), monthNames[month], index.toString(), currentStartHour.toString());

                let busyFlag = false;
                busyTimeIntervals.forEach(busyTimeInterval => {
                    
                    let busyYear = busyTimeInterval.year;
                    let busyMonth = busyTimeInterval.month;
                    let busyDay = busyTimeInterval.day;
                    let busyStartHour = busyTimeInterval["start-hour"];
                    console.log("checking with", busyYear, busyMonth, busyDay, busyStartHour);
                    
                    if (year.toString() == busyYear && monthNames[month] == busyMonth && index.toString() == busyDay && currentStartHour.toString() == busyStartHour) {
                        console.log("Found a busy time interval at " + busyStartHour);
                        liElement.setAttribute("class", "day-planner-hour-busy");
                        busyFlag = true;
                    }
                });

                if (busyFlag == false) {

                    // Add click event listner to parent element
                    liElement.onclick = function () {
                        // Open the new page
                        openAppointmentChooseProcedure(index, month, year, currentStartHour);
                    };
                }

            })
        })


        // Add the parent element to the list
        dayPlanner.appendChild(liElement);
    }

}

// Opens appointment-choose-proceddure.html 
function openAppointmentChooseProcedure(index, month, year, currentStartHour) {
    const subtitleElement = document.getElementById("subtitle-choose-procedure");
    console.log("Book a procedure for " + index + " " + monthNames[month] + " " + year + " at " + toHourFormat(currentStartHour));
    localStorage.setItem("generatedSubtitle", "Finalize your appointment for " + index + " " + monthNames[month] + " " + year + " at " + toHourFormat(currentStartHour))
    localStorage.setItem("day", index);
    localStorage.setItem("month", monthNames[month]);
    localStorage.setItem("year", year);
    localStorage.setItem("start-hour", currentStartHour);
    window.open("confirm-appointment.html", "_self");
}




// Function to hide the day planner
function hideDayPlanner() {
    const dayPlanner = document.getElementById("day-planner");
    dayPlanner.style.maxHeight = null;
}


// Function to show the day planner
function showDayPlanner(dayPlanner) {
    if (!dayPlanner.style.maxHeight) {
        // Show the day planner
        dayPlanner.style.maxHeight = dayPlanner.scrollHeight + "px";
    }
    scrollToDayPlanner();
}


// Scroll to see day planner
function scrollToDayPlanner() {
    console.log("Smooth scrolling to day planner");
    const dayPlanner = document.getElementById("day-planner");
    dayPlanner.scrollIntoView({
        behavior: 'smooth',
        block: "start"
    });
}


// Adds the days of the month
function addDays(year, month) {

    const numberOfDays = getDaysInMonth(year, month);
    const daysElement = document.getElementById("days");

    for (let dayIndex = 1; dayIndex <= numberOfDays; dayIndex++) {

        // The date that is being added to the calendar
        const dateToAdd = new Date(year, month, dayIndex);
        const currenntWeekday = dateToAdd.getDay();

        // Create an element for the day that is being added
        let liElement = document.createElement("li");
        liElement.setAttribute("id", "day-" + dayIndex.toString());
        liElement.innerText = dayIndex.toString();
        daysElement.appendChild(liElement);

        // If the day is Saturday or Sunday mark it as weekend (unclickable)
        if (currenntWeekday == 0 || currenntWeekday == 6) {
            liElement.setAttribute("class", "day-weekend");
            continue;
        }

        // The rest of the days are clickable
        liElement.setAttribute("class", "day");

        // Function for when a valid day is clicked
        liElement.onclick = function () {
            console.log("clicked " + dayIndex + " " + monthNames[month] + " " + year);
            const dayPlanner = document.getElementById("day-planner");

            // Hide the day planner if the same day is selected twice
            if (liElement.classList.contains("active")) {
                if (dayPlanner.style.maxHeight) {
                    hideDayPlanner();
                    return;
                }
            }

            // Create the elements inside the hourly day planner
            showDayAvailability(year, month, dayIndex);
            showDayPlanner(dayPlanner);

        };
    }
}


// Adds the days of the month (when the shown month is the current month)
function addDaysCurrentMonth(year, month, day) {

    const numberOfDays = getDaysInMonth(year, month);
    const daysElement = document.getElementById("days");

    for (let dayIndex = 1; dayIndex <= numberOfDays; dayIndex++) {

        // The date that is being added to the calendar
        const dateToAdd = new Date(year, month, dayIndex);
        const currenntWeekday = dateToAdd.getDay();

        // Create an element for the day that is being added
        let liElement = document.createElement("li");
        liElement.setAttribute("id", "day-" + dayIndex.toString());
        liElement.innerText = dayIndex.toString();
        daysElement.appendChild(liElement);

        // If the day is Saturday or Sunday mark it as weekend (unclickable)
        if (currenntWeekday == 0 || currenntWeekday == 6) {
            liElement.setAttribute("class", "day-weekend");
            continue;
        }

        // If the day comes before the current day it is unclickable
        if (dayIndex < day) {
            liElement.setAttribute("class", "day-before-current-date");
            continue;
        }

        // The rest of the days are clickable

        // Function for when a valid day is clicked
        liElement.onclick = function () {
            console.log("clicked " + dayIndex + " " + monthNames[month] + " " + year);
            const dayPlanner = document.getElementById("day-planner");

            // Hide the day planner if the same day is selected twice
            if (liElement.classList.contains("active")) {
                if (dayPlanner.style.maxHeight) {
                    hideDayPlanner();
                    return;
                }
            }

            // Create the elements inside the day planner
            showDayAvailability(year, month, dayIndex);
            showDayPlanner(dayPlanner);

        };

        // If the added day coincides with the current day mark it as active
        if (dayIndex == day) {
            liElement.setAttribute("class", "day active");
            continue;
        }

        // The remaining days are normal
        liElement.setAttribute("class", "day");

    }
}



// Update the shown date
function updateCalendar(date) {

    // Clear the calendar
    const daysElement = document.getElementById("days");
    daysElement.innerHTML = "";

    // Hide the day planner
    hideDayPlanner();

    // Year
    const year = date.getFullYear();
    console.log("Year is " + year);

    // Month name
    const month = date.getMonth();
    const monthName = monthNames[month];
    console.log("Month is " + monthName);

    // Day
    const day = date.getDate();
    console.log("Current day is " + day);

    // Show the current month and year
    const monthElement = document.getElementById("month");
    monthElement.innerHTML = monthName + " " + year;
    console.log(monthElement);

    // First day of the month
    const firstDay = new Date(year, month, 1);

    // Weekday of the first day of the month
    const weekdayFirstDay = firstDay.getDay();
    console.log("First day of the month is " + weekdayNames[weekdayFirstDay]);

    // Insert blank days so that the weekdays align
    addBlankDays((weekdayFirstDay + 6) % 7);
    console.log("Added " + (weekdayFirstDay + 6) % 7 + " blank days");

    // Add the days of the month in the calendar
    if (shownDate.getMonth() == currentDate.getMonth() && shownDate.getFullYear() == currentDate.getFullYear()) {
        addDaysCurrentMonth(year, month, day);
    } else {
        addDays(year, month);
    }
}


// Show the next month
function showNextMonth() {
    shownDate.setMonth(shownDate.getMonth() + 1)
    updateCalendar(shownDate);
}


// Show the previous month
function showPreviousMonth() {

    // If the user tries to acces a month before the current date do nothing
    if (shownDate.getMonth() == currentDate.getMonth() && shownDate.getFullYear() == currentDate.getFullYear()) {
        console.log("Couldn't show the previous month!");
        return;
    }

    // Show the previous month
    shownDate.setMonth(shownDate.getMonth() - 1)
    updateCalendar(shownDate);
}


// Variable that holds the currently shown date
var shownDate = new Date(currentDate);

// Generate the calendar after loading the page
window.addEventListener('DOMContentLoaded', updateCalendar(shownDate));