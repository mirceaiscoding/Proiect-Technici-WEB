// Current date
const currentDate = new Date();
console.log(currentDate);


// Working hours
const startWorkingDay = 9;
const endWorkingDay = 17;


// Array for months name
const monthName = [
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
const weekdayName = [
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
    for (let index = 1; index <= numberOfDays; index++) {
        let li = document.createElement("li");
        li.setAttribute("class", "blank-day");
        daysElement.appendChild(li);
    }
}


// Returns the days in a specified month and year
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}


// Hour format from number
function toHourFormat(number) {
    let sol = "";
    if (number < 10) {
        sol += 0;
    }
    sol += number + ":00";
    return sol
}


function changeActiveDay(index) {
    console.log("Changing active day to " + index);
    const activeDay = document.getElementsByClassName("active");
    if (activeDay.length != 0) {
        activeDay[0].setAttribute("class", "day");
    }
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

    // Add title for day planner
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

        dayPlanner.appendChild(liElement);
    }

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

        const currentDate = new Date(year, month, dayIndex);
        const currenntWeekday = currentDate.getDay();

        let liElement = document.createElement("li");
        liElement.setAttribute("id", "day-" + dayIndex.toString());
        liElement.innerText = dayIndex.toString();
        daysElement.appendChild(liElement);

        if (currenntWeekday == 0 || currenntWeekday == 6) {
            liElement.setAttribute("class", "day-weekend");
        } else {
            liElement.setAttribute("class", "day");
            liElement.onclick = function () {
                console.log("clicked " + dayIndex + " " + monthName[month] + " " + year);
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
        }
    }
}


// Adds the days of the month (when the shown month is the current month)
function addDaysCurrentMonth(year, month, day) {
    const numberOfDays = getDaysInMonth(year, month);
    const daysElement = document.getElementById("days");
    for (let dayIndex = 1; dayIndex <= numberOfDays; dayIndex++) {

        const currentDate = new Date(year, month, dayIndex);
        const currenntWeekday = currentDate.getDay();

        let liElement = document.createElement("li");
        liElement.setAttribute("id", "day-" + dayIndex.toString());
        liElement.innerText = dayIndex.toString();
        daysElement.appendChild(liElement);

        if (currenntWeekday == 0 || currenntWeekday == 6) {
            liElement.setAttribute("class", "day-weekend");
            continue;
        }

        if (dayIndex < day) {
            liElement.setAttribute("class", "day-before-current-date");
            continue;
        }

        // The rest of the days are clickable
        liElement.onclick = function () {
            console.log("clicked " + dayIndex + " " + monthName[month] + " " + year);
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

        if (dayIndex == day) {
            liElement.setAttribute("class", "day active");
            continue;
        }

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
    const monthName = monthName[month];
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
    console.log("First day of the month is " + weekdayName[weekdayFirstDay]);

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
    if (shownDate.getMonth() == currentDate.getMonth() && shownDate.getFullYear() == currentDate.getFullYear()) {
        console.log("Couldn't show the previous month!");
        return;
    }
    shownDate.setMonth(shownDate.getMonth() - 1)
    updateCalendar(shownDate);
}


// Variable that holds the currently shown date
var shownDate = new Date(currentDate);


// Generate the calendar after loading the page
updateCalendar(shownDate);