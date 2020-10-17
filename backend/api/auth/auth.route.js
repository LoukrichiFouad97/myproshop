import express from "express";
import * as authController from "./auth.controller";
import { requireSignin } from "../../middlewares/auth.middleware";
export const authRoute = () => {
	const apiRoute = express.Router();

	apiRoute.route("/signin").post(authController.signin);
	apiRoute.route("/forgotpassword").post(authController.forgotPassword);
	apiRoute.route("/resetpassword").put(authController.resetPassword);
	apiRoute.use(requireSignin);
	apiRoute.route("/signout").get(authController.signout);
	apiRoute.route("/profile").get(authController.getProfile);

	return apiRoute;
};
