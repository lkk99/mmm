const mongoose = require('mongoose')

/* Schema: 表的描述 */
const Schema = mongoose.Schema
const CartSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true
  },
  old_price: {
    type: Number,
    require: true
  },
  new_price: {
    type: Number,
    require: true
  },
  count:{
    type: Number,
    require: true
  },
  image:{
    type: String,
    require: true
  }
})

/* model 建模型 */
module.exports = mongoose.model('Cart', CartSchema)