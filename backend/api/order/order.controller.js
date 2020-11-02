import asyncHandler from "express-async-handler";
import extend from "lodash/extend";

import { Order } from "./order.model";

// @desc			 Create new Order
// @route      Get /api/orders
// @access		 Private
export const addOrderItems = asyncHandler(async (req, res, next) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		return next(new HttpError("There is no orders", 404));
	}

	const order = Order.create({
		orderItems,
		user: req.user._id,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	});

	const createdOrder = await order.save();
	res.status(201).json(createdOrder);
});

export const getOrders = asyncHandler(async (req, res, next) => {
	res.send("getOrders works well ");
});

export const getMyOrders = asyncHandler(async (req, res, next) => {
	res.send("getMyOrders works well ");
});

export const getOrderById = asyncHandler(async (req, res, next) => {
	res.send("getOrderById works well ");
});

export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
	res.send("updateOrderToPaid works well ");
});

export const updateOrderToDeliver = asyncHandler(async (req, res, next) => {
	res.send("updateOrderToDeliver works well ");
});
