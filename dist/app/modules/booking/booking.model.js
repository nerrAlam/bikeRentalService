"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
// all the imports here
const mongoose_1 = require("mongoose");
// booking schema
const bookingSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    bikeId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
            validator: function (value) {
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
}, {
    timestamps: true,
});
// create booking model and export it
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
