
// all the imports here
import { Router } from "express";
import validateRequest from "../../middleware/validataionRequest";
import { bookingValidationSchema } from "./booking.validation";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

// creating a router object
const router: Router = Router();

// make a rental
router.post('/', validateRequest(bookingValidationSchema.startBookingValidationSchema), bookingController.rentABike);

// get all the rentals
router.get('/', bookingController.getAllRentals);

// return bike
router.put('/:bikeId/return', validateRequest(bookingValidationSchema.returnBookingValidationSchema) ,auth('admin'), bookingController.returnBike);

// export booking router 
export const bookingRoutes = router;