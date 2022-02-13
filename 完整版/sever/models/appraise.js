const mongoose = require('mongoose')

/* Schema: 表的描述 */
const Schema = mongoose.Schema
const AppraiseSchema = new Schema({
        username: {
            type: String,
            require: true
        },
        text: {
            type: String,
            require: true
        },
        img: {
            type: String,
            require: true
        }
})

/* model 建模型 */
module.exports = mongoose.model('Appraise', AppraiseSchema)