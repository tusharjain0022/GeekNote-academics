const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
	totalSub: {
		type: Number,
		required: true,
	},
	timetable: {
		type: String,
		required: true,
	},
	intro: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
});

const branchSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	intro: {
		type: String,
		required: true,
	},
	springSemester: {
		type: semesterSchema,
	},
	autumnSemester: {
		type: semesterSchema,
	},
});

const branch = new mongoose.model("branch", branchSchema);
module.exports = branch;
