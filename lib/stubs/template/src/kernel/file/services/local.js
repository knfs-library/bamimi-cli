"use strict";

const { storages, defaultLimits } = require("@iConfigs/file");
const config = storages.local
const multer = require("multer");

const { getPublicPath } = require("@iUtils/file")

const fs = require("fs");
const path = require("path");
const { setFilename, fileFilter } = require("../support")

const storage = {
	info: "local",
	config
}

/**
 * Upload file from client to storage
 * 
 * @param {string} folder 
 * @param {{filename: function, limits: object, fileFilter: function}} options 
 * @returns 
 */
const upload = (options = {
	filename: setFilename,
	limits: defaultLimits,
	fileFilter,
}) => {
	const storageEngine = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, config.folder);
		},
		filename: options.filename
	})

	return multer({ storage: storageEngine, ...options });
}

/**
 * Upload file to Storage
 * @param {File} file
 * @param {string} destFile
 * @returns {Promise<void>}
 */
const save = async (file, destFile) => {
	if (!file) throw new Error("File is required!");

	const filePath = path.resolve(config.folder, destFile);

	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, file.buffer, (err) => {
			if (err) return reject(err);
		});
	});
}

/**
 *  Remove file storage
 * 
 * @param {string} sourceFile 
 */
const remove = async (sourceFile) => {
	if (fs.existsSync(path.join(config.folder, sourceFile))) {
		console.log(`Local "${sourceFile}" deleted.`);
		fs.unlinkSync(path.join(config.folder, sourceFile))
	} else {
		console.warn(`Local "${sourceFile}" not exist.`);
	}
}

/**
 * Copy file 
 * 
 * @param {string} sourceFile 
 * @param {string} destFile 
 */
const copy = async (sourceFile, destFile) => {
	try {
		await fs.promises.copyFile(path.join(config.folder, sourceFile), path.join(config.folder, destFile));
		console.log("File copied successfully");
	} catch (err) {
		console.error("Error during file copy:", err);
		throw new Error("Cannot copy file");
	}
}

/**
 * Get content
 * 
 * @param {string} sourceFile 
 * @returns {Buffer}
 */
const getContent = async (sourceFile) => {
	if (!fs.existsSync(path.join(config.folder, sourceFile))) {
		return null;
	}
	const data = fs.readFileSync(path.join(config.folder, sourceFile), 'utf8')
	return data
}

/**
 * Get Url file
 * 
 * @param {string} sourceFile
 * @param {{expire: number}} options 
 * @returns {string}
 * @throws {Error}
 */
const getUrl = async (sourceFile, options = {
	expire: config.defaultPublicExpire
}) => {

	/**
	 * Delete public file
	 * 
	 * @param {string} pathFile 
	 */
	const deletePublicFile = async (pathFile) => {
		if (fs.existsSync(path.join(config.publicFolder, pathFile))) {
			fs.unlinkSync(path.join(config.publicFolder, pathFile))
		}
	}

	try {
		if (!fs.existsSync(path.join(config.folder, sourceFile))) {
			return null;
		}

		await fs.promises.copyFile(path.join(config.folder, sourceFile), path.join(config.publicFolder, sourceFile));

		setTimeout(async () => {
			await deletePublicFile(sourceFile)
		}, options.expire * 1000)
		
		return getPublicPath(sourceFile, 'local')
	} catch (err) {
		console.error("Error during file copy:", err);
		throw new Error("Cannot copy file");
	}
}

module.exports = {
	storage,
	save,
	upload,
	remove,
	copy,
	getUrl,
	getContent
}