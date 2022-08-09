"use strict";

// 모듈
const express = require("express");
const bodyParser = require("body-parser");  
const app = express();
const PORT = 3000;


// 라우팅       
const home = require("./client/routes/home");


var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

// 앱 세팅
app.set("views", "./client/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/client/public`));
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true}));

app.use("/", home); 

module.exports = app;

