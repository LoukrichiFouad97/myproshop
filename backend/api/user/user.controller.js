import asyncHandler from "express-async-handler";

import { HttpError } from "../../utils/httpError";
import * as userService from "./user.service";

export const getAllUsers = asyncHandler(async (req, res, next) => {
	const users = await userService.getAllUsersService();
	_sendHttpResponse(users, 200, res);
});

export const getUser = asyncHandler(async (req, res, next) => {
	const user = req.user;
	_sendHttpResponse(user, 200, res);
});

export const createUser = asyncHandler(async (req, res, next) => {
	const user = await userService.createUserService(req.body);
	_handleHttpErrors(user, "can't create user", 400, next);
	_sendHttpResponse(user, 201, res);
});

export const updateUser = asyncHandler(async (req, res, next) => {
	const updatedUser = await userService.updateUserService(req.user, req.body);
	_handleHttpErrors(updatedUser, "can't update user", 400, next);
	_sendHttpResponse(updatedUser, 200, res);
});

export const deleteUser = asyncHandler(async (req, res, next) => {
	const deletedUser = await userService.deleteUserService(req.user);
	_handleHttpErrors(deletedUser, "can't delete user", 400, next);
	_sendHttpResponse(deleteUser, 200, res);
});

export const getUserById = asyncHandler(async (req, res, next, userId) => {
	const user = await userService.getUserByIdService(userId);
	_handleHttpErrors(user, `User with ID ${userId}`, 400, next);
	req.user = user;
	next();
});

const _sendHttpResponse = (message, statusCode, res) => {
	res.status(statusCode).json({
		data: message,
	});
};

const _handleHttpErrors = (result, message, statusCode, next) => {
	if (!result) {
		return next(new HttpError(message, statusCode));
	}
};
