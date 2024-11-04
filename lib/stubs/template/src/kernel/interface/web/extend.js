"use strict";
const path = require("path");

const viewGroups = {
    default: path.join(__dirname, "../../../interfaces/web"),
};

const getView = ({ group = "default", view }) => {
    if ((Object.keys(viewGroups)).indexOf(group) < 0) {
        throw new Error("View group not found");
    } else {
        return path.join(viewGroups[group], view + ".ejs");
    }
};

module.exports = {
    getView: getView
};
