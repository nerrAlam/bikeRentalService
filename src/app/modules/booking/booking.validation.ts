import { z } from 'zod';

// Define the Zod validation schema
const startBookingValidationSchema = z.object({
    body: z.object({
        userId: z.string().optional(),
        bikeId: z.string({ required_error: 'bikeId is required.' }).trim(),
        startTime: z.string({ required_error: 'start time is required.' }),
        returnTime: z.string().optional(),
        totalCost: z.number().min(0).optional(),
        isReturned: z.boolean().default(false).optional(),
    })
});

const returnBookingValidationSchema = z.object({
    body: z.object({
        userId: z.string().optional(),
        bikeId: z.string({ required_error: 'bikeId is required.' }).trim().optional(),
        startTime: z.string({ required_error: 'start time is required.' }).optional(),
        returnTime: z.string().optional(),
        totalCost: z.number().min(0).optional(),
        isReturned: z.boolean().default(true).optional(),
    })
});

export const bookingValidationSchema = {
    startBookingValidationSchema,
    returnBookingValidationSchema
};
