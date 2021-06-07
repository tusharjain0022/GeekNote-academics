const mongoose = require("mongoose");
const validator = require("validator");

const inviteLinkSchema = mongoose.Schema({
    accessCode: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
        required: true,
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
});

// adminSchema.methods.toJSON = function () {
//     const admin = this;
//     const adminObject = admin.toObject();

//     delete adminObject.password;
//     delete adminObject.tokens;

//     return adminObject;
// };

// adminSchema.methods.generateAuthToken = async function () {
//     const admin = this;
//     const token = jwt.sign({ _id: admin._id.toString() }, "secretplaceholder");
//     admin.tokens = admin.tokens.concat({ token });
//     await admin.save();
//     return token;
// };

// adminSchema.statics.findByCredentials = async (email, password) => {
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//         throw new Error("Unable to Login !");
//     }
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) throw new Error("Unable to Login !");
//     return admin;
// };

// adminSchema.pre("save", async function (next) {
//     const admin = this;
//     if (admin.isModified("password")) {
//         admin.password = await bcrypt.hash(admin.password, 8);
//     }
//     next();
// });

const InviteLink = mongoose.model("InviteLink", inviteLinkSchema);

module.exports = InviteLink;
