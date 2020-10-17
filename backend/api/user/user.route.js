import express from "express";

import * as userController from "./user.controller";
import { requireSignin } from "../../middlewares/auth.middleware";

export const userRoute = () => {
	const apiRoute = express.Router();

	// @route		/api/v1/users
	apiRoute
		.route("/")
		.get(userController.getAllUsers)
		.post(userController.createUser);

	// @desc 		Require signin to all the below routes
	apiRoute.use(requireSignin);

	// @route		/api/v1/users/:userId
	apiRoute
		.route("/:userId")
		.get(userController.getUser)
		.put(userController.updateUser)
		.delete(userController.deleteUser);

	apiRoute.param("userId", userController.getUserById);

	return apiRoute;
};
