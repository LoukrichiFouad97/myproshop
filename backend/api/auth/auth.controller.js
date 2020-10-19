import asyncHandler from "express-async-handler";

import { User } from "../user/user.model";
import { HttpError } from "../../utils/httpError";
import { getJwtToken } from "../../utils/getJwtToken";
import { config } from "../../config";

export const signin = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) return next(new HttpError(`${email} is not registered`, 404));

	const isMatched = await user.matchPassword(password);
	if (!isMatched) return next("wrong password", 401);

	_sendTokenResponse(user, 200, res);
});

export const signout = asyncHandler(async (req, res, next) => {
	res.clearCookie("t");
	res.status(200).json({
		success: true,
		msg: "user signed out!",
	});
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
	res.send("forgotPassword works");
});

export const resetPassword = asyncHandler(async (req, res, next) => {
	res.send("resetPassword works");
});

const _sendTokenResponse = (user, statusCode, res) => {
	const token = getJwtToken(user);

	const options = {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
		httpOnly: true,
	};

	if (config.env === "prod") {
		options.secure = true;
	}

	res.status(statusCode).cookie("t", token, options).json({
		token,
	});
};
