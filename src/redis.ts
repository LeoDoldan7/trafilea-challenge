import { createClient } from 'redis';

const redisClient = createClient({
    url: process.env.REDIS_HOST
});

redisClient.on('error', err => console.error('Redis Client Error:', err));

export function getRedisClient() {
    return redisClient;
}

async function startRedis() {
    await redisClient.connect()
}

startRedis()