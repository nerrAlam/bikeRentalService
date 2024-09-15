
// all the imports here
import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validataionRequest";
import { userValidationSchema } from "./user.validation";

// creating the router object
const router = Router();

// get the user
router.get('/me', userController.getUser);

// for update the user information
router.put('/me', validateRequest(userValidationSchema.updateUserValidationSchema), userController.updateUser);

// export the router object as auth router
export const userRoutes = router;