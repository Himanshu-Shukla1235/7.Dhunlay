const Razorpay = require('razorpay');
const crypto = require('crypto');
const Pay = require('../models/Pay'); // Import the payment model

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * @desc    Create a Razorpay order for payment processing
 * @route   POST /api/payments/create-order
 * @access  Public
 * @param   {Object} req - Express request object containing payment details
 * @param   {Object} res - Express response object used to send the result
 * @returns {void}
 * @example
 * Request body:
 * {
 *   "userId": "65d1a8e1234567890abcd123",
 *   "recipientId": "65d1a8e1234567890abcd124",
 *   "amount": 1000,
 *   "currency": "INR",
 *   "type": "subscription",
 *   "method": "upi",
 *   "description": "Premium subscription payment"
 * }
 *
 * Successful Response:
 * {
 *   "success": true,
 *   "order": { ...razorpay order details }
 * }
 *
 * Error Response:
 * {
 *   "success": false,
 *   "message": "Error message describing the issue"
 * }
 */
exports.createOrder = async (req, res) => {
  try {
    const { userId, recipientId, amount, currency, type, method, description } = req.body;

    // Validate required fields
    if (!userId || !amount || !currency || !type || !method) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Create an order in Razorpay
    const options = {
      amount: amount * 100, // Convert to paise (for INR)
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1 // Auto-capture payment
    };

    const order = await razorpay.orders.create(options);

    // Save payment details in database
    const newPayment = new Pay({
      userId,
      recipientId,
      type,
      amount,
      currency,
      status: 'pending',
      method,
      transactionId: order.id, // Razorpay order ID
      description
    });

    await newPayment.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

/**
 * @desc    Verify Razorpay payment signature and update payment status
 * @route   POST /api/payments/verify-payment
 * @access  Public
 * @param   {Object} req - Express request object containing Razorpay signature
 * @param   {Object} res - Express response object used to send the result
 * @returns {void}
 * @example
 * Request body:
 * {
 *   "razorpay_order_id": "order_9A33XWu170gUtm",
 *   "razorpay_payment_id": "pay_29QQoUBi66xm2f",
 *   "razorpay_signature": "2a3f..."
 * }
 *
 * Successful Response:
 * {
 *   "success": true,
 *   "message": "Payment verified",
 *   "payment": { ...updated payment details }
 * }
 *
 * Error Response:
 * {
 *   "success": false,
 *   "message": "Error message describing the issue"
 * }
 */
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment details' });
    }

    // Generate HMAC SHA256 signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Update payment status in database
    const payment = await Pay.findOneAndUpdate(
      { transactionId: razorpay_order_id },
      { status: 'completed' },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }

    res.json({ success: true, message: 'Payment verified', payment });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
