import express from "express";

import * as productCtlr from "./products.controller";
import { requireSignin, isAdmin } from "../../middlewares/auth.middleware";

// @route     /api/products
export const productsRoute = () => {
	const apiRoute = express.Router();

	apiRoute
		.route("/")
		.get(productCtlr.getProducts)
		.post(productCtlr.createProduct);

	apiRoute.route("/:productId/reviews").post(productCtlr.createProductReview);

	apiRoute.route("/top").get(productCtlr.getTopProducts);

	apiRoute
		.route("/:productId")
		.get(productCtlr.getProductById)
		.put(productCtlr.updateProduct)
		.delete(productCtlr.deleteProduct);

	return apiRoute;
};
