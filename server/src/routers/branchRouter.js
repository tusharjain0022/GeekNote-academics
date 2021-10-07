const Branch = require("../models/branch");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// READ
// router.get("/", async (req, res) => {
// 	try {
// 		const branches = await Branch.find();
// 		res.send(branches).status(200);
// 	} catch (error) {
// 		res.send({ message: error.message });
// 	}
// });

// // CREATE
// router.post("/", auth, async (req, res) => {
// 	try {
// 		if (req.admin.adminType !== "All Year") throw new Error("Access Denied! ⛔");
// 		const branches = new Branch(req.body);
// 		await branches.save();
// 		res.send(branches).status(200);
// 	} catch (error) {
// 		if (error.code === 11000)
// 			res.status(500).send({
// 				message: "Branch already created!",
// 			});
// 		res.send({ message: error.message }).status(500);
// 	}
// });

// // UPDATE
// router.patch("/", auth, async (req, res) => {
// 	try {
// 		if (req.admin.adminType !== "All Year") throw new Error("Access Denied! ⛔");
// 	} catch (error) {
// 		res.status(500).send({ message: error.message });
// 	}
// });

module.exports = router;
