const express = require('express');
const router = express.Router();
const Subscription = require('../models/subscription');
const Plan = require('../models/plan');
const auth = require('../middleware/auth');

// POST /api/subscriptions
router.post('/', auth, async (req, res) => {
  const userId = req.user.userId;
  const { planId } = req.body;

  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.duration);

    const subscription = new Subscription({
      userId,
      planId,
      startDate,
      endDate,
      status: 'ACTIVE'
    });

    await subscription.save();
    res.status(201).json({ message: 'Subscription created', subscription });

  } catch (err) {
    res.status(500).json({ message: 'Error creating subscription', error: err.message });
  }
});

// GET /api/subscriptions/me
router.get('/me', auth, async (req, res) => {
  const userId = req.user.userId;

  try {
    const subscription = await Subscription.findOne({ userId, status: 'ACTIVE' })
      .populate('planId');

    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription found' });
    }

    res.json({ subscription });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving subscription', error: err.message });
  }
});


module.exports = router;
