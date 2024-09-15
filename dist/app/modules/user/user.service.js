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
exports.userService = void 0;
// all the imporst here
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../error/appError"));
const user_model_1 = require("./user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
// store the use into the database
const signUpUserIntoDd = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone } = payload;
    const userByEmail = yield user_model_1.User.findOne({ email });
    if (userByEmail) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, 'This User is allready exsist.');
    }
    const userByPhone = yield user_model_1.User.findOne({ phone });
    if (userByPhone) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, 'This User is allready exsist.');
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
// user log in into data base
const userLoginIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const userByEmail = yield user_model_1.User.findOne({ email });
    if (!userByEmail) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Not Found');
    }
    if ((userByEmail === null || userByEmail === void 0 ? void 0 : userByEmail.isDeleted) === true) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is deleted.');
    }
    if (userByEmail.password !== password) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'The password is not matched.');
    }
    const jwtPayload = {
        userEmail: userByEmail.email,
        userRole: userByEmail.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.accessTokenSecret, {
        expiresIn: config_1.default.accessTokenExpires,
    });
    return {
        accessToken,
    };
});
// get user from data base
const getUserFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let email;
    jsonwebtoken_1.default.verify(payload, config_1.default.accessTokenSecret, function (error, decoded) {
        if (error) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You have no access to this route.');
        }
        const { userEmail } = decoded;
        email = userEmail;
    });
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Not Found.');
    }
    if ((user === null || user === void 0 ? void 0 : user.isDeleted) === true) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is deleted.');
    }
    return user;
});
// update the user into data base
const updateUserIntoDb = (userPayload, tokenPayload) => __awaiter(void 0, void 0, void 0, function* () {
    let email;
    jsonwebtoken_1.default.verify(tokenPayload, config_1.default.accessTokenSecret, function (error, decoded) {
        if (error) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You have no access to this route.');
        }
        const { userEmail } = decoded;
        email = userEmail;
    });
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Not Found.');
    }
    if ((user === null || user === void 0 ? void 0 : user.isDeleted) === true) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is deleted.');
    }
    const newUserData = yield user_model_1.User.findOneAndUpdate({ email }, userPayload, { new: true });
    return newUserData;
});
// export all the user services
exports.userService = {
    signUpUserIntoDd,
    userLoginIntoDb,
    getUserFromDb,
    updateUserIntoDb,
};
