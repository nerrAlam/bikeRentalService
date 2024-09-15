"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikecontroller = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const bike_service_1 = require("./bike.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
// create a bike
const createBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bikeData = yield req.body;
    const bike = yield bike_service_1.bikeServices.createBikeIntoDd(bikeData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Bike added successfully',
        data: bike,
    });
}));
// get all the bikes
const getAllBikes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bikes = yield bike_service_1.bikeServices.getAllBikesFromDd();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Bikes retrieved successfully',
        data: bikes,
    });
}));
// updata a single bike
const updatSingleBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedInformation = yield req.body;
    const id = req.params.bikeId;
    const bike = yield bike_service_1.bikeServices.updateSingleBikeIntoDd(id, updatedInformation);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Bike updated successfully.',
        data: bike,
    });
}));
// delete a bike
const deleteBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bikeId;
    const bike = yield bike_service_1.bikeServices.deleteBikeFromDd(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Bike deleted successfully.',
        data: bike,
    });
}));
// all the exports here
exports.bikecontroller = {
    createBike,
    getAllBikes,
    updatSingleBike,
    deleteBike,
};
