import express from "express";

import { routesLoader } from "./routes.loader";
import { expressLoader } from "./express.loader";
import { mongooseLoader } from "./mongoose.loader";
import { securityLoader } from "./security.loader";

export const loaders = () => {
	const app = express();
	routesLoader(app);
	expressLoader();
	mongooseLoader();
	securityLoader();
};
