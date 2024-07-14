const { timeStamp } = require("console");
const mongoose = require("mongoose");

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
      type: String,
    },
    endDate: {
      type: String,
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
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
