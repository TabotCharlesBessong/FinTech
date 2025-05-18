import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  password: process.env.REDIS_PASSWORD || undefined,
  socket: {
    reconnectStrategy: (retries) => {
      // Exponential backoff: 2^retries * 100ms
      const delay = Math.min(2 ** retries * 100, 3000);
      console.log(`Redis reconnecting in ${delay}ms...`);
      return delay;
    },
    connectTimeout: 10000, // 10 seconds
    keepAlive: 5000, // 5 seconds
  },
});

// Error handling
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
  // Attempt to reconnect on error
  if (!redisClient.isOpen) {
    redisClient.connect().catch(console.error);
  }
});

redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('ready', () => console.log('Redis Client Ready'));
redisClient.on('reconnecting', () => console.log('Redis Client Reconnecting'));
redisClient.on('end', () => console.log('Redis Client Connection Ended'));

// Connect to Redis
const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    // Retry connection after 5 seconds
    setTimeout(connectRedis, 5000);
  }
};

// Initial connection
connectRedis();

export default redisClient;