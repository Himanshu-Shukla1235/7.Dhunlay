const Subscription = require("../../Models/subscriptionsModles/subscriptionM");

// GET subscriptions by userId and name
const getSubscriptionByUserAndName = async (req, res) => {
  console.log("backend : getSubscriptionByUserAndName");
  try {
    const { userId, name } = req.query;

    console.log("backend", userId);
    const subscriptions = await Subscription.find({ userId: userId });

    // if (subscriptions.length==0) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "No subscriptions found." });
    // }

    res
      .status(200)
      .json({ success: true, data: subscriptions, userId: userId });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getSubscriptionByUserAndName,
};
