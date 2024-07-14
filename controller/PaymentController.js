const mongoose = require("mongoose");
const paymentModel = require("../model/paymentmodel");
const catchAsync = require("../utils/catchAsync");
// const furnitureModel = require("../models/furnitureModel");
const moment = require("moment");
module.exports.createPayment = catchAsync(async (req, res, next) => {
    const newPayment = new paymentModel(req.body);
    const payment = await newPayment.save();
    res.json({ data: payment, msg: "payment added", rcode: 200 });
});

module.exports.getPayments = catchAsync(async (req, res, next) => {
    const payments = await paymentModel
        .find()
        .populate("User")
        .populate("Book");
    res.json({ data: payments, msg: "payment fetched", rcode: 200 });
});

module.exports.PaymentsById = catchAsync(async (req, res, next) => {
    try {
        const paymentId = req.params.paymentId;

        if (!mongoose.Types.ObjectId.isValid(paymentId)) {
            return res
                .status(400)
                .json({ msg: "Invalid payment ID", rcode: 400 });
        }

        const objectId = new mongoose.Types.ObjectId(paymentId);

        // Debugging: Check the generated objectId
        console.log("Generated objectId:", objectId);

        // Fetch payments where endDate is less than today
        const paymentsLessThanToday = await paymentModel.find({
            user: objectId,
            endDate: { $lt: new Date() },
        });

        // Debugging: Check the query for payments less than today
        console.log("Payments less than today:", paymentsLessThanToday);

        // Fetch payments where endDate is greater than or equal to today
        const paymentsGreaterThanToday = await paymentModel.find({
            user: objectId,
            endDate: { $gte: new Date() },
        });

        // Debugging: Check the query for payments greater than or equal to today
        console.log(
            "Payments greater than or equal to today:",
            paymentsGreaterThanToday
        );

        // Combine results if needed or send separately as per requirement
        res.status(200).json({
            data: {
                lessThanToday: paymentsLessThanToday,
                greaterThanOrEqualToToday: paymentsGreaterThanToday,
            },
            msg: "Payments fetched",
            rcode: 200,
        });
    } catch (err) {
        next(err);
    }
});
