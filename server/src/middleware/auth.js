const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = await jwt.verify(token, "secretplaceholder");
        const admin = await Admin.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });
        if (!admin) {
            throw new Error("Authentication failed! Login Again");
        }
        req.admin = admin;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ message: "Please authenticate" });
    }
};

module.exports = auth;
