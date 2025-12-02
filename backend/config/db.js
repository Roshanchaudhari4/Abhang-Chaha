const mongoose = require('mongoose');
const connectDB = async (mongoUri) => {
  try {
    if (!mongoUri) throw new Error('MONGO_URI not provided');
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

module.exports = connectDB;
