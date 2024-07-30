"use strict";

const config = require("../configs/file");

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const filename = (file, prefix = false) => {
    if (prefix) {
        return prefix + Date.now().toString() + "-" + file.originalname;
    }

    return Date.now().toString() + "-" + file.originalname;
};

const setFilename = (req, file, cb) => {
    const fileN = filename(file, "bamimi");
    file.aliasName = fileN;
    cb(null, fileN);
};

const upload = ({ storageType, options = {
    filename: setFilename
} }) => {
    const storages = {
        local: function () {
            return multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, config.storages.local.folder);
                },
                filename: options.filename
            });
        },
    };

    const storage = storageType ? storages[storageType]() : storages[config.use]();

    return multer({ storage: storage, ...options });
};

const remove = async({ pathFile, storageType }) => {
    const storages = {
        local: async function () {
            const configDir = config.storages.local.folder;
            if(fs.existsSync(path.join(configDir, pathFile))) {
                fs.unlinkSync(path.join(configDir, pathFile));
            }
        },
    };
    return storageType ? await storages[storageType]() : await storages[config.use]();
};

module.exports = {
    upload: upload,
    remove: remove
};