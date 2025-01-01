"use strict";
const ValidationWebResponse = require("@iApp/http/requests/validationWeb.res");
const ValidationApiResponse = require("@iApp/http/requests/validationApi.res");

module.exports = {
    validateWeb: validations => {
        validations.push(ValidationWebResponse);
        return validations;
    },
    validateApi: validations => {
        validations.push(ValidationApiResponse);
        return validations;
    }
};
