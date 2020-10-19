import asyncHandler from "express-async-handler";

export const addOrderItems = asyncHandler(async (req, res, next) => {
	res.send("addOrderItems works well ");
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
