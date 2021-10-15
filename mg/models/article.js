const mongoose = require("mongoose")

var articleSheme = new mongoose.Schema({
    forum: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, "标题不能为空"]
    },
    content: {
        type: String,
        required: [true, "内容不能为空"]
    },
    user_id: {
        type: String
    },
    icon: {
        type: String
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
})
var Article = mongoose.model("Article", articleSheme)
module.exports = Article