import { Redis } from 'redis';
import { config } from './config';

export const redisClient = Redis.createClient ({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  socket_keepalive: true,
  password: config.REDIS_PASSWORD
});

redisClient.on ('error', (error) => {
  console.log(error);
})

redisClient.on('connect', function() {
  console.log('connected');
});

