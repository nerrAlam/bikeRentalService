"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeRoutes = void 0;
// all the imports here
const express_1 = require("express");
const validataionRequest_1 = __importDefault(require("../../middleware/validataionRequest"));
const bike_validation_1 = require("./bike.validation");
const bike_controller_1 = require("./bike.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
// creating the bike router object
const router = (0, express_1.Router)();
// for creating the bike into data base
router.post('/', (0, validataionRequest_1.default)(bike_validation_1.bikeValidationSchema.createBikeValidationSchema), (0, auth_1.default)('admin'), bike_controller_1.bikecontroller.createBike);
// get all the bikes from data base
router.get('/', bike_controller_1.bikecontroller.getAllBikes);
// update the bike with id
router.put('/:bikeId', (0, validataionRequest_1.default)(bike_validation_1.bikeValidationSchema.updateBikeValidationSchema), (0, auth_1.default)('admin'), bike_controller_1.bikecontroller.updatSingleBike);
// soft delete a bike by id from data base
router.delete('/:bikeId', (0, auth_1.default)('admin'), bike_controller_1.bikecontroller.deleteBike);
// export all the bike routes as bike routes
exports.bikeRoutes = router;
