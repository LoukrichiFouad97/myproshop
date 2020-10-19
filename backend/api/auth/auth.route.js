import express from "express";

import * as authCtlr from "./auth.controller";
import { requireSignin } from "../../middlewares/auth.middleware";

// @rout      /api/v1/auth
export const authRoute = () => {
	const apiRoute = express.Router();

	apiRoute.route("/signin").post(authCtlr.signin);
	apiRoute.route("/signout").get(requireSignin, authCtlr.signout);
	apiRoute.route("/forgotpassword").post(authCtlr.forgotPassword);
	apiRoute.route("/resetpassword").put(authCtlr.resetPassword);

	return apiRoute;
};
