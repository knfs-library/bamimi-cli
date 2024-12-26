"use strict";

const express = require("express"),
    app = express(),
    configs = require("@iConfigs"),
    errorhandler = require("errorhandler"),
    path = require("path"),
    { createServer } = require("node:http"),
    socket = require("@knfs-tech/bamimi-socket.io"),
    server = createServer(app),
    session = require("express-session"),
    fs = require('fs-extra'),
    flash = require("express-flash");


const jobOnMain = require("@iKernel/cronjobs/onMain");
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
app.use("/public", express.static(path.join(__dirname, "./../public"), { maxAge: configs.app.staticCacheTime }));

/**
 * **********************************
 * Set up common middleware before
 * **********************************
 */
app.use(session({
    secret: configs.app.name,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

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
 * Error handle
 * **********************************
 */

if (process.env.NODE_ENV === "development") {
    // only use in development
    app.use(errorhandler());
}

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
if (configs.socket.onMain) {
    socket.io(server, configs.socket);
    require("@iRoutes/socket")
}


server.listen(configs.app.server.port, async function () {
    console.log("listening on port " + configs.app.server.port);
    if (process.env.NODE_ENV === "development") {
        const uuPath = path.join(__dirname, './../../.unused');

        if (fs.existsSync(uuPath)) {
            const open = require("open")
            await open.default(`http://localhost:${configs.app.server.port}`);
            await fs.remove(uuPath)
        }
    }
});