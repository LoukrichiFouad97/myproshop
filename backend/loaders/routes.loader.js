import { authRoute } from "../api/auth/auth.route";
import { userRoute } from "../api/user/user.route";
import { productsRoute } from "../api/products/products.route";
import { orderRoute } from "../api/order/order.route";

export const routesLoader = (app) => {
	app.use("/api/users", userRoute());
	app.use("/api/auth", authRoute());
	app.use("/api/products", productsRoute());
	app.use("/api/orders", orderRoute());
};
