const mongoose = require('mongoose');

/**
 * Connects to MongoDB Atlas using the MONGODB_URI environment variable.
 */
const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr) {
      console.error('[MongoDB Error] MONGODB_URI environment variable is missing.');
      return;
    }

    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Error] Connection failed: ${error.message}`);
  }
};

module.exports = connectDB;
