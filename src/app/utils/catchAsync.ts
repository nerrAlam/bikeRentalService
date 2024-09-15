
// all the imports here
import { Request, Response, NextFunction, RequestHandler } from "express";

// a call back function for request handler
const catchAsync = (cbfn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(cbfn(req, res, next)).catch((error) => next(error));
    };
};

// export the catchAsync function
export default catchAsync;