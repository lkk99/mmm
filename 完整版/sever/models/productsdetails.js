const mongoose = require('mongoose')

/* Schema: 表的描述 */
const Schema = mongoose.Schema
const ProductsSchema = new Schema({
    name:{
        type: String,
            require: true
    },
    productdetails:[{
        img: {
            type: String,
            require: true
        }
    }
    ]
   

})

/* model 建模型 */
module.exports = mongoose.model('Products', ProductsSchema)