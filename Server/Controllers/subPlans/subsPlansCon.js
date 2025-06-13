const Plan = require('../../Models/subscriptionsModles/planM');

// @desc   Create a new plan
// @route  POST /api/plans
// @access Admin
const createPlan = async (req, res) => {
    console.log("backend Hit ✅ : create plan hits")
  try {
    const { name, price, duration, features, maxSongs, revenueShare,planType } = req.body;

    if (!name || !price || !features || !maxSongs) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const plan = new Plan({
      name,
      price,
      duration,
      features,
      maxSongs,
      planType
     
    });

    const savedPlan = await plan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({ error: error.message });
  }
};

// (Optional) Get all plans
const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPlan,
  getAllPlans,
};
