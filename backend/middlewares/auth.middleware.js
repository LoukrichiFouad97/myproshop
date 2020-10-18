/**
 * requireSignin
 * hasAuthorization
 * isAdmin
 */
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import { User } from "../api/user/user.model";
import { config } from "../config";
import { HttpError } from "../utils/httpError";

export const requireSignin = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[2];
		console.log(token);
		try {
			const decoded = jwt.verify(token, config.jwt.secret);
			req.user = await User.findById(decoded.id);
			next();
		} catch (err) {
			return next(new HttpError("token may be expired", 400));
		}
	}

	if (!token)
		return next(
			new HttpError("You must have a token to access this route", 401)
		);
});

export const isAdmin = (req, res, next) => {
	if (!req.user && !req.user.isAdmin) {
		return next(new HttpError("you must be admin to access this route", 403));
	}
	next();
};
