const router = require("express").Router()

router.use("/api",
    require("../index").middleware.api,
    require("../../routes/api"),
    //eslint-disable-next-line
    async (err, req, res, next) => {
        console.error(err)
        return res.status(500).sendMessage({
            message: err.message || "Internal Server Error"
        });
    }
)
router.use("/",
    require("../index").middleware.web,
    require("../../routes/web")),
    //eslint-disable-next-line
    async (err, req, res, next) => {
        console.error(err)
        return res.status(500).send("Internal Error")
    }

router.use('/404', (req, res) => {
        return res.render("errors/404")
    }
)

module.exports = router
