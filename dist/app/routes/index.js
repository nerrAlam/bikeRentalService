"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// all the imports here
const express_1 = require("express");
const auth_route_1 = require("../modules/user/auth.route");
const user_route_1 = require("../modules/user/user.route");
const bike_route_1 = require("../modules/bike/bike.route");
const booking_route_1 = require("../modules/booking/booking.route");
// creating the main router object
const router = (0, express_1.Router)();
// all the routes
const allRoutes = [
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/bikes',
        route: bike_route_1.bikeRoutes,
    },
    {
        path: '/rentals',
        route: booking_route_1.bookingRoutes,
    }
];
// loop through all the routes
allRoutes.forEach((route) => router.use(route.path, route.route));
// export the router object
exports.default = router;
