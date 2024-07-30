"use strict";
const ValidationWebResponse = require("../app/http/responses/validationWeb.res");
const ValidationApiResponse = require("../app/http/responses/validationApi.res");

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
