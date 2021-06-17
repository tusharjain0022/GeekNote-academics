const Admin = require("../models/admin");
const InviteLink = require("../models/inviteLink");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//Admin Registeration API
router.post("/register", async (req, res) => {
	const admin = new Admin(req.body.admin);
	const accessCode = req.body.inviteCode;
	try {
		if (admin.email !== process.env.PERM_ADMIN_EMAIL) {
			const inviteLink = await InviteLink.findOne({ accessCode });
			console.log(inviteLink, accessCode);
			if (!inviteLink) throw new Error("Invalid invite link!");
			admin.adminType = inviteLink.adminType;
			const token = await admin.generateAuthToken();
			await inviteLink.remove();
			res.status(201).send({ admin, token });
		} else if (admin.password !== process.env.PERM_ADMIN_PASSWORD)
			throw new Error("Try another email id");
		else {
			admin.adminType = "All Year";
			const token = await admin.generateAuthToken();
			res.status(201).send({ admin, token });
		}
	} catch (error) {
		console.log(error);
		if (error.code === 11000)
			res.status(500).send({
				message: "Someone is already registered with this email!",
			});
		res.status(500).send({ message: error.message });
	}
});

//Admin Login API
router.post("/login", async (req, res) => {
	try {
		const admin = await Admin.findByCredentials(req.body.email, req.body.password);
		const token = await admin.generateAuthToken();
		res.status(200).send({ admin, token });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

//Logout Admin
router.post("/logout", auth, async (req, res) => {
	try {
		req.admin.tokens = req.admin.tokens.filter((token) => token.token !== req.token);
		await req.admin.save();
		res.status(200).send("Logout Successfull");
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

//Logout all session
router.post("/logoutAll", auth, async (req, res) => {
	try {
		req.admin.tokens = [];
		await req.admin.save();
		res.status(200).send("Logout Succesfull from all sessions");
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

//get Login Admin details
router.get("/admins/me", auth, async (req, res) => {
	res.status(200).send(req.admin);
});

//All Admin Details API (OPEN)
router.get("/admins", async (req, res) => {
	try {
		const admins = await Admin.find({});
		res.status(200).send(admins);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

// Update : Updating Admin Details API
router.patch("/admins/me", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = [
		"name",
		"email",
		"password",
		"phone",
		"adminType",
		"completed",
		"intro",
		"linkedin",
		"github",
		"_id",
		"__v",
	];

	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
	if (!isValidOperation) return res.status(400).send({ message: "Invalid updates!" });
	try {
		updates.forEach((update) => {
			req.admin[update] = req.body[update];
		});
		await req.admin.save();
		res.status(200).send(req.admin);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

// Delete : Delete Admin
router.delete("/admins/me", auth, async (req, res) => {
	try {
		await req.admin.remove();
		res.status(200).send(req.admin);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

// Delete : Delete Admin by Id
router.delete("/admins", auth, async (req, res) => {
	try {
		if (req.admin.adminType !== "All Year") throw new Error("Access Denied !⛔");
		const admin = await Admin.findByIdAndDelete(req.query.id);

		res.status(200).send(admin);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});

module.exports = router;
