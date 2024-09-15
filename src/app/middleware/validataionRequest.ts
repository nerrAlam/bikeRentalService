
// all the imports here
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";


// validation request function to check any zod object
const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        // validate the object with zod
        await schema.parseAsync({
            body: req.body,
        })

        // call the next function
        next();
    })
}

// export validate request function
export default validateRequest;