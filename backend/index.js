const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect MongoDB and RabbitMQ
(async () => {
  try {
    await connectDB();

    // Routes
    app.use('/api/test', require('./routes/test'));
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/plans', require('./routes/plan'));
    app.use('/api/subscriptions', require('./routes/subscription'));

    // Start server
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('❌ Error during startup:', err.message);
    process.exit(1);
  }
})();
