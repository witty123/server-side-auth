import { Redis } from 'redis';
import { config } from './config';

export const redisClient = Redis.createClient ({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  socket_keepalive: true,
  password: config.REDIS_PASSWORD
});

client.on ('error', (error) => {
  console.log(error);
})

client.on('connect', function() {
  console.log('connected');
});

