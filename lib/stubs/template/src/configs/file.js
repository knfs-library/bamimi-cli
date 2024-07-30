"use strict";
require("dotenv").config();
const path = require("path");

module.exports = {
    use: process.env.FILE_OPTION ?? "local",
    storages: {
        local: {
            url: $_url("public/storages"),
            folder: path.join(__dirname, "./../public/storages")
        },
        s3: {
            url: process.env.AWS_BUCKET_URL ?? "",
            bucket: process.env.AWS_BUCKET_NAME,
        }
    }
};
