"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// not found function if there is not route
const notFound = (req, res, next) => {
    return res.status(404).json({
        success: false,
        messaga: 'Not Found',
        error: '',
    });
};
// export not found function
exports.default = notFound;
