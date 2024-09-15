
// all the imports here
import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validataionRequest";
import { userValidationSchema } from "./user.validation";
import auth from "../../middleware/auth";

// creating the router object
const router = Router();

// for signup an user
router.post('/signup', validateRequest(userValidationSchema.createUserValidationSchema), userController.signupUser);

// for login an user
router.post('/login', validateRequest(userValidationSchema.userLoginValidationSchema), userController.userLogin);

// export the router object as auth router
export const authRoutes = router;