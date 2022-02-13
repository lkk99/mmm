var express = require("express");
var router = express.Router();
const User = require('../models/user')
const Detail = require("../models/details");
const Flower = require("../models/flowerlist");

router.get("/userinfo", async function (req, res) {

    res.status(200).json({
        code: 200,
        message: '获取用户信息成功',
        data: {
          id: 1,
          name: 'zhangsan',
          'role|1': ['admin', 'visitor'], // 随机返回一个角色admin或visitor
          avatar: "@image('48x48', '#fb0a2a')",
        },
    });
});
router.post("/login", async function (req, res) {
	let { password} = req.body;
    console.log(+password)
        res.status(200).json({
            code: 200,
            message: '登录成功',
            data: {
              token: '@word(50, 100)', // @word()是mockjs的语法
              refresh_token: '@word(50, 100)', // refresh_token是用来重新生成token的
            },
        })
});
router.get("/menus", async function (req, res) {
	
        res.status(200).json({
              code: 200,
              message: '获取菜单成功',
              data: [
                {
                  name: 'test',
                  title: '测试页面',
                  children: [
                    {
                      name: 'testList',
                      title: '列表',
                    },
                    {
                      name: 'testAdd',
                      title: '添加',
                    },
                    {
                      name: 'testEdit',
                      title: '编辑',
                    },
                    {
                      name: 'testAuth',
                      title: '权限测试',
                    },
                    {
                      name: 'test-cache',
                      title: '该页面可缓存',
                    },
                    {
                      name: 'test-no-cache',
                      title: '该页面不可缓存',
                    },
                    {
                      name: 'nest',
                      title: '二级菜单',
                      children: [
                        {
                          name: 'nestPage1',
                          title: 'page1',
                        },
                        {
                          name: 'nestPage2',
                          title: 'page2',
                        },
                      ],
                    },
                    {
                      name: 'test-error-log',
                      title: '测试错误日志',
                    },
                  ],
                },
              ],
          },)
});
router.get("/manage/list", async function (req, res) {
    const user = await User.find();
    // console.log(user)
        res.status(200).json({
            code: 0,
            data: user,
            total: user.length
        })
});
router.get("/manage/delete", async function (req, res) {
  //  console.log(req.query.id)
   let id =req.query.id
   User.findByIdAndRemove(id).then(async function (data) {
    // console.log(data, "删除的数据");
}).then(
    function (msg) {
        // console.log(msg, "aaa");
        res.status(200).json({
            code: 0,
           
        });
    },
    function (err) {
        console.log(err);
        res.status(200).json({
            code: -1,
        });
    }
);
});
router.get("/cashflow/lists", async function (req, res) {
    const detail = await Detail.find();
    let { incomePayType, current = 1, size = 20, sort } = req.query
    const pageList = detail.filter((item, index) => index < size * current && index >= size * (current - 1))
    // console.log(pageList,'xxxxx')
    res.status(200).json({
            code: 0,
            data:pageList,
            total: detail.length
        })
});
router.get("/cashflow/list", async function (req, res) {
    let id =req.query[0]
    const detail = await Detail.findById(id);
    res.status(200).json({
        code: 0,
        data: detail,
        total: 22
    })
});
router.post("/cashflow/update", async function (req, res) {
    let id =req.body._id
    console.log(req.body,'mmmm')
    Detail.update({ _id: id }, { $set: {incomePayType:Number(req.body.incomePayType),name: req.body.name,price: req.body.price,current_price: req.body.current_price,attach:req.body.attach } }).then(
        function (msg) {
            // console.log(msg, "aaa");
            res.status(200).json({
                code: 0,
                message: "修改成功",
                msg
            });
        },
        function (err) {
            // console.log(err);
            res.status(200).json({
                code: -1,
                message: "修改失败", err
            });
        }
    );
});

router.get("/cashflow/delete", async function (req, res) {
    console.log(req.query.id,'xxxxx')
		let id = req.query.id;
		Detail.findByIdAndRemove(id).then(async function (data) {
			console.log(data, "删除的数据");
            
		}).then(
            function (msg) {
                // console.log(msg, "aaa");
                res.status(200).json({
                    code: 0,
                   
                });
            },
            function (err) {
                // console.log(err);
                res.status(200).json({
                    code: -1,
                });
            }
        );
});

router.post("/cashflow/create", async function (req, res) {
    // console.log(req.body,'xxxxxxx')
    let a=req.body
    Detail.insertMany(a).then(
      function (msg) {
        // console.log(msg, "aaa");
        res.status(200).json({
            code: 0,
            message: "添加成功",
            msg
        });
    },
    function (err) {
        // console.log(err);
        res.status(200).json({
            code: -1,
            message: "添加失败", err
        });
    }
    )
    // res.status(200).json({
    //     code: 0,
       
    // });
});

router.get("/flowers/lists", async function (req, res) {
    const flower = await Flower.find();
    console.log(req.body)
    // let { incomePayType, current = 1, size = 20, sort } = req.query
    // const pageList = detail.filter((item, index) => index < size * current && index >= size * (current - 1))
    // // console.log(pageList,'xxxxx')
    // const list=flower.filter()
    // res.status(200).json({
    //         code: 0,
    //         list:list
    //     })
});
// router.get("/cashflow/list", async function (req, res) {
//     let id =req.query[0]
//     const detail = await Detail.findById(id);
//     res.status(200).json({
//         code: 0,
//         data: detail,
//         total: 22
//     })
// });
// router.post("/cashflow/update", async function (req, res) {
//     let id =req.body._id
//     console.log(req.body,'mmmm')
//     Detail.update({ _id: id }, { $set: {incomePayType:Number(req.body.incomePayType),name: req.body.name,price: req.body.price,current_price: req.body.current_price,attach:req.body.attach } }).then(
//         function (msg) {
//             // console.log(msg, "aaa");
//             res.status(200).json({
//                 code: 0,
//                 message: "修改成功",
//                 msg
//             });
//         },
//         function (err) {
//             // console.log(err);
//             res.status(200).json({
//                 code: -1,
//                 message: "修改失败", err
//             });
//         }
//     );
// });

// router.get("/cashflow/delete", async function (req, res) {
//     console.log(req.query.id,'xxxxx')
//         let id = req.query.id;
//         Detail.findByIdAndRemove(id).then(async function (data) {
//             console.log(data, "删除的数据");
            
//         }).then(
//             function (msg) {
//                 // console.log(msg, "aaa");
//                 res.status(200).json({
//                     code: 0,
                   
//                 });
//             },
//             function (err) {
//                 // console.log(err);
//                 res.status(200).json({
//                     code: -1,
//                 });
//             }
//         );
// });

// router.post("/cashflow/create", async function (req, res) {
//     // console.log(req.body,'xxxxxxx')
//     let a=req.body
//     Detail.insertMany(a).then(
//       function (msg) {
//         // console.log(msg, "aaa");
//         res.status(200).json({
//             code: 0,
//             message: "添加成功",
//             msg
//         });
//     },
//     function (err) {
//         // console.log(err);
//         res.status(200).json({
//             code: -1,
//             message: "添加失败", err
//         });
//     }
//     )
//     // res.status(200).json({
//     //     code: 0,
       
//     // });
// });

module.exports = router;
