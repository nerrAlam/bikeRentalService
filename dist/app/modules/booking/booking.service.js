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
exports.bookingService = void 0;
// all the imports here
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../config"));
const appError_1 = __importDefault(require("../../error/appError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user/user.model");
const bike_model_1 = require("../bike/bike.model");
const booking_model_1 = require("./booking.model");
// from data base rent a bike
const rentABikeFormDb = (bookingPayload, userPayload) => __awaiter(void 0, void 0, void 0, function* () {
    let email;
    let rental = {};
    jsonwebtoken_1.default.verify(userPayload, config_1.default.accessTokenSecret, function (error, decoded) {
        if (error) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You have no access to this route.');
        }
        const { userEmail } = decoded;
        email = userEmail;
    });
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Not Found.');
    }
    if ((user === null || user === void 0 ? void 0 : user.isDeleted) === true) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is deleted.');
    }
    const { bikeId, startTime } = bookingPayload;
    const bike = yield bike_model_1.Bike.findById(bikeId);
    if (!bike) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Not Find.');
    }
    if (bike.isDeleted === true) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'bike is allready deleted.');
    }
    if (bike.isAvailable === false) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'bike is not available.');
    }
    yield bike_model_1.Bike.findByIdAndUpdate(bikeId, { isAvailable: false }, { new: true });
    rental.bikeId = bikeId;
    rental.isReturned = false;
    rental.startTime = startTime;
    rental.totalCost = 0;
    rental.userId = user._id;
    rental.returnTime = 'null';
    const booking = yield booking_model_1.Booking.create(rental);
    return booking;
});
// return the bike to the store
const returBikeToTheStore = (bikeId, userPayload) => __awaiter(void 0, void 0, void 0, function* () {
    // let returnedData = {} as TBooking;
    const rentedBike = yield booking_model_1.Booking.findOne({ bikeId });
    // console.log(rentedBike);
    const { userId, startTime } = rentedBike;
    const bike = yield bike_model_1.Bike.findByIdAndUpdate(bikeId, { isAvailable: true }, { new: true });
    const { pricePerHour } = bike;
    const now = new Date();
    const currentTimeIso = now.toISOString();
    const currentTime = now.getTime();
    const startTimeOfRental = Date.parse(startTime);
    const totalTimeOfBike = (currentTime - startTimeOfRental) / 3600000;
    const totalCostOfBikeRental = totalTimeOfBike * pricePerHour;
    const returnedData = yield booking_model_1.Booking.findOneAndUpdate({ bikeId }, { returnTime: currentTimeIso, totalCost: totalCostOfBikeRental, isReturned: true }, { new: true });
    return returnedData;
});
// get all the rentals from data base
const getAllTheRentalsFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let email;
    jsonwebtoken_1.default.verify(payload, config_1.default.accessTokenSecret, function (error, decoded) {
        if (error) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You have no access to this route.');
        }
        const { userEmail } = decoded;
        email = userEmail;
    });
    const user = yield user_model_1.User.findOne({ email });
    const { email: userEmail } = user;
    const rentals = yield booking_model_1.Booking.find({ userEmail });
    return rentals;
});
exports.bookingService = {
    rentABikeFormDb,
    returBikeToTheStore,
    getAllTheRentalsFromDb,
};
