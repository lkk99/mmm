const express = require("express")
const router = require("./router/router")
const bodyParser = require('body-parser')
const expressSession = require("express-session");
const mongoose = require("mongoose")
const app = express()

mongoose.connect("mongodb://localhost:27017/blog");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("连接成功");
});

app.use("/node_modules", express.static("./node_modules"))
app.use("/public", express.static("./public"))


app.engine("html", require("express-art-template"));
app.set("views", __dirname + "/views");

//解析请求头为"application/x-www-form-urlencoded"的post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
//解析请求头为 "application/json"的post请求参数
app.use(bodyParser.json());

app.use(
    expressSession({
        name: "sessionID",
        secret: "secret",
        resave: false,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 3
        }
    })
);
app.use("/", router)


app.listen(8000, () => {
    console.log("8000端口启动")
})