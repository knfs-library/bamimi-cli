"use strict";
const xss = require("@iUtils/xss")
const securityConfig = require("@iConfigs/security");
const helmet = require('helmet');

const sanitizeRequest = (req, res, next) => {
	if (!req.ignoreXss) {
		if (req.body) xss(req.body, securityConfig.xssConfig);
		if (req.query) xss(req.query, securityConfig.xssConfig);
		if (req.params) xss(req.params, securityConfig.xssConfig);
	}

	next();
};

module.exports = () => {
	return [
		sanitizeRequest,
		helmet(securityConfig.helmetConfig)
	]
}