import asyncHandler from "express-async-handler";
import extend from "lodash";

import { Product } from "./products.model";
import { HttpError } from "../../utils/httpError";

// @desc      Get all the products
// @route     GET /api/v1/products
// @access    Public
export const getProducts = asyncHandler(async (req, res, next) => {
	const products = await Product.find();
	res.status(200).json({ products });
});

// @desc      Create a new Product
// @route     POST /api/v1/products
// @access    Private/Admin
export const createProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.create(req.body);
	if (!product) return next(new HttpError("can't create a product", 400));
	res.status(201).json({ product });
});

// @desc      Get a specific product
// @route     GET /api/v1/products/:productId
// @access    Public
export const getProduct = asyncHandler(async (req, res, next) => {
	res.status(200).json({ product: req.product });
});

// @desc      Update a product
// @route     PUT /api/v1/products/:productId
// @access    Private/Admin
export const updateProduct = asyncHandler(async (req, res, next) => {
	let product = req.product;
	product = extend(product, req.body);
	await product.save();
	res.status(200).json({ updatedProduct: product });
});

// @desc      Delete a product
// @route     DELETE /api/v1/products/:productId
// @access    Private/Admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
	const deletedProduct = await req.product.remove();
	res.status(200).json(deletedProduct);
});

// @desc      Get the top rated products
// @route     GET /api/v1/products/top
// @access    Public
export const getTopProducts = asyncHandler(async (req, res, next) => {
	const topProducts = await Product.find();
	if (!topProducts)
		return next(new HttpError("there is no top products yet", 404));
	res.status(200).json(topProducts);
});

// @desc      Get a singal product by its ID
// @route     GET /api/v1/products/:productId
// @access    Private
export const getProductById = asyncHandler(async (req, res, next) => {
	const productId = req.params.productId;
	const product = await Product.findById(productId);
	if (!product)
		return next(new HttpError(`Product with ID ${productId} not found`, 404));
	req.product = product;
	next();
});
