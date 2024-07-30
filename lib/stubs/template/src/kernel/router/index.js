const router = require("express").Router();

router.use("/api",
    require("../index").middleware.api,
    require("../../routes/api"));
router.use("/",
    require("../index").middleware.web,
    require("../../routes/web"));

module.exports = router;
