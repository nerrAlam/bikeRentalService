
// all the imports here
import { TResponse } from "./sendResponse.interface";
import { Response } from "express";


// send request handler
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data?.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
    });
};

// export the sendRequest handler
export default sendResponse;