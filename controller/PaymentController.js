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
