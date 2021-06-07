const Admin = require("../models/admin");
const InviteLink = require("../models/inviteLink");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//Admin Registeration API
router.post("/register", async (req, res) => {
    const admin = new Admin(req.body.admin);
    const accessCode = req.body.accessCode;
    try {
        const inviteLink = await InviteLink.findOne({ accessCode });
        if (!inviteLink) throw new Error("invalid invite link!");
        admin.adminType = inviteLink.adminType;
        await inviteLink.remove();
        const token = await admin.generateAuthToken();
        res.status(201).send({ admin, token });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//Admin Login API
router.post("/login", async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(
            req.body.email,
            req.body.password
        );

        const token = await admin.generateAuthToken();
        res.status(200).send({ admin, token });
    } catch (error) {
        res.status(500).send({ error: "Unable to Login" });
    }
});

//Logout Admin
router.post("/logout", auth, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter(
            (token) => token.token !== req.token
        );
        await req.admin.save();
        res.status(200).send("Logout Successfull");
    } catch (error) {
        res.status(500).send(error);
    }
});

//Logout all session
router.post("/logoutAll", auth, async (req, res) => {
    try {
        req.admin.tokens = [];
        await req.admin.save();
        res.status(200).send("Logout Succesfull from all sessions");
    } catch (error) {
        res.status(500).send(error);
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
        res.status(500).send(error);
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
    ];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidOperation)
        return res.status(400).send("Error: Invalid updates!");
    try {
        updates.forEach((update) => {
            req.admin[update] = req.body[update];
        });
        await req.admin.save();
        res.status(200).send(req.admin);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete : Delete Admin
router.delete("/admins/me", auth, async (req, res) => {
    try {
        await req.admin.remove();
        res.status(200).send(req.admin);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
