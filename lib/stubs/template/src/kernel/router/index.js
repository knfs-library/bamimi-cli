const router = require("express").Router()

router.use("/api",
    require("../index").middleware.api,
    require("../../routes/apis"),
    //eslint-disable-next-line
    async (err, req, res, next) => {
        return res.status(500).sendMessage({
            message: err.message || "Internal Server Error"
        });
    }
)
router.use("/",
    require("../index").middleware.web,
    require("../../routes/web")),
    async (err, req, res, next) => {
        return res.status(500).sendMessage({
            message: err.message || "Internal Server Error"
        });
    }

module.exports = router
