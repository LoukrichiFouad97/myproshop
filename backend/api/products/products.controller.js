import asyncHandler from "express-async-handler";
import _ from "lodash";

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
	let updatedProduct = req.body;
	updatedProduct = _.extend(req.product, req.body);
	await updatedProduct.save();
	res.status(200).json({ updatedProduct });
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
	const topProducts = await Product.find().sort("rating").limit(3);
	res.status(200).json(topProducts);
});

// @desc      Creates a product review
// @route     POST /api/v1/products/:productId/review
// @access		Private
export const createProductReview = asyncHandler(async (req, res, next) => {
	const product = req.product;

	const alreadyReviewed = product.reviews.find(
		(review) => review.user.toString() === req.user._id.toString()
	);

	if (alreadyReviewed)
		return next(
			new HttpError(
				`Product ${product.name} is already reviewed by ${req.user.name}`
			)
		);

	const review = {
		name: req.user.name,
		rating: req.body.rating,
		comment: req.body.comment,
		user: req.user._id,
	};

	product.reviews.push(review);

	product.numReviews = product.reviews.length;
	product.rating = product.reviews.reduce((acc, item) => {
		return (item.rating + acc) / product.reviews.length;
	}, 0);

	await product.save();
	res.status(201).json(review);
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
