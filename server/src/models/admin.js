const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) throw new Error("Invalid email !");
		},
	},
	password: {
		type: String,
		required: true,
		minLength: [6, "Too short password !"],
	},
	phone: {
		type: String,
		default: undefined,
		validate(value) {
			if (!validator.isMobilePhone(value)) throw new Error("Invalid Phone Number !");
		},
	},
	adminType: {
		type: String,
		required: true,
		validate(value) {
			if (
				!validator.isIn(value, [
					"All Year",
					"First Year CSE",
					"First Year ECE",
					"Second Year CSE",
					"Second Year ECE",
					"Third Year CSE",
					"Third Year ECE",
					"Fourth Year CSE",
					"Fourth Year ECE",
				])
			)
				throw new Error("Invaid Admin Type !");
		},
	},
	completed: {
		type: Boolean,
		default: false,
	},
	intro: {
		type: String,
		default: undefined,
	},
	linkedin: {
		type: String,
		default: undefined,
		validate(value) {
			if (!validator.isURL(value)) throw new Error("invalid URL");
		},
	},
	github: {
		type: String,
		default: undefined,
		validate(value) {
			if (!validator.isURL(value)) throw new Error("invalid URL");
		},
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

adminSchema.methods.toJSON = function () {
	const admin = this;
	const adminObject = admin.toObject();

	delete adminObject.password;
	delete adminObject.tokens;

	return adminObject;
};

adminSchema.methods.generateAuthToken = async function () {
	const admin = this;
	const token = jwt.sign({ _id: admin._id.toString() }, "secretplaceholder");
	admin.tokens = admin.tokens.concat({ token });
	await admin.save();
	return token;
};

adminSchema.statics.findByCredentials = async (email, password) => {
	const admin = await Admin.findOne({ email });
	if (!admin) {
		throw new Error("Incorrect email id or password !");
	}
	const isMatch = await bcrypt.compare(password, admin.password);
	if (!isMatch) throw new Error("Incorrect email id or password !");
	return admin;
};

adminSchema.pre("save", async function (next) {
	const admin = this;
	if (admin.isModified("password")) {
		admin.password = await bcrypt.hash(admin.password, 8);
	}
	next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
