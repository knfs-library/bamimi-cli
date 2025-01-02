"use strict";
const router = require("express").Router()

router.use("/api",
    require("../index").middleware.api,
    require("@iRoutes/api"),
    //eslint-disable-next-line
    async (err, req, res, next) => {
        console.error(err)
        res.status(500).sendData({
            message: err.message || "Internal Server Error"
        });
        next();
    }
)

router.use("/",
    require("../index").middleware.web,
    require("@iRoutes/web")),
    //eslint-disable-next-line
    async (err, req, res, next) => {
        console.error(err)
        res.status(500).send("Internal Server Error")
        next();
    }

router.use('/404', (req, res) => {
    res.render("errors/404")
}
)

module.exports = router
