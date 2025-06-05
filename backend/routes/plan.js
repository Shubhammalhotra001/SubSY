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

// router.post('/seed', async (req, res) => {
//   const plans = [
//     { name: 'Basic', price: 0, features: ['Access to basic features'], duration: 30 },
//     { name: 'Pro', price: 9.99, features: ['Basic features', 'Priority support', 'Advanced tools'], duration: 90 },
//     { name: 'Enterprise', price: 29.99, features: ['All features', 'Dedicated manager'], duration: 180 }
//   ];

//   try {
//     await Plan.insertMany(plans);
//     res.json({ message: 'Plans seeded successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to seed plans' });
//   }
// });


module.exports = router;
