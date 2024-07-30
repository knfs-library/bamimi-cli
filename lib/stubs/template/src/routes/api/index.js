"use strict";
const router = require("express").Router();

router.get("/", require("../../app/http/controllers/api/demo.controller").index);

module.exports = router;
