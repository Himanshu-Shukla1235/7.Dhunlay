// routes/payment.js
const express = require("express");
const paymentController = require("../Controllers/PaymentControllers/transactionCon");
const router = express.Router();
const authenticateUser = require("../Middlewares/authenticationM");

router.post("/initiate",  paymentController.initiatePayment);
router.post(
  "/create-sdk-order",
  authenticateUser,
  paymentController.createSdkOrder
);
router.get(
  "/status/:orderId",
  authenticateUser,
  paymentController.checkPaymentStatus
);
router.post("/callback", authenticateUser, paymentController.handleCallback);
// router.post("/payCallBack", paymentCallback);

module.exports = router;
