"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// a call back function for request handler
const catchAsync = (cbfn) => {
    return (req, res, next) => {
        Promise.resolve(cbfn(req, res, next)).catch((error) => next(error));
    };
};
// export the catchAsync function
exports.default = catchAsync;
