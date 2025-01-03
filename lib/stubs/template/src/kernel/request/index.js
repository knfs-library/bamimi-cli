"use strict";
const ValidationWebResponse = require("./validationWeb");
const ValidationApiResponse = require("./validationApi");

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
