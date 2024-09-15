
// all the imports here
import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

// booking schema
const bookingSchema = new Schema<TBooking>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    bikeId: {
        type: Schema.Types.ObjectId,
        ref: 'Bike',
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    returnTime: {
        type: String,
        validate: {
            validator: function (value: string) {
                if (this.returnTime === 'null') {
                    return true;
                }
                return new Date(value) > new Date(this.startTime);
            },
            message: 'Return time must be after the start time.',
        },
    },
    totalCost: {
        type: Number,
        min: [0, 'The cost must be in positive number.'],
    },
    isReturned: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
    });

// create booking model and export it
export const Booking = model('Booking', bookingSchema);
