"use strict";
const config = require('./../configs/file')
const path = require("path")

const getPublicPath = (filePath, storageType = null) => {
    if (storageType === "azureBlob" || config.use === "azureBlob") {
        return filePath
    }

    const storageUrl = storageType
        ? config.storages[storageType]['url']
        : config.storages[config.use]['url']

    return storageUrl + '/' + filePath
}

const getTmpPath = (filePath) => {
    return path.join(config.storages.tmp.folder + '/' + filePath)
}

module.exports = {
    getPublicPath,
    getTmpPath,
}