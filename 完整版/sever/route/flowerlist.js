var express = require("express");
var router = express.Router();
const Flower = require("../models/flowerlist");
const Detail = require("../models/details");
const Category = require("../models/category");
const Products = require("../models/productsdetails");
const Appraise = require("../models/appraise");

router.get("/flowerlist", async function (req, res) {
	Flower.find().then(function (data, err) {
		if (err) {
			res.status(200).json({
				code: -1,
				list: []
			});
		} else {
			res.status(200).json({
				code: 0,
				list: data
			});
		}
	});
});
//带参
router.get("/getflowerlist", async function (req, res) {
	console.log(req.query);
	Flower.find({ type: req.query.type }).then(function (data, err) {
		if (err) {
			res.status(200).json({
				code: -1,
				list: []
			});
		} else {
			res.status(200).json({
				code: 0,
				list: data
			});
		}
	});
});
//商品详情
// code: 0,
// detai: [
// {
// _id: "61c32163f48d801ccb1e351f",
// img: "https://upyun.dinghuale.com/uploads/20200630/202006301617456498.jpg",
// name: "浪漫满屋",
// material: "19枝红玫瑰，火龙珠，银叶菊绿叶搭配",
// package: "黑色韩式包装",
// attach: "下单填写留言，免费赠送贺卡 ",
// distribution: "全国送货上门，市区免运费",
// youhui: "暂无优惠券",
// price: 229,
// current_price: 289,
// sales: 17229
// },
// ]
router.get("/details", async function (req, res) {
	Detail.find().then(function (data, err) {
		if (err) {
			res.status(200).json({
				code: -1,
				detail: []
			});
		} else {
			res.status(200).json({
				code: 0,
				detail: data
			});
		}
	});
});
//带参
router.get("/getdetail", async function (req, res) {
	console.log(req.query.name);
	Detail.findOne({ name: req.query.name }).then(function (data, err) {
		if (err) {
			res.status(200).json({
				code: -1,
				detail: []
			});
		} else {
			res.status(200).json({
				code: 0,
				detail: data
			});
		}
	});
});
//分类信息
router.get("/category", async function (req, res) {
	Category.find().then(function (data, err) {
		if (err) {
			res.status(200).json({
				code: -1,
				category: []
			});
		} else {
			res.status(200).json({
				code: 0,
				category: data
			});
		}
	});
});
//每个商品的详情图片信息
// code: 0,
// productsdetails: [
// {
// _id: "61c32244f48d801ccb1e3675",
// name: "幸福守候",
// productdetails: [
// {
// _id: "61c58362c6be5c410d6d04ac",
// img: "https://upyun.dinghuale.com/uploads/20200701/202007011542114015.jpg"
// },
// {
// _id: "61c58362c6be5c410d6d04ad",
// img: "https://upyun.dinghuale.com/uploads/20200701/202007011542083682.jpg"
// },
// {
// _id: "61c58362c6be5c410d6d04ae",
// img: "https://upyun.dinghuale.com/uploads/20210426/202104261158577322.jpg"
// }
// ]
// },
// ]
router.get("/productsdetails", async function (req, res) {
	Products.find().then(function (data, err) {
		if (err) {
			res.status(200).json({
				code: -1,
				productsdetails: []
			});
		} else {
			res.status(200).json({
				code: 0,
				productsdetails: data
			});
		}
	});
});
router.get("/appraise", async function (req, res) {
	Appraise.find().then(function (data, err) {
		if (err) {
			res.status(200).json({
				code: -1,
				appr: []
			});
		} else {
			res.status(200).json({
				code: 0,
				appr: data
			});
		}
	});
});

router.get("/searchList", async (req, res) => {
	const { name } = req.query;
  Detail.find({
		material: new RegExp(name)
	}).then((data,err)=>{
     if(err){
      res.status(200).json({
				code: -1,
				searchList: []
			});
     }else{
      res.status(200).json({
				code: 0,
				searchList: data
			});
     }
  })
});
module.exports = router;
