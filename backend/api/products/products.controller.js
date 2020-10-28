import asyncHandler from "express-async-handler";
import extend from "lodash/extend";

import { Product } from "./products.model";
import { HttpError } from "../../utils/httpError";

// @desc      Get all the products
// @route     GET /api/products
// @access    Public
export const getProducts = asyncHandler(async (req, res, next) => {
	const products = await Product.find({});

	res.status(200).json(products);
});

// @desc      Get a specific product by its ID
// @route     GET /api/products/:productId
// @access    Public
export const getProductById = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.productId);
	if (!product) return next(new HttpError("product not found", 404));

	res.status(200).json(product);
});

// @desc      Create a new Product
// @route     POST /api/products
// @access    Private/Admin
export const createProduct = asyncHandler(async (req, res, next) => {
	const product = new Product(req.body);
	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

// @desc      Update a product
// @route     PUT /api/products/:productId
// @access    Private/Admin
export const updateProduct = asyncHandler(async (req, res, next) => {
	let product = await Product.findById(req.params.productId);
	if (!product) return next(new HttpError("Product Not Found", 404));
	product = extend(product, req.body);

	res.status(200).json(product);
});

// @desc      Delete a product
// @route     DELETE /api/products/:productId
// @access    Private/Admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
	let product = await Product.findById(req.params.productId);
	if (!product) return next(new HttpError("Product not found", 404));
	product = product.remove();

	res.status(200).json({ message: "Product Removed!" });
});

// @desc      Get the top rated products
// @route     GET /api/products/top
// @access    Public
export const getTopProducts = asyncHandler(async (req, res, next) => {
	const topProducts = await Product.find({}).sort({ rating: "-1" }).limit(3);

	res.status(200).json(topProducts);
});

// @desc      Creates a product review
// @route     POST /api/products/:productId/review
// @access		Private
export const createProductReview = asyncHandler(async (req, res, next) => {});
