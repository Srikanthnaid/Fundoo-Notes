import { redisClient } from '../config/redis';
import HttpStatus from 'http-status-codes';

export const getAllNotesRedisCache = async (req, res, next) => {
    const allNotesStringified = await redisClient.get('getAllData');
    const allNotes = JSON.parse(allNotesStringified);
    if (allNotes!==null) {
        return res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: allNotes,
            message: 'All notes fetched successfully from redis cache'
        });
    }else{
    next();
    }
};
