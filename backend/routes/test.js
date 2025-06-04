const express = require('express');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Welcome user with ID: ${req.user.userId}`, user: req.user });
});

module.exports = router;
