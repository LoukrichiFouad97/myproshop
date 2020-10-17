import { routesLoader } from "./routes.loader";
import { expressLoader } from "./express.loader";
import { mongooseLoader } from "./mongoose.loader";
import { securityLoader } from "./security.loader";
import { productionLoader } from "./production.loader";

export const loaders = (app) => {
	expressLoader(app);
	mongooseLoader();
	routesLoader(app);
	if (process.env.NODE_ENV === "prod") {
		securityLoader(app);
		productionLoader(app);
	}
};
