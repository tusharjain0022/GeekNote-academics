const express = require("express");
require("./db/mongoose");
const branche = require("./models/branch");
const Subject = require("./models/subject");
const LearningLink = require("./models/learning_link");

const adminRouter = require("./routers/adminRouter");
const inviteLinkRouter = require("./routers/inviteLinkRouter");

const cors = require("cors");
const { mongoose } = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use("/", adminRouter);
app.use("/", inviteLinkRouter);

// for fethcing data of 8 (RESOURCES SECTION) cards in home page
// app.get("/", async (req, res) => {
//     try {
//         const getData = await branche.find({});
//         res.send(getData);
//     } catch (e) {
//         console.log("error during get request", e);
//         res.send(e);
//     }
// });

// app.post("/insertBranch", async (req, res) => {
//     try {
//         const branchData = new branche(req.body);
//         const addData = await branchData.save();
//         res.send(addData);
//     } catch (e) {
//         console.log("error during post request", e);
//         res.send(e);
//     }
// });

// CREATE: for creating Subjects in database
app.post("/:branch/:year/:semester", async (req, res) => {
	try {
		const subject = new Subject({
			name: req.body.name,
			branch: req.params.branch,
			year: req.params.year,
			semester: req.params.semester,
		});
		const insertedSub = await subject.save();
		res.status(200).send(insertedSub);
		console.log(insertedSub);
	} catch (e) {
		console.log("error during posting subject", e);
		res.status(500).send(e);
	}
});

// READ: for fetching data of subjects
app.get("/:branch/:year/:semester", async (req, res) => {
	const branch = req.params.branch;
	const year = req.params.year;
	const semester = req.params.semester;
	try {
		const subjects = await Subject.find({ branch, year, semester });
		res.status(200).send(subjects);
	} catch (e) {
		console.log("error during get request", e);
		res.send(e);
	}
});

// UPDATE
app.patch("/:id", async (req, res) => {
	try {
		const result = await Subject.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				name: req.body.name,
			}
		);
		res.status(200).send(result);
	} catch (e) {
		console.log("ERROR during updating subject ");
		res.status(500).send(e);
	}
});

// DELETE
app.delete("/:id", async (req, res) => {
	try {
		await Subject.findByIdAndDelete(req.params.id);
		await LearningLink.deleteMany({ subjectID: req.params.id });
		res.status(200).send();
	} catch (e) {
		console.log("ERROR during deleting subject ", e);
		res.status(500).send({ error: e.message });
	}
});

//////////////////////
//CREATE : individual topics
app.post("/learning-links", async (req, res) => {
	try {
		const learning_link = new LearningLink(req.body);
		const insertedLink = await learning_link.save();
		res.status(200).send(insertedLink);
	} catch (e) {
		console.log("error during posting subject", e);
		res.status(500).send(e);
	}
});

// READ
app.get("/learning-links/:id", async (req, res) => {
	const subjectID = req.params.id;
	try {
		const learningLinks = await LearningLink.find({ subjectID });
		res.status(200).send(learningLinks);
	} catch (e) {
		console.log("error during get request", e);
		res.send(e);
	}
});

// Update
app.patch("/learning-links/:id", async (req, res) => {
	try {
		const result = await LearningLink.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: req.body,
			},
			{
				new: true,
				useFindAndModify: false,
			}
		);
		res.send(result);
	} catch (e) {
		console.log("ERROR during Updating Topic ", e.message);
		res.status(500).send(e);
	}
});

//Delete
app.delete("/learning-links/:id", async (req, res) => {
	try {
		const deleteItem = await LearningLink.findByIdAndDelete(req.params.id);
		res.status(200).send(deleteItem);
	} catch (e) {
		console.log("ERROR during deleting Topic ", e.message);
		res.status(500).send(e);
	}
});

//////////////////////

app.listen(port, () => {
	console.log("Server is up and running on port :" + port);
});
