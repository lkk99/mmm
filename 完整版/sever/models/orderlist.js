const mongoose = require('mongoose')

/* Schema: 表的描述 */
const Schema = mongoose.Schema
const OrderSchema = new Schema({
 
  // ordername:{
  //   type: String,
  //   require: false
  // },
  // orderphone:{
  //   type: Number,
  //   require: false
  // },
  // receivename:{
  //   type: String,
  //   require: false
  // },
  // receivephone:{
  //   type: Number,
  //   require: false
  // },
  // receiveaddr:{
  //   type: String,
  //   require: false
  // },
  // ordermsg:{
  //   type: String,
  //   require: false
  // },
  // cardmsg:{
  //   type: String,
  //   require: false
  // },
  // startTime:{
  //   type: String,
  //   require: false
  // },
  // endTime:{
  //   type: String,
  //   require: false
  // },
  // date:{
  //   type: String,
  //   require: false
  // },

  msg:{
    type: Object,
    require: true
  },
  list:{
    type: Object,
    require: true
  }
})

/* model 建模型 */
module.exports = mongoose.model('Orderlist', OrderSchema)