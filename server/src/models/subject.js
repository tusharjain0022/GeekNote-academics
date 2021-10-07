const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	branch: {
		type: String,
		required: true,
	},
	year: {
		type: String,
		required: true,
	},
	semester: {
		type: String,
		required: true,
	},
});

const Subject = new mongoose.model("Subject", subjectSchema);
module.exports = Subject;
