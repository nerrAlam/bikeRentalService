"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// change time to miliseconds
const timeToMiliSeconds = (timeString) => {
    const date = new Date(timeString);
    const milliseconds = date.getTime();
    return milliseconds;
};
// calculate the hour
const getHour = (miliseconds) => {
    const seconds = miliseconds / 1000;
    const minutes = seconds / 60;
    const hour = minutes / 60;
    return hour;
};
// get the total hour of booking
const getTotalTime = (startTime, endTime) => {
    return endTime - startTime;
};
// calculate the total cost
const calculateTotalCost = (totalTime, perHourCost) => {
    return totalTime * perHourCost;
};
