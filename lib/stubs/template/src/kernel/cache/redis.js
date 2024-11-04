const Redis = require("ioredis");
const { caches } = require("../../configs/cache")

let redis = null

module.exports = () => {
    if (!redis) {
        redis = new Redis(caches.redis);
    }
    return {
        singleton: redis,
        new: new Redis(caches.redis)
    }

}