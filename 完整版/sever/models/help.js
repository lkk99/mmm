
const mongoose = require("mongoose");

/* Schema: 表的描述 */
const Schema = mongoose.Schema;
const HelpSchema = new Schema({
	title: {
		type: String,
		require: true
	},
	navItem: {
		type: Array,
		require: true
	}
});

/* model 建模型 */
module.exports = mongoose.model("Help", HelpSchema);
