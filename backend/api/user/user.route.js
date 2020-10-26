import express from "express";

import * as userCtlr from "./user.controller";
import { requireSignin, isAdmin } from "../../middlewares/auth.middleware";

// @route		/api/v1/users
export const userRoute = () => {
	const apiRoute = express.Router();

	apiRoute
		.route("/")
		.get(requireSignin, isAdmin, userCtlr.getAllUsers)
		.post(userCtlr.createUser);

	apiRoute.use(requireSignin);
	apiRoute
		.route("/profile")
		.get(userCtlr.getUserProfile)
		.put(userCtlr.updateUserProfile);

	apiRoute.use(isAdmin);
	apiRoute
		.route("/:userId")
		.get(userCtlr.getUser)
		.put(userCtlr.updateUser)
		.delete(userCtlr.deleteUser);

	apiRoute.param("userId", userCtlr.getUserById);

	return apiRoute;
};
