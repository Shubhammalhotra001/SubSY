const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');

// GET /api/plans - Get all subscription plans
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching plans' });
  }
});

module.exports = router;
