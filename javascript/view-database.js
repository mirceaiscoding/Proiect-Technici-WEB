const monthNumber = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
};

// Fetches and sorts reservations
function fetchReservations() {
    fetch('http://localhost:3000/busy-time-intervals', {
        method: 'get'
    }).then(function (response) {
        response.json().then((data) => {

            console.log("fetching reservations");

            const busyIntervalsDiv = document.getElementById("busy-time-intervals-div");
            busyIntervalsDiv.innerHTML = "";

            // Sorting by date
            data.sort(function (a, b) {

                if (a["year"] != b["year"]) {
                    return a["year"] - b["year"];
                }

                if (a["month"] != b["month"]) {
                    return monthNumber[a["month"] - monthNumber[b["month"]]]
                }

                if (a["day"] != b["day"]) {
                    return a["day"] - b["day"];
                }

                return a["start-hour"] - b["start-hour"]
            })

            data.forEach(reservation => {

                let nameElement = document.createElement("div");
                nameElement.setAttribute("class", "name");
                nameElement.innerText = reservation["customer-name"];

                let emailElement = document.createElement("div");
                emailElement.setAttribute("class", "email");
                emailElement.innerText = reservation["email"];

                let dateElement = document.createElement("div");
                dateElement.setAttribute("class", "date");
                dateElement.innerText = reservation["day"] + " " + reservation["month"] + " " + reservation["year"] + " at " + reservation["start-hour"];

                let trashElement = document.createElement("img");
                trashElement.src = "icon/delete_black_24dp.svg";
                trashElement.setAttribute("class", "trash");
                trashElement.onclick = function () {
                    fetch('http://localhost:3000/busy-time-intervals/' + reservation["id"], {
                        method: 'delete',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        window.location.reload();
                    })
                };

                busyIntervalsDiv.appendChild(nameElement);
                busyIntervalsDiv.appendChild(emailElement);
                busyIntervalsDiv.appendChild(dateElement);
                busyIntervalsDiv.appendChild(trashElement);
            });

        })
    })
}

window.addEventListener('DOMContentLoaded', () => fetchReservations());

// Removes past reservations from the database (only works one at a time?)
function removePastReservations() {


    fetch('http://localhost:3000/busy-time-intervals', {
        method: 'get'
    }).then(function (response) {
        response.json().then((data) => {
            
            let responses = 0;
            let expectedResponses = 0;

            data.forEach(reservation => {

                let year = Number(reservation["year"]);
                let month = Number(monthNumber[reservation["month"]]) - 1;
                let day = Number(reservation["day"]);
                
                let date = new Date(year, month, day);
                let currentDate = new Date();
                console.log(date);

                if (date < currentDate){
                    expectedResponses++;
                    fetch('http://localhost:3000/busy-time-intervals/' + reservation["id"], {
                        method: 'delete',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function(response){
                        window.location.reload();
                    })
                }
            });

        })
    
    })

}