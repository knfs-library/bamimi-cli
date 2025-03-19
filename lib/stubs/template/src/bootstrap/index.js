"use strict";

const express = require("express"),
    app = express(),
    configs = require("@iConfigs"),
    path = require("path"),
    { createServer } = require("node:http"),
    socket = require("@knfs-tech/bamimi-socket.io"),
    server = createServer(app),
    alb = require("@knfs-tech/alb");


const jobOnMain = require("@iKernel/job/onMain");
/** 
 * **********************************
 * Set log
 * **********************************
 */
const { logRequest } = require("@iKernel/log");
logRequest(app)
/***
 * **********************************
 * Set static file and file public
 * **********************************
 */
//public file
app.use("/public", express.static(path.resolve(__dirname, "./../public"), { maxAge: configs.app.staticCacheTime }));
//public storage
app.use("/public/storage", express.static(path.resolve(__dirname, "./../../storage/public"), { maxAge: configs.app.staticCacheTime }));

/**
 * **********************************
 * Set up common middleware before
 * **********************************
 */
const kernelMiddleware = require("@iKernel/index").middleware.common;
app.use(kernelMiddleware.before);

/**
 * **********************************
 * Set up router
 * **********************************
 */
app.use(require("@iKernel/router"));

/**
 * **********************************
 * Set up common middleware after
 * **********************************
 */
app.use(kernelMiddleware.after);

/**
 * **********************************
 * Set up template
 * **********************************
 */
require("@iKernel/interface/web")(app);

/**
 * **********************************
 * Job run on main process
 * **********************************
 */
jobOnMain();

/**
 * **********************************
 * Socket run on main process
 * **********************************
 */
if (configs.socket.use) {
    socket.io(server, configs.socket);
    require("@iRoutes/socket")
}

/**
 * **********************************
 * Function run app
 * **********************************
 */
const runApp = () => {
    server.listen(configs.app.server.port, async function () {
        const protocol = configs.app.server.ssl ? "https" : "http";
        const info = {
            BAMIMI: process.env.BAMIMI_VER,
            NODE: process.version,
            ENV: process.env.NODE_ENV,
            URL: `${protocol}://${configs.app.server.host}:${configs.app.server.port}`,
        }
        console.table(info)
    });
}

/**
 * **********************************
 * Check handle application loadbalancer
 * **********************************
 */
if (configs.app.server.useAlb) {
    alb(runApp, configs.app.server.alb)
} else {
    runApp()
}
