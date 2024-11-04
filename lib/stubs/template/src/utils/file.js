"use strict";
const config = require('./../configs/file')
const excelConfig = require("./../configs/excel")
const barcodeConfig = require('./../configs/barcode')
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

const getBarcode = (barcode, storageType = null) => {
    if (storageType === "azureBlob" || config.use === "azureBlob") {
        return barcode
    }

    const storageUrl = storageType
        ? barcodeConfig.storages[storageType]['url']
        : barcodeConfig.storages[barcodeConfig.use]['url']

    return storageUrl + '/' + barcode
}

const getTmpPath = (filePath) => {
    return path.join(config.storages.tmp.folder + '/' + filePath)
}

const getExcel = (excelFile, storageType = null) => {
    const storageUrl = storageType
        ? excelConfig.storages[storageType]['url']
        : excelConfig.storages[excelConfig.use]['url']

    return storageUrl + '/' + excelFile
}

module.exports = {
    getPublicPath,
    getBarcode,
    getTmpPath,
    getExcel
}