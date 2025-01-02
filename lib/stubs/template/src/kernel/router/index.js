const router = require("express").Router()

router.use("/api",
    require("../index").middleware.api,
    require("@iRoutes/api"),
)

router.use("/",
    require("../index").middleware.web,
    require("@iRoutes/web"),
)

router.use('/404', (req, res) => {
    return res.render("errors/404")
})

module.exports = router
