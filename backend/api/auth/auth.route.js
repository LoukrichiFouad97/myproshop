import express from "express";
import * as authController from "./auth.controller";
import { requireSignin } from "../../middlewares/auth.middleware";
export const authRoute = () => {
	const apiRoute = express.Router();

	apiRoute.route("/signin").post(authController.signin);
	apiRoute.route("/signout").get(requireSignin, authController.signout);
	apiRoute.route("/forgotpassword").post(authController.forgotPassword);
	apiRoute.route("/resetpassword").put(authController.resetPassword);

	return apiRoute;
};
