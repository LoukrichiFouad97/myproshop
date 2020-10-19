import express from "express";

import * as orderCtrl from "./order.controller";
import { requireSignin, isAdmin } from "../../middlewares/auth.middleware";

// @route     /api/v1/orders
export const orderRoute = () => {
	const apiRoute = express.Router();

	apiRoute.use(requireSignin);

	apiRoute
		.route("/")
		.get(orderCtrl.getOrders)
		.post(isAdmin, orderCtrl.addOrderItems);

	apiRoute.route("/myorders").get(orderCtrl.getMyOrders);

	apiRoute.route("/:orderId").get(orderCtrl.getOrderById);

	apiRoute.route("/:orderId/pay").put(orderCtrl.updateOrderToPaid);

	apiRoute
		.route("/:orderId/deliver")
		.put(isAdmin, orderCtrl.updateOrderToDeliver);

	return apiRoute;
};
