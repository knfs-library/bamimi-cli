"use strict";
const xss = require("xss");

const deepClone = obj => JSON.parse(JSON.stringify(obj));

const sanitize = (input, options = {}, seen = new WeakSet()) => {
	const obj = deepClone(input);

	if (typeof obj !== 'object' || obj === null) return obj;
	if (seen.has(obj)) return obj;

	seen.add(obj);

	for (let key in obj) {
		if (typeof obj[key] === 'string') {
			obj[key] = xss(obj[key], options);
		} else if (typeof obj[key] === 'object' && obj[key] !== null) {
			obj[key] = sanitize(obj[key], options, seen);
		}
	}
	return obj;
};


module.exports = sanitize;
