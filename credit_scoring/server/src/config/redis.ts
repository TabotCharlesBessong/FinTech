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

// Event listeners
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});
redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('ready', () => console.log('Redis Client Ready'));
redisClient.on('reconnecting', () => console.log('Redis Client Reconnecting'));
redisClient.on('end', () => console.log('Redis Client Connection Ended'));

// Export a function to connect (call this in server.ts before starting the server)
export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
      console.log('Redis connection established.');
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      // Optionally retry or exit process
    }
  }
};

export default redisClient;