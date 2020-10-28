import express from "express";

import * as userCtlr from "./user.controller";
import { requireSignin, isAdmin } from "../../middlewares/auth.middleware";

// @route		/api/v1/users
export const userRoute = () => {
	const apiRoute = express.Router();

	apiRoute.route("/").get(userCtlr.getAllUsers).post(userCtlr.createUser);

	apiRoute.route("/login").post(userCtlr.authUser);

	apiRoute
		.route("/profile")
		.get(userCtlr.getUserProfile)
		.put(userCtlr.updateUserProfile);

	apiRoute
		.route("/:userId")
		.get(userCtlr.getUserById)
		.put(userCtlr.updateUser)
		.delete(userCtlr.deleteUser);

	return apiRoute;
};
