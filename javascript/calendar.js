// Current date
const currentDate = new Date();
console.log(currentDate);


// Array for months name
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Array for weekday names
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


// Adds blank days so that saturday and sunday are on the 6th and 7th collum
function addBlankDays(numberOfDays){
    const daysElement = document.getElementById("days");
    for (let index = 1; index <= numberOfDays; index++){
        let li = document.createElement("li");
        li.setAttribute("class", "blank-day");
        daysElement.appendChild(li);
    }
}


// Returns the days in a specified month and year
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}


// Adds the days of the month
function addDays(year, month){
    const numberOfDays = getDaysInMonth(year, month);
    const daysElement = document.getElementById("days");
    for (let index = 1; index <= numberOfDays; index++){

        const currentDate = new Date(year, month, index);
        const currenntWeekday = currentDate.getDay();

        let li = document.createElement("li");
        li.setAttribute("id", "day-" + index.toString());
        li.innerText = index.toString();
        daysElement.appendChild(li);

        if (currenntWeekday == 0 || currenntWeekday == 6){
            li.setAttribute("class", "day-weekend");
        }else{
            li.setAttribute("class", "day");
        }
    }

}


// Update the shown date
function updateCalendar(date){

    // Clear the calendar
    const daysElement = document.getElementById("days");
    daysElement.innerHTML = "";

    // Month name
    const month = date.getMonth();
    const monthName = months[month];
    console.log("Month is " + monthName);

    // Year
    const year = date.getFullYear();
    console.log("Year is " + year);

    // First day of the month
    const firstDay = new Date(year, month, 1);

    // Weekday of the first day of the month
    const weekdayFirstDay = firstDay.getDay();
    console.log("First day of the month is " + days[weekdayFirstDay]);

    // Insert blank days so that the weekdays align
    addBlankDays((weekdayFirstDay + 6) % 7);
    console.log("Added " + (weekdayFirstDay + 6) % 7 + " blank days");

    // Add the days of the month in the calendar
    addDays(year, month);

    // Show the current month and year
    const monthElement = document.getElementById("month");
    monthElement.innerHTML= monthName + " " + year;
    console.log(monthElement);
}


// Show the next month
function showNextMonth(){
    shownDate.setMonth(shownDate.getMonth() + 1)
    updateCalendar(shownDate);
}



// Show the previous month
function showPreviousMonth(){
    if (shownDate.getMonth() == currentDate.getMonth()){
        console.log("Couldn't show the previous month!");
        return;
    }
    shownDate.setMonth(shownDate.getMonth() - 1)
    updateCalendar(shownDate);
}


var shownDate = new Date(currentDate);

updateCalendar(shownDate);


const leftArrow = document.getElementById("arrow-left");
const rightArrow = document.getElementById("arrow-right");

