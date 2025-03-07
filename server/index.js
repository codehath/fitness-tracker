require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const authRoutes = require('./routes/old/authRoutes');
const workoutLogRoutes = require('./routes/workoutLogRoutes');
// const userRoutes = require('./routes/old/userRoutes');
const workoutPlanRoutes = require('./routes/workoutPlanRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
// const webhookRoutes = require('./routes/webhookRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// app.use("/api/webhooks", authRoutes);
// app.use('/api/webhooks', webhookRoutes);
app.use('/api/', workoutLogRoutes);
app.use('/api/', userRoutes);
app.use('/api/', workoutPlanRoutes);
app.use('/api/', exerciseRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Example route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the Express backend!' });
});

// Log all registered routes
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    // Routes registered directly on the app
    console.log(
      `${Object.keys(middleware.route.methods)} ${middleware.route.path}`
    );
  } else if (middleware.name === 'router') {
    // Router middleware
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        const path = handler.route.path;
        const methods = Object.keys(handler.route.methods);
        console.log(`${methods} /api${path}`);
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the Express API for Vercel serverless deployment
module.exports = app;
