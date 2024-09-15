
// all the imports here
import { Router } from "express";
import { TRoute } from "./routes.interface";
import { authRoutes } from "../modules/user/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { bikeRoutes } from "../modules/bike/bike.route";
import { bookingRoutes } from "../modules/booking/booking.route";

// creating the main router object
const router = Router();


// all the routes
const allRoutes: TRoute[] = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/bikes',
        route: bikeRoutes,
    },
    {
        path: '/rentals',
        route: bookingRoutes,
    }
];


// loop through all the routes
allRoutes.forEach((route) => router.use(route.path, route.route));

// export the router object
export default router;