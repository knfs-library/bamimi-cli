"use strict";
const config = require('@iConfigs/file')

const getPublicPath = (filePath, storageType = null) => {
    const storageUrl = storageType
        ? config.storages[storageType]['url']
        : config.storages[config.use]['url']

    return storageUrl + '/' + filePath
}

module.exports = {
    getPublicPath
}