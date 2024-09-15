
// all the imports here
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import AppError from "../../error/appError";
import { TBooking } from "./booking.interface"
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model";
import { Bike } from "../bike/bike.model";
import { Booking } from "./booking.model";
import { TUser } from "../user/user.interface";
import { TBike } from "../bike/bike.interface";

// from data base rent a bike
const rentABikeFormDb = async (bookingPayload: TBooking, userPayload: string) => {
    let email;
    let rental = {} as TBooking;

    jwt.verify(userPayload, config.accessTokenSecret as string, function (error, decoded) {
        if (error) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You have no access to this route.');
        }

        const { userEmail } = decoded as JwtPayload;
        email = userEmail;
    });

    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(StatusCodes.FORBIDDEN, 'Not Found.');
    }

    if (user?.isDeleted === true) {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted.');
    }

    const { bikeId, startTime } = bookingPayload;
    const bike = await Bike.findById(bikeId);

    if (!bike) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Not Find.');
    }

    if (bike.isDeleted === true) {
        throw new AppError(StatusCodes.FORBIDDEN, 'bike is allready deleted.')
    }


    if (bike.isAvailable === false) {
        throw new AppError(StatusCodes.FORBIDDEN, 'bike is not available.');
    }

    await Bike.findByIdAndUpdate(bikeId, { isAvailable: false }, { new: true });

    rental.bikeId = bikeId;
    rental.isReturned = false;
    rental.startTime = startTime;
    rental.totalCost = 0;
    rental.userId = user._id;
    rental.returnTime = 'null';


    const booking = await Booking.create(rental);
    return booking;

}


// return the bike to the store
const returBikeToTheStore = async (bikeId: string, userPayload: string) => {
    // let returnedData = {} as TBooking;
    const rentedBike = await Booking.findOne({ bikeId });
    // console.log(rentedBike);

    const { userId, startTime } = rentedBike as TBooking;


    const bike = await Bike.findByIdAndUpdate(bikeId, { isAvailable: true }, { new: true });



    const { pricePerHour } = bike as TBike;


    const now = new Date();
    const currentTimeIso = now.toISOString();
    const currentTime = now.getTime();

    const startTimeOfRental = Date.parse(startTime);

    const totalTimeOfBike = (currentTime - startTimeOfRental) / 3600000;


    const totalCostOfBikeRental = totalTimeOfBike * pricePerHour;

    const returnedData = await Booking.findOneAndUpdate({ bikeId }, { returnTime: currentTimeIso, totalCost: totalCostOfBikeRental, isReturned: true }, { new: true });
    return returnedData;
}


// get all the rentals from data base
const getAllTheRentalsFromDb = async (payload: string) => {
    let email;

    jwt.verify(payload, config.accessTokenSecret as string, function (error, decoded) {
        if (error) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You have no access to this route.');
        }

        const { userEmail } = decoded as JwtPayload;
        email = userEmail;
    });

    const user = await User.findOne({ email });

    const { email: userEmail} = user as TUser ;

    const rentals = await Booking.find({ userEmail });
    return rentals;
}


export const bookingService = {
    rentABikeFormDb,
    returBikeToTheStore,
    getAllTheRentalsFromDb,
}