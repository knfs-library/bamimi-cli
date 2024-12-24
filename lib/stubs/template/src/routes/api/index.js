"use strict";
const router = require("express").Router();

router.get("/", require("@iApp/http/controllers/api/demo.controller").index);

module.exports = router;
