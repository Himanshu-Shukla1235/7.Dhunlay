// controllers/paymentController.js
const express = require("express");
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
    const redirectUrl = `https://dhunlay.com/dashboard/${userId}`;

    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(amount * 100) // PhonePe expects amount in paise
      .redirectUrl(redirectUrl)
      .build();

    const response = await client.pay(request);
    console.log("response of pay ", response);

    // In a real application, you would save the order details to your database here
    // await saveOrderToDatabase(merchantOrderId, amount, userId, 'PENDING');
    const NewSubsDoc = await SubsDoc.create({
      userId,
      name,
      orderId: merchantOrderId,
    });
    res.json({
      success: true,
      checkoutUrl: response.redirectUrl,
      orderId: merchantOrderId,
      userId: userId,
      planName: name,
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
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const response = await phonePeClient.getClient().getOrderStatus(orderId);

    // TODO: Update your DB order status with response.state

    res.json({
      success: true,
      status: response.state,
      data: response,
    });
  } catch (error) {
    console.error("Payment status check error:", error);
    res
      .status(500)
      .json({ error: "Status check failed", details: error.message });
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
      .json({ error: "Callback processing failed", details: error.message });
  }
};

module.exports = {
  initiatePayment,

  checkPaymentStatus,
  handleCallback,
};
