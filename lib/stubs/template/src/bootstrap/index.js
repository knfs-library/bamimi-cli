"use strict";

const express = require("express"),
    app = express(),
    configs = require("@iConfigs"),
    path = require("path"),
    { createServer } = require("node:http"),
    socket = require("@knfs-tech/bamimi-socket.io"),
    server = createServer(app);


const jobOnMain = require("@iKernel/job/onMain");
/** 
 * **********************************
 * Set log
 * **********************************
 */
require("@iKernel/log")(app);
/***
 * **********************************
 * Set static file
 * **********************************
 */
app.use("/public", express.static(path.resolve(__dirname, "./../public"), { maxAge: configs.app.staticCacheTime }));


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
 * Queue init on main process
 * **********************************
 */
require("@iKernel/queue");

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