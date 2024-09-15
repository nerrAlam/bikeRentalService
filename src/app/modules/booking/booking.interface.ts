
// all the imports here
import {Types } from "mongoose"

// booking type
export type TBooking = {
    userId?: Types.ObjectId;
    bikeId: Types.ObjectId;
    startTime: string;
    returnTime?: string;
    totalCost?: Number;
    isReturned?: Boolean;
};


// type of function get mili seconds from string of time
export type TGetMiliSeconds = (timeString: string) => number;

// type of function get hour from miliseconds
export type TGetHour = (miliseconds: number) => number;