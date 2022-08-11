"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

router.get("/", ctrl.output.hello);
router.get("/api/login", ctrl.output.login);
router.get("/api/register", ctrl.output.register);

router.post("/api/login", ctrl.process.login);
router.post("/api/register", ctrl.process.register);



module.exports = router;
