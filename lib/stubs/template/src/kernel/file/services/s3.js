"use strict";

const { storages, defaultLimits } = require("@iConfigs/file");
const config = storages.s3

const { S3Client, DeleteObjectCommand, CopyObjectCommand, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multerS3 = require('multer-s3');
const multer = require("multer");

const { setFilename, fileFilter } = require("../support");
const { getPublicPath } = require("@iUtils/file");

const storage = new S3Client({
	region: config.region,
	credentials: {
		accessKeyId: config.accessKeyId,
		secretAccessKey: config.secretAccessKey
	}
});

const upload = (options = {
	filename: setFilename,
	limits: defaultLimits,
	fileFilter,
}) => {
	const storageEngine = multerS3({
		s3: storage,
		bucket: config.bucket,
		key: options.filename,
	})

	return multer({ storage: storageEngine, ...options });
}

/**
 * 
 * @param {File} file 
 * @param {string} destFile 
 * @returns {Promise<void>}
 */
const save = async (file, destFile) => {
	const command = new PutObjectCommand({
		Bucket: config.bucket,
		Key: destFile,
		Body: file.buffer,
		ContentType: file.mimetype,
	});

	return await storage.send(command);
};

/**
 * 
 * @param {string} sourceFile 
 */
const remove = async (sourceFile) => {
	const params = {
		Bucket: config.bucket,
		Key: sourceFile,
	};
	try {
		const command = new DeleteObjectCommand(params);
		const response = await storage.send(command);

		console.log(`S3 "${sourceFile}" deleted.`);
		return response;
	} catch (err) {
		console.error(`Remove file ${sourceFile} `,err.message)
		throw err;
	}
}

/**
 * 
 * @param {string} sourceFile 
 * @param {string} destFile 
 */
const copy = async (sourceFile, destFile) => {
	const copyParams = {
		Bucket: config.bucket,
		CopySource: `${config.bucket}/${sourceFile}`,
		Key: destFile,
	};
	try {
		const command = new CopyObjectCommand(copyParams);
		const response = await storage.send(command);
		return response;
	} catch (err) {
		console.error(`Copy file ${sourceFile} `, err.message)
		throw err;
	}
}

/**
 * 
 * @param {string} sourceFile 
 * @param {{expire: number}} options
 * @returns {string}
 * @throws {Error}
 */
const getUrl = async (sourceFile, options = {
	expire: config.defaultPublicExpire
}) => {
	if ('' != config.url) {
		return getPublicPath(sourceFile, 's3')
	}
	
	const params = {
		Bucket: config.bucket,
		Key: sourceFile,
	};

	try {
		const command = new GetObjectCommand(params);
		return await getSignedUrl(storage, command, {
			expiresIn: options.expire * 1000,
		});

	} catch (err) {
		console.error(`Get signed URL for file ${sourceFile} failed:`, err.message);
		throw err;
	}
}

/**
 * Get content file
 * @param {string} sourceFile
 * @returns {Buffer}
 */
const getContent = async (sourceFile) => {
	const params = {
		Bucket: config.bucket,
		Key: sourceFile,
	};
	try {
		const command = new GetObjectCommand(params);
		const response = await storage.send(command);
		const streamToBuffer = async (stream) => {
			const chunks = [];
			for await (const chunk of stream) {
				chunks.push(chunk);
			}
			return Buffer.concat(chunks);
		};
		return await streamToBuffer(response.Body);
	} catch (err) {
		console.error(`Get content of file ${fileKey} `, err.message);
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
}