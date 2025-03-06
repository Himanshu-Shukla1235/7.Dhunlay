const Razorpay = require('razorpay');
const crypto = require('crypto');
const Pay = require('../models/Pay'); // Import the payment model

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a Razorpay Order
exports.createOrder = async (req, res) => {
  try {
    const { userId, recipientId, amount, currency, type, method, description } = req.body;

    if (!userId || !amount || !currency || !type || !method) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create order in Razorpay
    const options = {
      amount: amount * 100, // Amount in paise (INR requires conversion)
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1 // Auto-capture payment
    };

    const order = await razorpay.orders.create(options);

    // Save order details in database
    const newPayment = new Pay({
      userId,
      recipientId,
      type,
      amount,
      currency,
      status: 'pending',
      method,
      transactionId: order.id, // Store Razorpay order ID
      description
    });

    await newPayment.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Verify Payment Signature (from Razorpay Webhook)
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Generate HMAC signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Update payment status in database
    const payment = await Pay.findOneAndUpdate(
      { transactionId: razorpay_order_id },
      { status: 'completed' },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: 'Payment record not found' });
    }

    res.json({ success: true, message: 'Payment verified', payment });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
