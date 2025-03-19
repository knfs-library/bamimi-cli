"use strict";

const { storages, defaultLimits } = require("@iConfigs/file");
const config = storages.blob

const { BlobServiceClient } = require("@azure/storage-blob");
const { MulterAzureStorage } = require('multer-azure-blob-storage');
const multer = require('multer');

const { setFilename, fileFilter } = require("../support");
const { getPublicPath } = require("@iUtils/file");


const initAzBlob = () => {
	return BlobServiceClient.fromConnectionString(config.connectString);
}

/**
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
	const storageEngine = new MulterAzureStorage({
		connectionString: config.connectString,
		accessKey: config.accountKey,
		accountName: config.accountName,
		containerName: config.containerName,
		blobName: options.filename,
		containerAccessLevel: 'blob',
		urlExpirationTime: 60
	});

	return multer({ storage: storageEngine, ...options });
}

/**
 * Upload file to Azure Blob
 * @param {File} file
 * @param {string} destFile
 * @returns {Promise<void>}
 */
const save = async (file, destFile) => {
	const blobServiceClient = initAzBlob();
	const containerClient = blobServiceClient.getContainerClient(config.containerName);
	const blockBlobClient = containerClient.getBlockBlobClient(sourceFile);

	await blockBlobClient.uploadData(file.buffer, {
		blobHTTPHeaders: { blobContentType: file.mimetype },
	});
};

/**
 * 
 * @param {string} sourceFile 
 */
const remove = async (sourceFile) => {
	try {
		const blobServiceClient = initAzBlob();
		const containerClient = blobServiceClient.getContainerClient(config.containerName);
		const blockBlobClient = containerClient.getBlockBlobClient(sourceFile);

		const blobExists = await blockBlobClient.exists();

		if (blobExists) {
			await blockBlobClient.delete();
			console.log(`Blob "${sourceFile}" deleted.`);
		} else {
			console.warn(`Blob "${sourceFile}" not exist.`);
		}
	} catch (err) {
		console.error(`Remove file ${sourceFile} `, err.message)
	}
}

/**
 * 
 * @param {string} sourceFile 
 * @param {string} destFile 
 */
const copy = async (sourceFile, destFile) => {
	try {
		const blobServiceClient = initAzBlob();
		const containerClient = blobServiceClient.getContainerClient(config.containerName);
		const sourceBlobClient = containerClient.getBlobClient(sourceFile);
		const destBlobClient = containerClient.getBlockBlobClient(destFile);

		const copyPoller = await destBlobClient.beginCopyFromURL(sourceBlobClient.url);

		await copyPoller.pollUntilDone();
	} catch (err) {
		console.error("Error during file copy:", err);
		throw new Error("Cannot copy file");
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
		return getPublicPath(sourceFile, 'blob')
	}
	const blobServiceClient = initAzBlob();
	const containerClient = blobServiceClient.getContainerClient(config.containerName);
	const blobClient = containerClient.getBlobClient(sourceFile);

	return await blobClient.generateSasUrl({
		expiresOn: new Date(new Date().valueOf() + options.expire * 1000),
		permissions: 'r'
	});
}

/**
 * 
 * @param {string} sourceFile 
 * @returns {Buffer}
 * @throws {Error}
 */
const getContent = async (sourceFile) => {
	try {
		const blobServiceClient = initAzBlob();
		const containerClient = blobServiceClient.getContainerClient(config.containerName);
		const blobClient = containerClient.getBlockBlobClient(sourceFile);

		const downloadBlockBlobResponse = await blobClient.download();

		const chunks = [];
		for await (const chunk of downloadBlockBlobResponse.readableStreamBody) {
			chunks.push(chunk);
		}

		return Buffer.concat(chunks);
	} catch (err) {
		console.error(`Error fetching content of ${sourceFile}:`, err);
		throw new Error("Cannot fetch file content");
	}
};

module.exports = {
	storage: initAzBlob(),
	save,
	upload,
	remove,
	copy,
	getUrl,
	getContent,
}