import express from "express";

import * as userCtlr from "./user.controller";
import { requireSignin, isAdmin } from "../../middlewares/auth.middleware";

export const userRoute = () => {
	const apiRoute = express.Router();

	// @route		/api/v1/users
	apiRoute
		.route("/")
		.get(requireSignin, isAdmin, userCtlr.getAllUsers)
		.post(userCtlr.createUser);

	// @route 	/api/v1/users/profile
	apiRoute
		.route("/profile")
		.get(requireSignin, userCtlr.getUserProfile)
		.put(requireSignin, userCtlr.updateUserProfile);

	// @route		/api/v1/users/:userId
	apiRoute
		.route("/:userId")
		.get(requireSignin, isAdmin, userCtlr.getUser)
		.put(requireSignin, isAdmin, userCtlr.updateUser)
		.delete(requireSignin, isAdmin, userCtlr.deleteUser);

	apiRoute.param("userId", userCtlr.getUserById);

	return apiRoute;
};
