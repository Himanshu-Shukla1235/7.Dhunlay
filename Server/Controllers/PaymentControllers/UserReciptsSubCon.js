const UserSubscriptionReceipt = require("../models/UserSubscriptionReceipt");

// Create a new subscription receipt
exports.createReceipt = async (req, res) => {
  try {
    const {
      userId,
      for: userFor,
      type,
      amount,
      currency,
      status,
      validTill,
    } = req.body;

    const newReceipt = new UserSubscriptionReceipt({
      userId,
      for: userFor,
      type,
      amount,
      currency,
      status,
      validTill,
    });

    const savedReceipt = await newReceipt.save();
    res.status(201).json(savedReceipt);
  } catch (err) {
    res.status(500).json({ error: "Failed to create receipt", details: err.message });
  }
};

// Get all receipts
exports.getAllReceipts = async (req, res) => {
  try {
    const receipts = await UserSubscriptionReceipt.find().populate("userId");
    res.status(200).json(receipts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch receipts", details: err.message });
  }
};

// Get receipts by user ID
exports.getReceiptsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const receipts = await UserSubscriptionReceipt.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(receipts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user receipts", details: err.message });
  }
};

// Update receipt status
exports.updateReceiptStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedReceipt = await UserSubscriptionReceipt.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReceipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    res.status(200).json(updatedReceipt);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status", details: err.message });
  }
};

// Delete a receipt
exports.deleteReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserSubscriptionReceipt.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    res.status(200).json({ message: "Receipt deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete receipt", details: err.message });
  }
};
