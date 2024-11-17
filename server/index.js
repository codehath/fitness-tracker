require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const authRoutes = require('./routes/authRoutes');
const workoutLogRoutes = require('./routes/workoutLogRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
// app.use('/api/auth', authRoutes);
app.use('/api/', workoutLogRoutes)
app.use('/api/', userRoutes)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
  })

// Example route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the Express backend!' })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
