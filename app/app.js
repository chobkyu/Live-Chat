"use strict";

const express = require('express');

const app = express();
const bodyParser= require("body-parser");
const dotenv = require("dotenv");
dotenv.config();


// 라우팅
const home = require("./src/routes/home"); 
const chat = require("./src/routes/chat");

app.set("views","./src/views");
app.set("view engine","ejs");

app.use(express.static(__dirname+'/src/public'));
app.use(express.json());
//url을 통해 전달되는 테이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(express.urlencoded({extended : true}));

app.use("/",home);
app.use("/chat",chat);
  

module.exports = app;