
// all the imports here
import { Router } from "express";
import validateRequest from "../../middleware/validataionRequest";
import { bikeValidationSchema } from "./bike.validation";
import { bikecontroller } from "./bike.controller";
import auth from "../../middleware/auth";

// creating the bike router object
const router: Router = Router();

// for creating the bike into data base
router.post('/', validateRequest(bikeValidationSchema.createBikeValidationSchema), auth('admin'), bikecontroller.createBike);

// get all the bikes from data base
router.get('/', bikecontroller.getAllBikes);

// update the bike with id
router.put('/:bikeId', validateRequest(bikeValidationSchema.updateBikeValidationSchema), auth('admin'), bikecontroller.updatSingleBike);


// soft delete a bike by id from data base
router.delete('/:bikeId', auth('admin'), bikecontroller.deleteBike);

// export all the bike routes as bike routes
export const bikeRoutes = router;