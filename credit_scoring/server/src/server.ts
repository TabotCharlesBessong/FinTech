import app from './app';
import sequelize from './config/database';
// import { connectRedis } from './config/redis';
import dotenv from 'dotenv';
// import express from "express"

dotenv.config();

const PORT = process.env.PORT || 3000;
// export const app = express()

async function startServer() {
  try {
    // Connect to PostgreSQL
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected and models synchronized.');

    // Connect to Redis
    // await connectRedis();

    // Start Express server
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.log(`${signal} signal received: closing server`);
      
      // Close server first to stop accepting new connections
      server.close(async () => {
        try {
          // Close database connection
          await sequelize.close();
          console.log('Database connection closed.');

          // Close Redis connection
          // if (redisClient.isOpen) {
          //   await redisClient.quit();
          //   console.log('Redis connection closed.');
          // }

          console.log('Server shutdown complete.');
          process.exit(0);
        } catch (err) {
          console.error('Error during shutdown:', err);
          process.exit(1);
        }
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      gracefulShutdown('UNHANDLED_REJECTION');
    });

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();