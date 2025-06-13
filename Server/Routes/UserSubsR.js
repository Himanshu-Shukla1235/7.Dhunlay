const express = require("express");
const router = express.Router();
const { getSubscriptionByUserAndName } = require("../Controllers/subPlans/userSubcriptionCon");

// GET /api/subscriptions/:userId/:name
router.get("/getUserSub", getSubscriptionByUserAndName);

module.exports = router;
