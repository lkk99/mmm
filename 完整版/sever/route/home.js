var express = require('express')
var router = express.Router()
const Home = require('../models/home')
const Help = require('../models/help')

//获取首页数据
router.get("/index", function (req, res) {
	Home.find().then(function (data, err) {
		if (err) {
			res.status(200).json({
				code: -1,
				homeData: []
			});
		} else {
			res.status(200).json({
				code: 0,
				homeData:data
			});
		}
	});
});

router.get("/help",(req,res)=>{
	Help.find().then(function (data, err) {
		if (err) {
			res.status(200).json({
				code: -1,
				helpData: []
			});
		} else {
			res.status(200).json({
				code: 0,
				helpData:data
			});
		}
	});
})

module.exports = router