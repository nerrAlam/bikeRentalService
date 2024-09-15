
// all the imports here
import { NextFunction, Request, Response } from "express";

// not found function if there is not route
const notFound = (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
        success: false,
        messaga: 'Not Found',
        error: '',
    });
};

// export not found function
export default notFound;