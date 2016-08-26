'use strict';


module.exports = {
    version: process.env.NODE_ENV,
    privateKey: process.env.PRIVATE_KEY,
    hits: {
        perMinute: process.env.HITS_PER_MINUTE,
        perDay: process.env.HITS_PER_DAY,
        timeOut: process.env.HITS_TIMEOUT
    }
};
