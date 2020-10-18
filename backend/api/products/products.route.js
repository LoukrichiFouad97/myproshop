import express from "express";
import * as productController from "./products.controller";

export const productsRoute = () => {
	const apiRoute = express.Router();

	apiRoute
		.route("/")
		.get(productController.getProducts)
		.post(productController.createProduct);

	apiRoute
		.route("/:productId")
		.get(productController.getProduct)
		.put(productController.updateProduct)
		.delete(productController.deleteProduct);

	apiRoute.route("/top").get(productController.getTopProducts);

	apiRoute.param("productId", productController.getProductById);

	return apiRoute;
};
