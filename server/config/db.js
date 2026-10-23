import mongoose from 'mongoose';

/**
 * MongoDB connection state tracker
 */
let isConnected = false;
let connectionError = null;

/**
 * Establishes connection to MongoDB if URI is configured.
 * Resilient: The server continues running even if MongoDB is offline or unconfigured.
 */
export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn('⚠️  MONGODB_URI is not defined in environment variables. Database features will remain dormant.');
    isConnected = false;
    connectionError = 'MONGODB_URI environment variable is not defined';
    return;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });

    isConnected = true;
    connectionError = null;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    connectionError = error.message;
    console.warn(`⚠️  MongoDB Connection Warning: ${error.message}`);
    console.log('ℹ️  Server will remain active with health endpoint accessible.');
  }

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.warn('⚠️  MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    isConnected = true;
    connectionError = null;
    console.log('✅ MongoDB reconnected');
  });
};

/**
 * Returns the current database connection status
 */
export const getDbStatus = () => {
  const readyStateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const state = readyStateMap[mongoose.connection.readyState] || 'disconnected';

  return {
    status: state,
    isConnected,
    message: isConnected
      ? 'MongoDB database connected and operational'
      : connectionError
      ? `Database offline: ${connectionError}`
      : 'Database not configured yet (MONGODB_URI missing in .env)',
  };
};

export default connectDB;
