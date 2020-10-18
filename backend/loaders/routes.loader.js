import { authRoute } from "../api/auth/auth.route";
import { userRoute } from "../api/user/user.route";
import { productsRoute } from "../api/products/products.route";

export const routesLoader = (app) => {
	app.use("/api/v1/users", userRoute());
	app.use("/api/v1/auth", authRoute());
	app.use("/api/v1/products", productsRoute());
};
