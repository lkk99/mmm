const express = require("express");
const app = express();

//引入相关包
const mongoose = require("mongoose");
const dbConfig = require("./dbs/config");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const user = require("./route/user");
const home = require("./route/home");
const cart = require("./route/cart");
const path = require("path");
const alipay = require("./route/alipay.js");
const flowers = require("./route/flowerlist");
const login=require("./route/login")
app.use(
	expressSession({
		secret: "password",
		resave: false,
		saveUninitialized: false
	})
);
//mongoose连接
mongoose.connect(dbConfig.dbs, {
	useNewUrlParser: true
});

app.all("/api/*", (req, res, next) => {
	//设置允许跨域响应报文头
	//设置跨域
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "*");
	res.setHeader("Content-Type", "application/json;charset=utf-8");
	next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", user);
app.use("/api/home", home);
app.use("/api/cart", cart);
app.use("/api/pay", alipay);
app.use("/api/flowers", flowers);
app.use("/api",login)

const port = 9999;
// Listen the server
app.listen(`${port}`, () => {
	console.log(`${port}端口已启用`);
});
