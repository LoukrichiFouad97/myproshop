import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "name is required"],
		trim: true,
		lowercase: true,
		minlength: 5,
		maxlength: 25,
	},
	email: {
		type: String,
		required: [true, "email is required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "password is required"],
		minlength: 5,
		maxlength: 25,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

// Encrypt password before save
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Match password
UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", UserSchema);
