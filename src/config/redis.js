import { createClient } from "redis";
export const redisClient = createClient();
const redis = async () => {
    try {
        await redisClient.connect();
        console.log(`Client connected`);
    } catch (error) {
        console.log(error);
    }
};
export default redis;
