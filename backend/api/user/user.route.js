import express from "express";

import * as userCtlr from "./user.controller";
import { requireSignin, isAdmin } from "../../middlewares/auth.middleware";

// @route		/api/users
export const userRoute = () => {
	const apiRoute = express.Router();

	apiRoute
		.route("/")
		.get(requireSignin, isAdmin, userCtlr.getAllUsers)
		.post(userCtlr.createUser);

	apiRoute.route("/login").post(userCtlr.authUser);

	apiRoute
		.route("/profile")
		.get(requireSignin, userCtlr.getUserProfile)
		.put(requireSignin, userCtlr.updateUserProfile);

	apiRoute
		.route("/:userId")
		.get(requireSignin, isAdmin, userCtlr.getUserById)
		.put(requireSignin, isAdmin, userCtlr.updateUser)
		.delete(requireSignin, isAdmin, userCtlr.deleteUser);

	return apiRoute;
};
