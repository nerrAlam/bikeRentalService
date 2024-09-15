"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidationSchema = void 0;
const zod_1 = require("zod");
// Define the Zod validation schema
const startBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        bikeId: zod_1.z.string({ required_error: 'bikeId is required.' }).trim(),
        startTime: zod_1.z.string({ required_error: 'start time is required.' }),
        returnTime: zod_1.z.string().optional(),
        totalCost: zod_1.z.number().min(0).optional(),
        isReturned: zod_1.z.boolean().default(false).optional(),
    })
});
const returnBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        bikeId: zod_1.z.string({ required_error: 'bikeId is required.' }).trim().optional(),
        startTime: zod_1.z.string({ required_error: 'start time is required.' }).optional(),
        returnTime: zod_1.z.string().optional(),
        totalCost: zod_1.z.number().min(0).optional(),
        isReturned: zod_1.z.boolean().default(true).optional(),
    })
});
exports.bookingValidationSchema = {
    startBookingValidationSchema,
    returnBookingValidationSchema
};
