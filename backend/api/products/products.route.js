import express from "express";

import * as productCtlr from "./products.controller";
import { requireSignin, isAdmin } from "../../middlewares/auth.middleware";

// @route     /api/v1/products
export const productsRoute = () => {
	const apiRoute = express.Router();

	apiRoute
		.route("/")
		.get(productCtlr.getProducts)
		.post(requireSignin, isAdmin, productCtlr.createProduct);

	apiRoute.route("/top").get(productCtlr.getTopProducts);

	apiRoute
		.route("/:productId")
		.get(productCtlr.getProduct)
		.put(requireSignin, isAdmin, productCtlr.updateProduct)
		.delete(requireSignin, isAdmin, productCtlr.deleteProduct);

	apiRoute
		.route("/:productId/reviews")
		.post(requireSignin, productCtlr.createProductReview);

	apiRoute.param("productId", productCtlr.getProductById);

	return apiRoute;
};
