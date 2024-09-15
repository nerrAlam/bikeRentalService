import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { Role } from "./user.interface";

// all the imports here
const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: [true, 'User name is required.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'User email is required.'],
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.'],
    },
    password: {
        type: String,
        required: [true, 'User password is required.'],
        // select: 0, fix it latter
    },
    address: {
        type: String,
        required: [true, 'User address is required.'],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, 'User phone number is required.'],
        trim: true,
        match: [/^\+?[0-9]\d{1,14}$/, 'Please enter a valid phone number.'],
        unique: true,
    },
    role: {
        type: String,
        required: [true, 'User role is required.'],
        enum: Object.values(Role),
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true,
    }
);


// create user model and export
export const User = model('User', userSchema);