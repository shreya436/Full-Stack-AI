const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const candidatesRouter = require('./routes/candidates');
const matchRouter = require('./routes/match');

app.use('/api/candidates', candidatesRouter);
app.use('/api/match', matchRouter);

// Default route for backend health check
app.get('/', (req, res) => {
  res.send('AI Shortlister Backend is running!');
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Spin up an in-memory MongoDB instance to completely bypass any connection issues
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
    console.log('Connected to In-Memory MongoDB successfully!');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();
