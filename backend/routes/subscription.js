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
    // Fetch the most recent subscription regardless of status
    let subscription = await Subscription.findOne({ userId })
      .sort({ endDate: -1 })
      .populate('planId');

    if (!subscription) {
      return res.status(404).json({ message: 'No subscription found' });
    }

    // Auto-expire if subscription is active and expired
    const now = new Date();
    if (subscription.status === 'ACTIVE' && subscription.endDate < now) {
      subscription.status = 'EXPIRED';
      await subscription.save();
    }

    res.json({ subscription });

  } catch (err) {
    res.status(500).json({ message: 'Error retrieving subscription', error: err.message });
  }
});

// PUT /api/subscriptions/update
router.put('/update', auth, async (req, res) => {
  const userId = req.user.userId;
  const { planId } = req.body;

  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const subscription = await Subscription.findOne({ userId, status: 'ACTIVE' });
    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription to update' });
    }

    const newStartDate = new Date();
    const newEndDate = new Date();
    newEndDate.setDate(newStartDate.getDate() + plan.duration);

    subscription.planId = planId;
    subscription.startDate = newStartDate;
    subscription.endDate = newEndDate;

    await subscription.save();

    res.json({ message: 'Subscription updated successfully', subscription });

  } catch (err) {
    res.status(500).json({ message: 'Error updating subscription', error: err.message });
  }
});

// PUT /api/subscriptions/cancel
router.put('/cancel', auth, async (req, res) => {
  const userId = req.user.userId;

  try {
    const subscription = await Subscription.findOne({ userId, status: 'ACTIVE' });

    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription to cancel' });
    }

    subscription.status = 'CANCELLED';
    await subscription.save();

    res.json({ message: 'Subscription cancelled successfully', subscription });

  } catch (err) {
    res.status(500).json({ message: 'Error cancelling subscription', error: err.message });
  }
});



module.exports = router;
