const mongoose = require('mongoose')

/* Schema: 表的描述 */
const Schema = mongoose.Schema
const FlowerSchema = new Schema({
    type:{
        type: String,
            require: true
    },
    content:[{
   
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
        }
    }
    ]
   

})

/* model 建模型 */
module.exports = mongoose.model('Flower', FlowerSchema)