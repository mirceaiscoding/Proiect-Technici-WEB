// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const {
    v4: uuidv4
} = require('uuid');

const fs = require("fs");

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/busy-time-intervals", (req, res) => {
    const busyTimeIntervals = readJSONFile();
    const newTimeInterval = req.body;
    newTimeInterval.id = uuidv4();
    const newBusyTimeIntervals = [...busyTimeIntervals, newTimeInterval];
    writeJSONFile(newBusyTimeIntervals);
    res.json(newTimeInterval);
});

// Read One
app.get("/busy-time-intervals/:id", (req, res) => {
    const busyTimeIntervals = readJSONFile();
    const id = req.params.id;
    let idFound = false;
    let foundTimeInterval;

    busyTimeIntervals.forEach(timeInterval => {
        if (id === timeInterval.id) {
            idFound = true;
            foundTimeInterval = timeInterval;
        }
    });

    if (idFound) {
        res.json(foundTimeIntervalog);
    } else {
        res.status(404).send(`Time Interval ${id} was not found`);
    }
});

// Read All
app.get("/busy-time-intervals", (req, res) => {
    const busyTimeIntervals = readJSONFile();
    res.json(busyTimeIntervals);
});

// Update
app.put("/busy-time-intervals/:id", (req, res) => {
    const busyTimeIntervals = readJSONFile();
    const id = req.params.id;
    const newTimeInterval = req.body;
    newTimeInterval.id = id;
    idFound = false;

    const newBusyTimeIntervals = busyTimeIntervals.map((timeInterval) => {
        if (timeInterval.id === id) {
            idFound = true;
            return newTimeInterval
        }
        return timeInterval
    })

    writeJSONFile(newBusyTimeIntervals);

    if (idFound) {
        res.json(newTimeInterval);
    } else {
        res.status(404).send(`Time Interval ${id} was not found`);
    }
});

// Delete
app.delete("/busy-time-intervals/:id", (req, res) => {
    const busyTimeIntervals = readJSONFile();
    const id = req.params.id;
    const newBusyTimeIntervals = busyTimeIntervals.filter((timeInterval) => timeInterval.id !== id)

    if (busyTimeIntervals.length !== newBusyTimeIntervals.length) {
        res.status(200).send(`Time Interval ${id} was removed`);
        writeJSONFile(newBusyTimeIntervals);
    } else {
        res.status(404).send(`Time Interval ${id} was not found`);
    }
});

// Functia de citire din fisierul db.json
function readJSONFile() {
    return JSON.parse(fs.readFileSync("db.json"))["busy-time-intervals"];
}

// Functia de scriere in fisierul db.json
function writeJSONFile(content) {
    fs.writeFileSync(
        "db.json",
        JSON.stringify({
            "busy-time-intervals": content
        }),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

// Pornim server-ul
app.listen("3000", () =>
    console.log("Server started at: http://localhost:3000")
);