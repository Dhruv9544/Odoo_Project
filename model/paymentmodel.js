const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const paymentSchema = new mongoose.Schema(
    {
        book: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Book",
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        price: {
            type: String,
        },
        status: {
            type: String,
            default: "pending",
        },
        quantity: {
            type: Number,
        },
        session_id: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
