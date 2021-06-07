const InviteLink = require("../models/inviteLink");
const express = require("express");
const { v1: uuidv1 } = require("uuid");
const router = express.Router();
const auth = require("../middleware/auth");

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
