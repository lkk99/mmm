/**
 * @type {createApplication}
 */

const express = require('express')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const request = require('request')
let router = express.Router();
const AlipaySdk = require('alipay-sdk').default; // 引入 SDK
const AlipayFormData = require('alipay-sdk/lib/form').default;
const Order = require('../models/Order')
const Cart = require("../models/cart");
const OrderList = require('../models/orderlist')
/**--------------------------------------------------------------------- */

router.get('/test', async (req, res) => {
    var price = req.query.price;
    var beizhu = req.query.beizhu;
    var list = req.query.list;
    // var price = 0.01;
    // var beizhu = '鲜花';
    const alipaySdk = new AlipaySdk({
        appId: '2021000118664398', // 沙箱中的 appId
        privateKey: fs.readFileSync(path.join(__dirname, '../alipay_key/app_private_key.pem'), 'ascii'), // 应用私钥字符串
        signType: 'RSA2', // 签名算法,默认 RSA2
        alipayPublicKey: fs.readFileSync(path.join(__dirname, '../alipay_key/alipay_public_key.pem'), 'ascii'), // 支付宝公钥，需要对结果验签时候必填
        gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝网关地址 ，沙箱环境下使用时需要修改
        timeout: 5000,
        camelcase: true
    });
    const outTradeNo = Date.now() + "20576";
    const formData = new AlipayFormData();
    const timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    formData.setMethod('get');
    formData.addField('appId', '2021000118664398'); //沙箱环境appID
    formData.addField('charset', 'utf-8');
    formData.addField('signType', 'RSA2'); //沙箱中的密钥设置为RSA
    formData.addField('timestamp', moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
    formData.addField('bizContent', {
        outTradeNo: outTradeNo, //【必选】商户订单号：64个字符内，包含数字，字母，下划线；需要保证在商户端不重复
        productCode: 'FAST_INSTANT_TRADE_PAY', //【必选】销售产品码，目前仅支持FAST_INSTANT_TRADE_PAY
        totalAmount: price,                     //【必选】订单总金额，精确到小数点后两位,这里是从前台支付时获取的
        subject: '鲜花',
        body: beizhu,
        timestamp: timestamp
    });
    // 支付成功之后返回的界面
    formData.addField('returnUrl', 'http://localhost:9999/api/pay/back');
    const result = await alipaySdk.exec('alipay.trade.page.pay', {}, {
        formData: formData
    });
    const norder = new Order({
        outTradeNo,
        price,
        beizhu,
        list,
        payurl: result,
        state: false,
        time: timestamp
    })
    norder.save().then(function (order, err) {
        if (err) {
            res.end("err");
            return;
        }
    })
    //  console.log(result, "ppppppppppp") //  result为可以跳转到支付连接的url
    return res.json(result)
});

router.post('/orderlist', async (req, res) => {
    let { list } = req.body;
    console.log(req.body)
    const nlist = new OrderList({
        list
    });
    nlist.save().then(function (cart, err) {
        if (err) {
            res.status(200).json({
                code: -1,
                message: "加入失败"
            });
            return;
        }
        res.status(200).json({
            code: 0,
            message: "加入成功"
        });
    });
});

router.post('/ordermsg', async (req, res) => {
    let { msg } = req.body;
    OrderList.update({}, { $set: { msg: req.body } }).then(
        function (msg) {
            console.log(msg, "aaa");
            res.status(200).json({
                code: 0,
                message: "加入成功",
                msg
            });
        },
        function (err) {
            console.log(err);
            res.status(200).json({
                code: -1,
                message: "加入失败", err
            });
        }
    );
});

router.get("/getorderlist", async function (req, res) {
    const cart = await OrderList.find();
    if (cart.length) {
        let data = cart[cart.length - 1]
        res.status(200).json({
            code: 0,
            cart: data
        });
    } else {
        res.status(200).json({
            code: -1,
            msg: "购物车暂无内容"
        });
    }
});


router.get('/back', async (req, res) => {
    var outTradeNo = req.query.out_trade_no;
    Order.update({ outTradeNo: outTradeNo }, { $set: { state: true } })
        .then(function (msg) {
            console.log(msg);
            res.redirect('http://localhost:3002');
        }, function (err) {
            console.log(err);
            res.redirect('http://localhost:3002');
        })
});
router.get("/getorder", async function (req, res) {
    const order = await Order.find()
    if (order.length) {
        res.status(200).json({
            order
        })
    }
    else {
        res.status(200).json({
            code: -1,
            msg: '暂无订单'
        })
    }
})

router.get("/delete", async function (req, res) {
    // const { name } = req.body;
    // const cart = await Cart.find({ name });
    var cart = JSON.parse(req.query.list)
    if (cart.length) {
        for (var i = 0; i < cart.length; i++) {
            let id = cart[i]._id;
            console.log(cart[i]._id, "删除的数据");
            Cart.findByIdAndRemove(id).then(async function (data) {
                console.log(data, "删除的数据");
            });
        }
    }
});

module.exports = router
