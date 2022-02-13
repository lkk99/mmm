// "code": 0,
// "title": "homeData",
// "data"

const mongoose = require("mongoose");

/* Schema: 表的描述 */
const Schema = mongoose.Schema;
const HomeSchema = new Schema({
	title: {
		type: String,
		require: true
	},
	data: {
		type: Array,
		require: true
	}
});

/* model 建模型 */
module.exports = mongoose.model("Home", HomeSchema);
