
// all the imports here
import { z } from "zod";


// create user validation schema
const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string().trim(),
        email: z.string().email('Invalid email address').trim(),
        password: z.string(),
        phone: z.string().trim().regex(/^\+?[0-9]\d{1,14}$/, "Please enter a valid phone number."),
        address: z.string().trim(),
        role: z.enum(['admin', 'user']),
        isDeleted: z.boolean().optional().default(false),
    }),
});


// update user validation schema
const updateUserValidationSchema = z.object({
    body: z.object({
        name: z.string().trim().optional(),
        email: z.string().email('Invalid email address').trim().optional(),
        password: z.string().trim().optional(),
        phone: z.string().trim().optional(),
        address: z.string().trim().optional(),
        role: z.enum(['admin', 'user']).optional(),
        isDeleted: z.boolean().optional(),
    }),
});


// user login validation schema
const userLoginValidationSchema = z.object({
    body: z.object({
        email: z.string({required_error: 'email is required.'}).email('Invalid email address.').trim(),
        password: z.string({required_error: 'password is required.'}).trim(),
    })
})


// export user validation schema
export const userValidationSchema = {
    createUserValidationSchema,
    updateUserValidationSchema,
    userLoginValidationSchema,
};