import { authRoute } from "../api/auth/auth.route";
import { userRoute } from "../api/user/user.route";

export const routesLoader = (app) => {
	app.use("/api/v1/users", userRoute());
	app.use("/api/v1/auth", authRoute());
};
