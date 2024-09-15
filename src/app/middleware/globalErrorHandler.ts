
// all the imports here
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

// global error handler function
const globalErrorHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode: number = 500;
    let message: string = error.message || 'Something went worng';

    // send error response
    return res.status(statusCode).json({
        success: false,
        message,
        error,
    });
};

// export the global error handler function
export default globalErrorHandler;