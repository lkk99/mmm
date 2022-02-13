var express = require("express");
var router = express.Router();
const Cart = require("../models/cart");

router.post("/join", async function (req, res) {
	let { name, count, old_price, new_price, image } = req.body;
	let cart = await Cart.find({ name });
	console.log(cart, "xxxxxxxxxxx");
	if (cart.length) {
		const countAll = +cart[0].count + +count;
		Cart.update({ name: name }, { $set: { count: countAll } }).then(
			function (msg) {
				console.log(msg, "aaa");
				res.status(200).json({
					code: 0,
					message: "加入购物车成功"
				});
			},
			function (err) {
				console.log(err);
				res.status(200).json({
					code: -1,
					message: "加入购物车失败"
				});
			}
		);
		return;
	}
	const ncart = new Cart({
		name,
		old_price,
		new_price,
		count,
		image
	});
	ncart.save().then(function (cart, err) {
		if (err) {
			res.status(200).json({
				code: -1,
				message: "加入购物车失败"
			});
			return;
		}
		res.status(200).json({
			code: 0,
			message: "加入购物车成功"
		});
	});
});

router.get("/getcart", async function (req, res) {
	const cart = await Cart.find();
	if (cart.length) {
		res.status(200).json({
			cart
		});
	} else {
		res.status(200).json({
			code: -1,
			msg: "购物车暂无内容"
		});
	}
});

router.post("/delete", async function (req, res) {
	const { name } = req.body;
	const cart = await Cart.find({ name });
	// console.log(cart[0].id, "xxxxxxxxxxx");
	if (cart.length) {
		let id = cart[0].id;
		Cart.findByIdAndRemove(id).then(async function (data) {
			console.log(data, "删除的数据");
			const cart2 = await Cart.find();
			if (cart2.length) {
				res.status(200).json({
					cart2
				});
			} else {
				res.status(200).json({
					code: -1,
					cart2:[]
				});
			}
		});
	}
});

module.exports = router;
