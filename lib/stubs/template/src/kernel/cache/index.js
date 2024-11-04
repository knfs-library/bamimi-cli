const cache = require("../../configs/cache")
const redisInit = require("./redis")


const getStorage = (storage = null) => {
    switch (storage) {
        case 'redis':
            return redisInit();
        default:
            return getStorage(cache.use)
    }
}

module.exports = {
    getStorage
}