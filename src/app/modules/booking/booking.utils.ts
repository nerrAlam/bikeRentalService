
// all the imports here
import { TGetHour, TGetMiliSeconds } from "./booking.interface";


// change time to miliseconds
const timeToMiliSeconds: TGetMiliSeconds = (timeString) => {
    const date = new Date(timeString);
    const milliseconds = date.getTime();
  
    return milliseconds;
  }
  
  
// calculate the hour
const getHour: TGetHour = (miliseconds) => {
    const seconds = miliseconds / 1000;
    const minutes = seconds / 60;
    const hour = minutes / 60;

    return hour;
}


// get the total hour of booking
const getTotalTime =(startTime: number, endTime: number) => {
    return endTime - startTime;
}

// calculate the total cost
const calculateTotalCost = (totalTime: number, perHourCost: number) => {
    return totalTime * perHourCost;    
}