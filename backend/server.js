const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pg', require('./routes/pg'));

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'UniNest API is running',
    defaultLocation: { city: 'Guwahati, Assam', lat: 26.1445, lng: 91.7362 }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  let mongoUri = process.env.MONGO_URI;

  try {
    // Try connecting to the configured URI first
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected (external)');
  } catch (err) {
    console.log('⚠️  External MongoDB unavailable, starting in-memory server...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected (in-memory)');
  }

  app.listen(PORT, () => {
    console.log(`🚀 UniNest API running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('❌ Server failed to start:', err.message);
  process.exit(1);
});
