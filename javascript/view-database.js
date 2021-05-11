function fetchReservations() {
    fetch('http://localhost:3000/busy-time-intervals', {
        method: 'get'
    }).then(function (response) {
        response.json().then((data) => {

            console.log("fetching reservations");

            const busyIntervalsDiv = document.getElementById("busy-time-intervals-div");
            busyIntervalsDiv.innerHTML = "";

            data.forEach(reservation => {

                let nameElement = document.createElement("div");
                pElement.setAttribute("class", "name");
                pElement.innerText = reservation["customer-name"];

                let emailElement = document.createElement("div");
                pElement.setAttribute("class", "email");
                pElement.innerText = reservation["email"];

                let dateElement = document.createElement(div);
                
                    " with email: " + reservation["email"] +
                    " for " + reservation["day"] + " " + reservation["month"] + " " + reservation["year"] +
                    " at " + reservation["start-hour"];

                console.log(pElement);
                busyIntervalsDiv.appendChild(pElement);
            });

        })
    })
}

window.addEventListener('DOMContentLoaded', () => fetchReservations());