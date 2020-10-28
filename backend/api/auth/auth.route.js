import express from "express";

import * as authCtlr from "./auth.controller";
import { requireSignin } from "../../middlewares/auth.middleware";

// @rout      /api/v1/auth
export const authRoute = () => {
	const apiRoute = express.Router();

	return apiRoute;
};
