"use strict";
require("dotenv").config();
const path = require("path");

module.exports = {
    use: process.env.FILE_OPTION ?? "local",
    storages: {
        local: {
            url: global.$_url("public/storages"),
            folder: path.join(__dirname, "./../public/storages/files")
        },
        tmp: {
            url: '',
            folder: path.join(__dirname, './../storage/tmp')
        },
        s3: {
            url: process.env.AWS_BUCKET_URL ?? "",
            bucket: process.env.AWS_BUCKET_NAME,
        }
    }
};
