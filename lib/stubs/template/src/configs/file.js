"use strict";
require("dotenv").config();
const path = require("path");
const url = require("@iUtils/url");

/**
 * Local Storage Configuration
 * Local file storage configuration for managing uploads and serving public files.
 */
const local = {
    url: url("public/storage"), // Public URL for accessing stored files
    folder: path.join(__dirname, "./../../storage/upload"), // Path where uploaded files are stored
    publicFolder: path.join(__dirname, "./../../storage/public"), // Path where public files are stored
    defaultPublicExpire: 60, // Default expiration for public files (1 minute)
}

/**
 * Amazon S3 Storage Configuration
 * Configuration for using Amazon S3 for file uploads and public access.
 * Learn more at: 
 * @link https://aws.amazon.com/s3/
 */
const s3 = {
    url: process.env.AWS_CDN_URL || '', // URL to access files publicly from S3 (CDN URL)
    bucket: process.env.AWS_BUCKET_NAME, // Name of the S3 bucket
    region: process.env.AWS_REGION || 'us-east-1', // AWS region for S3 bucket
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // AWS Access Key ID for S3
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // AWS Secret Access Key for S3
    defaultPublicExpire: 60, // Default expiration for public files (1 minute)
}

/**
 * Azure Blob Storage Configuration
 * Configuration for using Azure Blob Storage for file uploads and public access.
 * Learn more at: 
 * @link https://azure.microsoft.com/en-us/services/storage/blobs/
 */
const blob = {
    url: process.env.AZURE_CDN_URL || "", // URL to access files publicly from Azure Blob Storage
    defaultEndpointsProtocol: process.env.AZURE_DEFAULT_ENDPOINTS_PROTOCOL ?? "https", // Protocol for Azure endpoints (usually "https")
    accountName: process.env.AZURE_ACCOUNT_NAME, // Azure account name for Blob storage
    accountKey: process.env.AZURE_ACCOUNT_KEY, // Azure account key for Blob storage
    endpointSuffix: process.env.AZURE_ENDPOINT_SUFFIX ?? "core.windows.net", // Suffix for Azure endpoints (default is "core.windows.net")
    containerName: process.env.AZURE_BLOB_CONTAINER_NAME ?? 'nvt', // Name of the Azure Blob container
    defaultPublicExpire: 60, // Default expiration for public files (1 minute)
}

/**
 * Google Cloud Storage Configuration
 * Configuration for using Google Cloud Storage for file uploads and public access.
 * Learn more at:
 * @link https://cloud.google.com/storage
 */
const gcStorage = {
    url: process.env.GCP_CDN_URL || "", // URL to access files publicly from Google Cloud Storage
    projectId: process.env.GCP_PROJECT_ID, // Google Cloud project ID
    bucket: process.env.GCP_BUCKET, // Name of the Google Cloud bucket
    keyFilename: process.env.GCP_KEY_FILE, // Path to the GCP service account key file
    defaultPublicExpire: 60, // Default expiration for public files (1 minute)
}

/**
 * Module Exports
 * The configuration module exports the storage settings and default limits used for file uploads.
 */
module.exports = {
    use: process.env.STORAGE || "local", // Storage option to use (can be "local", "s3", "blob", or "gcStorage")
    defaultLimits: {
        fileSize: 1024 * 1024  // Maximum file size for uploads (1MB)
    },
    storages: {
        local, // Local storage configuration
        s3, // S3 storage configuration
        blob: {
            ...blob,
            connectString:
                `DefaultEndpointsProtocol=${blob.defaultEndpointsProtocol};AccountName=${blob.accountName};AccountKey=${blob.accountKey};EndpointSuffix=${blob.endpointSuffix}`, // Azure connection string for Blob storage
        },
        gcStorage, // Google Cloud Storage configuration
    }
};
