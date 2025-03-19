"use strict";

const { storages, defaultLimits } = require("@iConfigs/file");
const config = storages.gcStorage

const { Storage } = require('@google-cloud/storage');
const multer = require("multer");
const { setFilename, fileFilter } = require("../support");
const { getPublicPath } = require("@iUtils/file");

const storage = new Storage({ projectId: config.projectId, keyFilename: config.keyFilename });
const bucket = storage.bucket(config.bucket);

/**
 * Upload file using multer
 * @param {Object} options
 * @returns {multer.Multer}
 */
const upload = (options = {
	filename: setFilename,
	limits: defaultLimits, // Default: 10MB
	fileFilter,
}) => {

	const filenameFn = options.filename
	const storageEngine = {
		_storage: {
			_handleFile(req, file, cb) {
				filenameFn(req, file, (err, filename) => {
					if (err) return cb(err);

					const blob = bucket.file(filename);
					const passthroughStream = new stream.PassThrough();
					const blobStream = blob.createWriteStream({
						resumable: false,
						contentType: file.mimetype,
					});

					blobStream.on('finish', async () => {
						await blob.makePublic();
						cb(null, { path: `https://storage.googleapis.com/${config.bucket}/${destFile}`, filename });
					});

					blobStream.on('error', (err) => cb(err));

					file.stream.pipe(passthroughStream).pipe(blobStream);
				});
			},

			_removeFile(req, file, cb) {
				const blob = bucket.file(file.uploadName);
				blob.delete().then(() => cb(null)).catch(cb);
			},
		}
	}
	return multer({ storage: storageEngine, ...options });
};

/**
 * Upload file to Google Cloud Storage
 * @param {File} file
 * @param {string} destFile
 * @returns {Promise<void>}
 */
const save = async (file, destFile) => {
	const blob = bucket.file(destFile);
	const stream = blob.createWriteStream({
		resumable: false,
		contentType: file.mimetype,
	});

	return new Promise((resolve, reject) => {
		stream.on("finish", async () => {
			await blob.makePublic();
		});
		stream.on("error", (err) => reject(err));
		stream.end(file.buffer);
	});
};

/**
 * Delete a file from Google Cloud Storage
 * @param {string} sourceFile
 * @returns {Promise<void>}
 */
const remove = async (sourceFile) => {
	try {
		await bucket.file(sourceFile).delete();
		console.log(`GCS "${sourceFile}" deleted.`);
	} catch (err) {
		console.error(`Remove file ${sourceFile} failed: `, err.message);
		throw err;
	}
};

/**
 * Copy file in Google Cloud Storage
 * @param {string} sourceFile
 * @param {string} destFile
 * @returns {Promise<void>}
 */
const copy = async (sourceFile, destFile) => {
	try {
		await bucket.file(sourceFile).copy(bucket.file(destFile));
		console.log(`GCS "${sourceFile}" copied to "${destFile}".`);
	} catch (err) {
		console.error(`Copy file ${sourceFile} failed: `, err.message);
		throw err;
	}
};

/**
 * Generate signed URL for a file
 * @param {string} sourceFile
 * @param {{expire: number}} options
 * @returns {Promise<string>}
 */
const getUrl = async (sourceFile, options = { expire: config.defaultPublicExpire }) => {
	if (config.url) {
		return getPublicPath(sourceFile, 'gcStorage');
	}

	try {
		const [url] = await bucket.file(sourceFile).getSignedUrl({
			action: 'read',
			expires: Date.now() + options.expire * 1000,
		});
		return url;
	} catch (err) {
		console.error(`Get signed URL for file ${sourceFile} failed:`, err.message);
		throw err;
	}
};

/**
 * Get content of a file as Buffer
 * @param {string} sourceFile
 * @returns {Promise<Buffer>}
 */
const getContent = async (sourceFile) => {
	try {
		const file = bucket.file(sourceFile);
		const [data] = await file.download();
		return data;
	} catch (err) {
		console.error(`Get content of file ${sourceFile} failed:`, err.message);
		throw err;
	}
};

module.exports = {
	storage,
	save,
	upload,
	remove,
	copy,
	getUrl,
	getContent,
};
