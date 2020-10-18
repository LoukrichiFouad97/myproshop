import express from "express";

import * as userController from "./user.controller";
import { requireSignin, isAdmin } from "../../middlewares/auth.middleware";

export const userRoute = () => {
	const apiRoute = express.Router();

	// @route		/api/v1/users
	apiRoute
		.route("/")
		.get(requireSignin, isAdmin, userController.getAllUsers)
		.post(userController.createUser);

	// @route 	/api/v1/users/profile
	apiRoute
		.route("/profile")
		.get(requireSignin, userController.getUserProfile)
		.put(requireSignin, userController.updateUserProfile);

	// @route		/api/v1/users/:userId
	apiRoute
		.route("/:userId")
		.get(requireSignin, isAdmin, userController.getUser)
		.put(requireSignin, isAdmin, userController.updateUser)
		.delete(requireSignin, isAdmin, userController.deleteUser);

	apiRoute.param("userId", userController.getUserById);

	return apiRoute;
};
