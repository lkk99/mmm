const mongoose = require('mongoose')

/* Schema: 表的描述 */
const Schema = mongoose.Schema
const DetailSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    sales: {
        type: Number,
        require: true
    },
    material: {
        type: String,
        require: true
    },
    package: {
        type: String,
        require: true
    },
    attach: {
        type: String,
        require: true
    },
    distribution: {
        type: String,
        require: true
    },
    youhui: {
        type: String,
        require: true
    },
    current_price: {
        type: Number,
        require: true
    },
    incomePayType:{
        type:Number,
        require:true
    }
})

/* model 建模型 */
module.exports = mongoose.model('Detail', DetailSchema)