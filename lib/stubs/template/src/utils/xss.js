"use strict";
const xss = require("xss")

const sanitize = (obj, options = {}) => {
	for (let key in obj) {
		if (typeof obj[key] === 'string') {
			obj[key] = xss(obj[key], options);
		} else if (typeof obj[key] === 'object' && obj[key] !== null) {
			sanitize(obj[key], options);
		}
	}
};

module.exports = sanitize