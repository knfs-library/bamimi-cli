"use strict";
const ValidationWebResponse = require("@iApp/http/requests/validationWeb.req");
const ValidationApiResponse = require("@iApp/http/requests/validationApi.req");

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
