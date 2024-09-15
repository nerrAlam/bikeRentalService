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
exports.bikeServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../error/appError"));
const bike_model_1 = require("./bike.model");
// create a bike into database
const createBikeIntoDd = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield bike_model_1.Bike.create(payload);
    return bike;
});
// get all the bikes from the data base
const getAllBikesFromDd = () => __awaiter(void 0, void 0, void 0, function* () {
    const bikes = yield bike_model_1.Bike.find();
    if (!bikes) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'No Data Found.');
    }
    return bikes;
});
// updata a single bike into data base
const updateSingleBikeIntoDd = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield bike_model_1.Bike.findByIdAndUpdate({ _id: id }, payload, { new: true });
    if (!bike) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'No Data Found.');
    }
    return bike;
});
// delete a bike from data base
const deleteBikeFromDd = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield bike_model_1.Bike.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
    if (!bike) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'No Data Found.');
    }
    return bike;
});
// all the export here
exports.bikeServices = {
    createBikeIntoDd,
    getAllBikesFromDd,
    updateSingleBikeIntoDd,
    deleteBikeFromDd,
};
