const express = require("express")

const { Mongoose } = require("mongoose")
const Honour = require("../models/honour")

const router = express.Router()

router.get("/s1", (req, res) => {
    res.render("s1.html")
})

router.get("/s2", (req, res) => {
    res.render("s2.html")
})
router.get("/s3", (req, res) => {
    res.render("s3.html")
})
router.get("/s3/:id", async(req, res) => {
    var id = req.params["id"];
    var result = await honour.findById(id)
        // var user = req.session.user
    res.render("/about/n1.html", { honour: result })
})
router.get("/about",(req,res)=>{
    
})
router.get("/s4", (req, res) => {
    res.render("s4.html")
})

// router.get("/about", (req, res) => {
//         res.render("about/n1.html")
//     })
// router.get("/about", (req, res) => {
//     res.render("about/n2.html")
// })

// router.get("/about", (req, res) => {
//     res.render("about/n3.html")
// })

// router.get("/about", (req, res) => {
//     res.render("about/n4.html")
// })

// router.get("/about", (req, res) => {
//     res.render("about/n5.html")
// })

// router.get("/about", (req, res) => {
//     res.render("about/n6.html")
// })

// router.get("/about", (req, res) => {
//     res.render("about/n7.html")
// })

// router.get("/about", (req, res) => {
//     res.render("about/n8.html")
// })

// router.get("/about", (req, res) => {
//     res.render("about/n9.html")
// })





module.exports = router