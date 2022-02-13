var express = require('express')
var router = express.Router()
const User = require('../models/user')

//注册接口
router.post("/signup", async function (req, res) {
    const { username, password, email } = req.body;
    //根据用户名从数据查询有没有指定用户
    const user = await User.find({ username })
    if (user.length) {
        res.status(200).json({
            code: -1,
            msg: '用户名已被注册'
        })
        return;
    }

    // 如果注册请求没有问题，则将用户信息写入数据库
    const nuser = new User({
        username,
        password,
        email
    })
    nuser.save().then(function (user, err) {
        if (err) {
            res.status(200).json({
                code: -1,
                message: '注册失败'
            })
            return
        }
        res.status(200).json({
            code: 0,
            message: '恭喜您注册成功'
        })
    })
})

router.post("/userlogin", async function (req, res) {
    const { username, password } = req.body;
    //根据用户名从数据查询有没有指定用户
    const user = await User.find({ username })
    if (user.length) {
      console.log(user[0],'xxxxxxx')
        if(user[0].password===password){
            req.session.user = user[0];
            res.status(200).json({
                code: 0,
                message: '登录成功'
            })
        }else{
            res.status(200).json({
                code: -2,
                msg: '密码错误'
            })
        }
    }
    else  {
            res.status(200).json({
                code: -1,
                msg: '账号不存在'
            })
        }
})

router.get("/getuser", async function (req, res) {
    if (req.session.user) {
        const { username, email } = req.session.user
        res.status(200).json({
            name: username,
            email,
            login: true
        })
    } else {
        res.status(200).json({
            name: '',
            email: '',
            login: false
        })
    }
    
})

router.get("/exituser", async function (req, res) {
    req.session.user = [];
    req.session.destroy()
    res.json({
        code:0
    })
})

module.exports = router