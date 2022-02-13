const mongoose = require('mongoose')

const Schema = mongoose.Schema
const CategoryScheme = new Schema({
    title: {
        type: String,
        require: true
    },
    icon: {
        type: String,
        require: true
    },
    types: {
        type: Array,
        require: true
    },

})

module.exports = mongoose.model('Category', CategoryScheme)