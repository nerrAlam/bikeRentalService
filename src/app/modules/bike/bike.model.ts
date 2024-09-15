
// all the imports here
import { model, Schema } from "mongoose";
import { TBike } from "./bike.interface";


// bike schema
const bikeSchema = new Schema<TBike>({
    name: {
        type: String,
        required: [true, 'Bike name is required.'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Bike description is required.'],
        trim: true,
    },
    pricePerHour: {
        type: Number,
        required: [true, 'Per hour bike rent price is required.'],
        min: [0, 'Price per hour must be a positive number.'],
    },
    cc: {
        type: Number,
        required: [true, 'Bike cc is required.'],
        min: [50, 'Bike cc must be 50 or more than that.'],
    },
    year: {
        type: Number,
    },
    model: {
        type: String,
        required: [true, 'Bike model is required.'],
        trim: true,
    },
    brand: {
        type: String,
        required: [true, 'Bike brand name is required.'],
        trim: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
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


// create bike model and export it
export const Bike = model('Bike', bikeSchema);