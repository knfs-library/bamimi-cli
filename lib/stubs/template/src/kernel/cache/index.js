"use strict";
const cache = require("@iConfigs/cache")

const getStorage = (storage = null) => {
    switch (storage) {
        case 'redis':
            return require("./redis")();
        default:
            return getStorage(cache.use)
    }
}

module.exports = {
    getStorage
}