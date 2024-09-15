"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
// all the imports here
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validataionRequest_1 = __importDefault(require("../../middleware/validataionRequest"));
const user_validation_1 = require("./user.validation");
// creating the router object
const router = (0, express_1.Router)();
// for signup an user
router.post('/signup', (0, validataionRequest_1.default)(user_validation_1.userValidationSchema.createUserValidationSchema), user_controller_1.userController.signupUser);
// for login an user
router.post('/login', (0, validataionRequest_1.default)(user_validation_1.userValidationSchema.userLoginValidationSchema), user_controller_1.userController.userLogin);
// export the router object as auth router
exports.authRoutes = router;
