
// all the imports here
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/appError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";


// validation request function to check any zod object
const auth = (receivedRole: string) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        // access token
        const token = req.headers.authorization;

        // if not send the token
        if(!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You have no access to this route.');
        }

        // verify access token
        jwt.verify(token, config.accessTokenSecret as string, function(error, decoded) {
            if (error) {
                throw new AppError(StatusCodes.UNAUTHORIZED, 'You have no access to this route.');
            }

            const role = (decoded as JwtPayload).userRole;

            if (receivedRole && receivedRole !== role) {
                throw new AppError(StatusCodes.UNAUTHORIZED, 'You have no access to this route.');
            }

            // set user to the request
            req.user = decoded as JwtPayload;
            // call the next function
            next();
        })

    })
}

// export validate request function
export default auth;