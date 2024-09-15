
// all the imports here
import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";



// sign up user controller
const signupUser = catchAsync(async (req: Request, res: Response) => {
    const userData = await req.body;
    const result = await userService.signUpUserIntoDd(userData);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User registered successfully',
        data: result,
    });
})



// login user controller
const userLogin = catchAsync(async (req: Request, res: Response) => {
    const loginData = req.body;
    const user = await userService.userLoginIntoDb(loginData);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User logged in successfully',
        data: user,
    })
});



// get user
const getUser = catchAsync(async(req: Request, res: Response) => {
    const token = await req.headers.authorization as string;
    const user = await userService.getUserFromDb(token);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User profile retrieved successfully.',
        data: user,
    });
});


// update the user
const updateUser = catchAsync(async(req: Request, res: Response) => {
    const updateData = await req.body;
    const token = await req.headers.authorization as string;

    const user = await userService.updateUserIntoDb(updateData, token);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Profile updated successfully.',
        data: user,
    })
});


// all the user controllers export from here
export const userController = {
    signupUser,
    userLogin,
    getUser,
    updateUser,
};