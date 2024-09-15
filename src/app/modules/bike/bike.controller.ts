import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { bikeServices } from "./bike.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


// create a bike
const createBike = catchAsync(async (req: Request, res: Response) => {
    const bikeData = await req.body;
    const bike = await bikeServices.createBikeIntoDd(bikeData);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Bike added successfully',
        data: bike,
    })
});

// get all the bikes
const getAllBikes = catchAsync(async (req: Request, res: Response) => {
    const bikes = await bikeServices.getAllBikesFromDd();

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Bikes retrieved successfully',
        data: bikes,
    })

})



// updata a single bike
const updatSingleBike = catchAsync(async (req: Request, res: Response) => {
    const updatedInformation = await req.body;
    const id = req.params.bikeId;
    const bike = await bikeServices.updateSingleBikeIntoDd(id, updatedInformation);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Bike updated successfully.',
        data: bike,
    })

})

// delete a bike
const deleteBike = catchAsync( async (req: Request, res: Response) => {
    const id = req.params.bikeId;
    const bike = await bikeServices.deleteBikeFromDd(id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Bike deleted successfully.',
        data: bike,
    }) 
})


// all the exports here
export const bikecontroller = {
    createBike,
    getAllBikes,
    updatSingleBike,
    deleteBike,
};