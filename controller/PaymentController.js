const mongoose = require("mongoose");
const paymentModel = require("../model/paymentmodel");
const catchAsync = require("../utils/catchAsync");
// const furnitureModel = require("../models/furnitureModel");

module.exports.createPayment = catchAsync(async (req, res, next) => {
  const newPayment = new paymentModel(req.body);
  const payment = await newPayment.save();
  res.json({ data: payment, msg: "payment added", rcode: 200 });
});

module.exports.getPayments = catchAsync(async (req, res, next) => {
  const payments = await paymentModel.find().populate("User").populate("Book");
  res.json({ data: payments, msg: "payment fetched", rcode: 200 });
});

module.exports.PaymentsById = catchAsync(async (req, res, next) => {
  try {
    const paymentId = req.params.paymentId;

    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({ msg: "Invalid payment ID", rcode: 400 });
    }

    const objectId = new mongoose.Types.ObjectId(paymentId);
    console.log(objectId);

    const payment = await paymentModel.find({ user: objectId });

    if (!payment) {
      return res.status(404).json({ msg: "Payment not found", rcode: 404 });
    }

    res.status(200).json({ data: payment, msg: "Payment fetched", rcode: 200 });
  } catch (err) {
    next(err);
  }
});
