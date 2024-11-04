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
        tmp: function () {
            return multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, config.storages.tmp.folder);
                },
                filename: options.filename
            })
        },
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
        tmp: function () {
            const configDir = config.storages.tmp.folder
            if (fs.existsSync(path.join(configDir, pathFile))) {
                fs.unlinkSync(path.join(configDir, pathFile))
            }
        },
        local: async function () {
            const configDir = config.storages.local.folder;
            if(fs.existsSync(path.join(configDir, pathFile))) {
                fs.unlinkSync(path.join(configDir, pathFile));
            }
        },
    };
    return storageType ? await storages[storageType]() : await storages[config.use]();
};

const copy = async ({ sourcePath, destPath, storageType }) => {
    const storages = {
        local: async function () {
            const configDir = config.storages.local.folder
            try {
                await fs.promises.copyFile(path.join(configDir, sourcePath), path.join(configDir, destPath));
                console.log("File copied successfully");
            } catch (err) {
                console.error("Error during file copy:", err);
                throw new Error("Cannot copy file");
            }
        },
    }

    return storageType ? await storages[storageType]() : await storages[config.use]()
};

const getFile = async ({ path, storageType }) => {
    const storages = {
        local: async function () {
            return global.$_file.getPublicPath(path)
        },
    }

    return storageType ? await storages[storageType]() : await storages[config.use]()
}

module.exports = {
    upload,
    remove,
    copy,
    getFile
};