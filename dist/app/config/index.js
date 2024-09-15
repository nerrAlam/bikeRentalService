"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// all the imports here
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// requireing path from env file
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
// all the export from here
exports.default = {
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
