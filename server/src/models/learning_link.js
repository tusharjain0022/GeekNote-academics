const mongoose = require("mongoose");

const learning_link_schema = new mongoose.Schema({
	subjectID: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
	note: {
		type: Boolean,
		required: true,
	},
	video: {
		type: Boolean,
		required: true,
	},
});

const LearningLink = new mongoose.model("LearningLink", learning_link_schema);
module.exports = LearningLink;
