const express = require("express");

const paymentController = require("./../controller/PaymentController");
const router = express.Router();

router.post("/addPayment", paymentController.createPayment);
router.get("/getPayments", paymentController.getPayments);

module.exports = router;
