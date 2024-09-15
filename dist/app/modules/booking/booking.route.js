"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
// all the imports here
const express_1 = require("express");
const validataionRequest_1 = __importDefault(require("../../middleware/validataionRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
// creating a router object
const router = (0, express_1.Router)();
// make a rental
router.post('/', (0, validataionRequest_1.default)(booking_validation_1.bookingValidationSchema.startBookingValidationSchema), booking_controller_1.bookingController.rentABike);
// get all the rentals
router.get('/', booking_controller_1.bookingController.getAllRentals);
// return bike
router.put('/:bikeId/return', (0, validataionRequest_1.default)(booking_validation_1.bookingValidationSchema.returnBookingValidationSchema), (0, auth_1.default)('admin'), booking_controller_1.bookingController.returnBike);
// export booking router 
exports.bookingRoutes = router;
