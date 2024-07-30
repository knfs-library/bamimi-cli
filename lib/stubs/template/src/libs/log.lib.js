"use strict";

const fs = require("fs-extra");
const path = require("path");
const winston = require("winston");
const config = require("../configs/log");

const pathStorage = path.join(__dirname, "../storage/sys/logs");

// Logger options configuration
const options = {
    all: {
        level: "info",
        filename: path.join(pathStorage, "all.log"),
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
    },
    error: {
        level: "error",
        filename: path.join(pathStorage, "error.log"),
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
    },
    job: {
        level: "warn",
        filename: path.join(pathStorage, "job.log"),
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
    },
    console: {
        level: "debug",
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    },
};

// Add transports based on the level
const addTransportsLevel = (level, extend = null) => {
    const transports = [new winston.transports.Console(options.console)];

    if (config.logFile?.access) {
        console.log("accessFile OK");
        cleanupOldLogs(pathStorage);

        transports.push(new winston.transports.File(options.all));

        switch (level) {
        case "error":
            transports.push(new winston.transports.File(options.error));
            break;
        case "job":
            transports.push(new winston.transports.File({
                ...options.job,
                filename: path.join(pathStorage, `job_${extend}.log`)
            }));
            break;
        default:
            break;
        }
    }

    return transports;
};

// Clean up old logs
const cleanupOldLogs = (logDir) => {
    const ttl = (config.logFile?.ttl || 24 * 60 * 60) * 1000; // TTL in milliseconds, default is 1 day

    fs.readdir(logDir, (err, files) => {
        if (err) {
            console.error(`Error reading log directory: ${err}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(logDir, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Error getting file stats: ${err}`);
                    return;
                }

                const now = Date.now();
                if (now - stats.mtimeMs > ttl) {
                    fs.remove(filePath, err => {
                        if (err) {
                            console.error(`Error deleting file: ${err}`);
                        } else {
                            console.log(`Deleted old log file: ${filePath}`);
                        }
                    });
                }
            });
        });
    });
};

// Logger methods
const createLogger = (level, transports) => {
    return winston.createLogger({
        level,
        format: winston.format.json(),
        defaultMeta: { service: process.env.APP_NAME },
        transports,
        exitOnError: false,
    });
};

const Logger = {
    info: (content) => createLogger("info", addTransportsLevel("info")).info(content),
    error: (content) => createLogger("error", addTransportsLevel("error")).error(content),
    job: (jobName, content) => createLogger("warn", addTransportsLevel("job", jobName)).warn(content),
    stream: {
        write: (content) => Logger.info({ message: content }),
    }
};

module.exports = Logger;
