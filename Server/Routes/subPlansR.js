const express = require('express');
const router = express.Router();
const { createPlan, getAllPlans } = require('../Controllers/subPlans/subsPlansCon');

// POST /api/plans - Create a plan
router.post('/createPlan', createPlan);

// GET /api/plans - Get all plans
router.get('getPlans/', getAllPlans);

module.exports = router;
