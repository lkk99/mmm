const mongoose = require('mongoose')

/* Schema: 表的描述 */
const Schema = mongoose.Schema
const OrderSchema = new Schema({
  outTradeNo: {
    type: Number,
    unique: true,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  payurl: {
    type: String,
    require: true
  },
  beizhu:{
    type: Array,
    require: true
  },
  state:{
    type: Boolean,
    require: true
  },
  time:{
    type: String,
    require: true
  },
  list:{
    type:Object,
    require:true
  }
})

/* model 建模型 */
module.exports = mongoose.model('Order', OrderSchema)