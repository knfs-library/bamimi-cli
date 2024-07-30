"use strict";
const path = require("path");

module.exports = function handle(app) {
    app.set("view engine", "ejs");
    app.set("views", [
        path.join(__dirname, "../../../interfaces/web"),
    ]);
};
