import express from "express";

import * as productCtlr from "./products.controller";
import { requireSignin, isAdmin } from "../../middlewares/auth.middleware";

export const productsRoute = () => {
	const apiRoute = express.Router();

	// @route     /api/v1/products/
	apiRoute
		.route("/")
		.get(productCtlr.getProducts)
		.post(requireSignin, isAdmin, productCtlr.createProduct);

	// @route     /api/v1/products/:productId
	apiRoute
		.route("/:productId")
		.get(productCtlr.getProduct)
		.put(requireSignin, isAdmin, productCtlr.updateProduct)
		.delete(requireSignin, isAdmin, productCtlr.deleteProduct);

	apiRoute.route("/top").get(productCtlr.getTopProducts);

	apiRoute.param("productId", productCtlr.getProductById);

	return apiRoute;
};
