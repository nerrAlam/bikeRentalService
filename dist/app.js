"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// all the imports here
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
// call the express app
const app = (0, express_1.default)();
// call the express json and cors parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// the test route
app.get('/', (req, res) => {
    res.send('Hello, in the World of Traveles. Welcome to bike rental service...');
});
// use all the routes
app.use('/api', routes_1.default);
// global error handler
app.use(globalErrorHandler_1.default);
// not found api function
app.use(notFound_1.default);
// the app exports here
exports.default = app;
