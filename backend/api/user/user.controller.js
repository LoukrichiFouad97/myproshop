/**
 * [1] get all the users
 * [2] get a singal user by email
 * [3] create a new user
 * [4] delete a user
 * [5] update a user
 * [6] get a singal user by id
 */

import asyncHandler from "express-async-handler";

export const getAllUsers = asyncHandler(async (req, res, next) => {
	res.status(200).send("user controller works good");
});
export const getUser = asyncHandler(async (req, res, next) => {
	res.status(200).send("user controller works good");
});
export const createUser = asyncHandler(async (req, res, next) => {
	res.status(200).send("user controller works good");
});
export const updateUser = asyncHandler(async (req, res, next) => {
	res.status(200).send("user controller works good");
});
export const deleteUser = asyncHandler(async (req, res, next) => {
	res.status(200).send("user controller works good");
});
export const getUserById = asyncHandler(async (req, res, next) => {
	res.status(200).send("user controller works good");
});
