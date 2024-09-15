"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeValidationSchema = void 0;
// all the imports here
const zod_1 = require("zod");
// create bike schema validation
const createBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim(),
        description: zod_1.z.string().trim(),
        pricePerHour: zod_1.z.number().min(0, 'Price per hour must be a positive number.'),
        cc: zod_1.z.number().min(50, 'Bike cc must be 50 or more than that.'),
        year: zod_1.z.number(),
        model: zod_1.z.string().trim(),
        brand: zod_1.z.string().trim(),
        isAvailable: zod_1.z.boolean().optional().default(true),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
// update bike schema validation
const updateBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().optional(),
        description: zod_1.z.string().trim().optional(),
        pricePerHour: zod_1.z.number().min(0, 'Price per hour must be a positive number.').optional(),
        cc: zod_1.z.number().min(50, 'Bike cc must be 50 or more than that.').optional(),
        year: zod_1.z.number().optional(),
        model: zod_1.z.string().trim().optional(),
        brand: zod_1.z.string().trim().optional(),
        isAvailable: zod_1.z.boolean().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
// export bike validation schema
exports.bikeValidationSchema = {
    createBikeValidationSchema,
    updateBikeValidationSchema,
};
