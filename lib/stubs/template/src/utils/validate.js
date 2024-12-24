"use strict";
const ValidationWebResponse = require("@iApp/http/responses/validationWeb.res");
const ValidationApiResponse = require("@iApp/http/responses/validationApi.res");

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
