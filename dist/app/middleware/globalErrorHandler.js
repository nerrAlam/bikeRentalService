"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// global error handler function
const globalErrorHandler = (error, req, res, next) => {
    const statusCode = 500;
    let message = error.message || 'Something went worng';
    // send error response
    return res.status(statusCode).json({
        success: false,
        message,
        error,
    });
};
// export the global error handler function
exports.default = globalErrorHandler;
