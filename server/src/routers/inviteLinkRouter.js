const InviteLink = require("../models/inviteLink");
const express = require("express");
const { v1: uuidv1 } = require("uuid");
const router = express.Router();
const auth = require("../middleware/auth");

//Get Invite link
router.get("/invite", auth, async (req, res) => {
	try {
		const limit = parseInt(req.query.limit);
		const inviteLink = await InviteLink.find({ addedBy: req.admin._id }).limit(limit);
		if (Object.keys(inviteLink).length === 0)
			return res.status(404).send({ message: "Generate a new invite link" });
		res.status(200).send(inviteLink);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

//Create Invite Link
router.post("/invite", auth, async (req, res) => {
	try {
		const accessCode = await uuidv1();
		if (req.admin.adminType !== "All Year") adminType = req.admin.adminType;
		else adminType = req.body.adminType;
		const inviteLink = new InviteLink({
			accessCode,
			addedBy: req.admin._id,
			adminType,
		});
		await inviteLink.save();
		res.status(200).send(inviteLink);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
