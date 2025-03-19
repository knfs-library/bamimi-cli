"use strict";

/**
 * 
 * @param {File} file 
 * @returns 
 */
const filename = (file) => {
	return file.originalname;
};

/**
 * 
 * @param {Request} req 
 * @param {File} file 
 * @param {function} cb 
 */
const setFilename = (req, file, cb) => {
	const fileN = filename(file);
	file.uploadName = fileN;
	if (cb) {
		cb(null, fileN);
	}
};

/**
 * 
 * @param {Request} req 
 * @param {File} file 
 * @param {function} cb 
 */
const fileFilter = (req, file, cb) => {
	cb(null, true);
}


module.exports = {
	setFilename,
	fileFilter
}
