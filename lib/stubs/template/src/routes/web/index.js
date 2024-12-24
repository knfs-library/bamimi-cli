"use strict";
const router = require("express").Router();

router.get("/", require("@iApp/http/controllers/web/demo.controller").index);

module.exports = router;
