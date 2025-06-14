// controllers/paymentController.js
const express = require("express");
const crypto = require("crypto");
const axios = require("axios");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const SubsDoc = require("../../Models/subscriptionsModles/subscriptionM");
const {
  StandardCheckoutPayRequest,
  StandardCheckoutClient,
  CreateSdkOrderRequest,
  Env,
} = require("pg-sdk-node");
// const phonePeClient = require("../../utils/phonePeClient");
const clientId = process.env.PHONEPE_CLIENT_ID;
const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
const clientVersion = process.env.PHONEPE_CLIENT_VERSION;
const env = Env.PRODUCTION;

const client = StandardCheckoutClient.getInstance(
  clientId,
  clientSecret,
  clientVersion,
  env
);

//-------------------------------------------------------
const initiatePayment = async (req, res) => {
  console.log("✅ Backend hit:initiate payment triggered");
  try {
    const { amount, userId, name, startDate } = req.body;

    const merchantOrderId = `ORDER_${uuidv4()}`;
    if (amount == 0 && name == "freemium") {
      const NewSubsDoc = await SubsDoc.create({
        userId,
        name,
        orderId: merchantOrderId,
      });
      res.json({
        success: true,
        checkoutUrl: "https://dhunlay.com/dashboard",
        orderId: merchantOrderId,
        userId: userId,
        planName: name,
      });
      return;
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const redirectUrl = `https://dhunlay.com/api/status?orderId=${merchantOrderId}&name=${name}&userId=${userId}`;
    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(amount * 100) // PhonePe expects amount in paise
      .redirectUrl(redirectUrl)
      .build();

    const response = await client.pay(request);
    console.log("response of pay ", response);

    // In a real application, you would save the order details to your database here
    // await saveOrderToDatabase(merchantOrderId, amount, userId, 'PENDING');

    res.json({
      success: true,
      checkoutUrl: response.redirectUrl,
      orderId: merchantOrderId,
      userId: userId,
      planName: name,
      status: response.state,
    });
  } catch (error) {
    console.error("Payment initiation error:", error);
    res
      .status(500)
      .json({ error: "Payment initiation failed", details: error.message });
  }
};

//----------------------------------------------------------------------

//-----------------------------------------------------------------
const checkPaymentStatus = async (req, res) => {
  console.log("checkpaymentStatus triggered ");
  try {
    const { orderId, name, userId } = req.query;
    console.log(orderId);

    const response = await client.getOrderStatus(orderId);
    const status = response.state;
    console.log("PaymentCheck Status", response);

    if (status == "COMPLETED") {
      const NewSubsDoc = await SubsDoc.create({
        userId,
        name,
        orderId: orderId,
        status: status,
      });
      res.redirect("https://dhunlay.com/dashboard");
    } else {
      res.json("https://dhunlay.com/ourPlans");
    }
  } catch (err) {
    console.error("❌ Error checking payment status:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error while checking status",
    });
  }
};

const handleCallback = async (req, res) => {
  try {
    const authorizationHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    const responseBody = JSON.stringify(req.body);

    const isValid = await phonePeClient
      .getClient()
      .validateCallback(
        process.env.PHONEPE_MERCHANT_ID,
        process.env.PHONEPE_CLIENT_SECRET,
        authorizationHeader,
        responseBody
      );

    if (!isValid) {
      console.error("Invalid callback received");
      return res.status(401).json({ error: "Invalid callback" });
    }

    const callbackData = req.body;
    const orderId = callbackData.payload.merchantOrderId;
    const status = callbackData.payload.state;

    // TODO: Update your DB order status based on callback

    // Handle callback types accordingly
    switch (callbackData.type) {
      case "PAYMENT_SUCCESS":
        // Handle success logic
        break;
      case "PAYMENT_ERROR":
        // Handle failure logic
        break;
      default:
        console.log("Unknown callback type:", callbackData.type);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Callback handling error:", error);
    res
      .status(500)
      .json({ error: "Callback processing failed", details: error });
  }
};

module.exports = {
  initiatePayment,

  checkPaymentStatus,
  handleCallback,
};
