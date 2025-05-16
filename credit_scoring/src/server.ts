import app from './app';
import sequelize from './config/database';
import redisClient from './config/redis';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Connect to PostgreSQL
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected and models synchronized.');

    // Connect to Redis
    await redisClient.connect();
    console.log('Redis connected.');

    // Start Express server
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM signal received: closing server');
      server.close(async () => {
        await sequelize.close();
        await redisClient.quit();
        process.exit(0);
      });
    });
    process.on('SIGINT', async () => {
      console.log('SIGINT signal received: closing server');
      server.close(async () => {
        await sequelize.close();
        await redisClient.quit();
        process.exit(0);
      });
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer(); 