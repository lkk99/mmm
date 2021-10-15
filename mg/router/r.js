const express = require("express")

const router = express.Router()
const User = require("../models/m")
const Article = require("../models/article")
const { formatArrayToObj } = require("../utl")
const multer = require('multer');
const path = require("path")


//设定上传文件保存的路径和名字的信息
var storage = multer.diskStorage({
    //设定上文文件保存在哪里（若不存在则需要创建）
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/img'));
    },
    //设定保存的文件名 时间戳 + 文件原始名，比如 151342376785-123.jpg
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var upload = multer({ storage: storage });

router.get("/", async(req, res) => {
    var user = req.session.user;
    let articles = await Article.find()
    res.render("index.html", { user, articles })

})

router.get("/register", (req, res) => {
    res.render("register.html")
})
router.post("/register", async(req, res) => {
    // console.log(formatArrayToObj(req.body))
    var body = formatArrayToObj(req.body)
    try {
        var result = await User.find({ $or: [{ email: body.email }, { nickname: body.nickname }] })

        if (result.length === 0) {
            var user = new User(body)
            var result = await user.save()
            res.json({
                code: 20000,
                msg: "成功",
                err: null
            })

        }
        // res.send("处理注册请求成功")
        else {
            res.json({
                code: 19999,
                msg: "不成功",
                err: "邮箱或昵称已经存在"
            })
        }
    } catch (err) {
        res.json({
            code: 19999,
            msg: "不成功",
            err: err.message
        })
    }

})

router.get("/login", (req, res) => {
    res.render("login.html")
})
router.post("/login", async(req, res) => {
    var body = formatArrayToObj(req.body)
    try {
        var result = await User.find({
            email: body.email,
            password: body.password
        })

        if (result.length != 0) {
            req.session.user = result[0]
            res.json({
                code: 20000,
                msg: "成功"
            })

        }
        // res.send("处理注册请求成功")
        else {
            res.json({
                code: 20000,
                msg: "不成功",
                err: "账号或密码错误"
            })
        }

    } catch (err) {
        res.json({
            code: 20000,
            msg: "不成功",
            err: err.message
        })
    }

})


router.get("/logout", (req, res) => {
    req.session.user = null
    req.session.destroy()
    res.redirect("/login")
})


router.get("/settings/admin", (req, res) => {
    var user = req.session.user;
    res.render("settings/admin.html", { user })
})

router.get("/settings/profile", (req, res) => {
    var user = req.session.user;
    res.render("settings/profile.html", { user })
})

router.post("/settings/admin", async(req, res) => {
    const body = formatArrayToObj(req.body)
    if (body.newpassword === body.renewpassword) {
        if (body.oldpassword === req.session.user.password) {
            let result = await User.findByIdAndUpdate(
                req.session.user._id, { $set: { password: body.newpassword } }, { new: true }
            );
            //更新session
            req.session.user = result;
            res.json({
                code: 20000,
                msg: "修改密码成功"
            });
        } else {
            res.json({
                code: 19999,
                msg: "修改失败",
                err: "原密码不正确"
            })
        }
    } else {
        res.json({
            code: 19999,
            msg: "修改失败",
            err: "新密码与原密码不正确"
        })
    }

})
router.post("/settings/profile", upload.single('avatar'), async(req, res) => {
    req.body.avatar = path.join("/public/img/", req.file.filename);
    //更新数据库
    let result = await User.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true })
        //更新内存中session
    req.session.user = result;
    res.redirect("/settings/profile")
})


router.get("/topic/new", (req, res) => {
    var user = req.session.user;
    res.render("topic/new.html", { user })
})

router.post("/topic/new", async(req, res) => {
    var user = req.session.user;
    var article = new Article(req.body)
    article.user_id = user._id
    article.icon = user.avatar

    var result = await article.save()
    res.redirect("/")
})

router.get("/topic/:id", async(req, res) => {
    var id = req.params['id']
    var result = await Article.findById(id)
    var user = req.session.user
    res.render("topic/show.html", { article: result, user })
})
module.exports = router