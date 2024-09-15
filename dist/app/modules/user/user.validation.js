"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
// all the imports here
const zod_1 = require("zod");
// create user validation schema
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim(),
        email: zod_1.z.string().email('Invalid email address').trim(),
        password: zod_1.z.string(),
        phone: zod_1.z.string().trim().regex(/^\+?[0-9]\d{1,14}$/, "Please enter a valid phone number."),
        address: zod_1.z.string().trim(),
        role: zod_1.z.enum(['admin', 'user']),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
// update user validation schema
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().optional(),
        email: zod_1.z.string().email('Invalid email address').trim().optional(),
        password: zod_1.z.string().trim().optional(),
        phone: zod_1.z.string().trim().optional(),
        address: zod_1.z.string().trim().optional(),
        role: zod_1.z.enum(['admin', 'user']).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
// user login validation schema
const userLoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'email is required.' }).email('Invalid email address.').trim(),
        password: zod_1.z.string({ required_error: 'password is required.' }).trim(),
    })
});
// export user validation schema
exports.userValidationSchema = {
    createUserValidationSchema,
    updateUserValidationSchema,
    userLoginValidationSchema,
};
