
// all the imports here
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

// make a rental
const rentABike = catchAsync(async (req: Request, res: Response) => {
    const bookingData = await req.body;
    const userData = await req.headers.authorization as string;



    const booking = await bookingService.rentABikeFormDb(bookingData, userData);

    sendResponse(res,  {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Rental created successfully',
        data: booking,
    });
});


// rent the bike
const returnBike = catchAsync(async(req: Request, res: Response) => {
    const bikeId = await req.params.bikeId as string;
    const userData =await req.headers.authorization as string;

    const returnedBike = await bookingService.returBikeToTheStore(bikeId, userData);

    sendResponse(res,  {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Bike returned successfully.',
        data: returnedBike,
    });
});


// get all the rental for user
const getAllRentals = catchAsync(async (req: Request, res: Response) => {
    const userData = await req.headers.authorization as string;

    const rentals = await bookingService.getAllTheRentalsFromDb(userData);

    sendResponse(res,  {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Rentals retrieved successfully',
        data: rentals,
    });

})


export const bookingController = {
    rentABike,
    returnBike,
    getAllRentals,
}