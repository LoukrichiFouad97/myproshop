import asyncHandler from "express-async-handler";
import extend from "lodash/extend";

import { HttpError } from "../../utils/httpError";
import { User } from "./user.model";

// @desc 		Get all the users from database
// @route 	GET /api/v1/users
// @access	Private/Admin
export const getAllUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find();
	res.status(200).json(users);
});

// @desc 		Inserts a new user into database
// @route 	POST /api/v1/users
// @access	Public
export const createUser = asyncHandler(async (req, res, next) => {
	const userIsExist = await User.findOne({ email: req.body.email });
	if (userIsExist)
		return next(new HttpError(`${req.body.email} is already registered`, 401));

	const user = await User.create(req.body);
	if (!user) return next(new HttpError("can't create a new user", 400));

	res.status(201).json({ newUser: user });
});

// @desc 		Get a user from database
// @route 	GET /api/v1/users/:userId
// @access	Private/Admin
export const getUser = asyncHandler(async (req, res, next) => {
	const user = req.user;
	res.status(200).json(user);
});

// @desc 		Updates a user in database
// @route 	PUT /api/v1/users/:userId
// @access	Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {
	let updatedUser = req.user;
	updatedUser = extend(updatedUser, req.body);
	await updatedUser.save();
	res.status(200).json(updatedUser);
});

// @desc 		Removes a user from database
// @route 	DELETE /api/v1/users/:userId
// @access	Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
	const deletedUser = await req.user.remove();
	res.status(200).json(deletedUser);
});

// @desc 		Get a user profile from database
// @route 	GET /api/v1/users/profile
// @access	Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user) return next(new HttpError(`Profile not found`, 404));
	res.status(200).json(user);
});

// @desc 		Updates a user profile
// @route 	PUT /api/v1/users/profile
// @access	Private
export const updateUserProfile = asyncHandler(async (req, res, next) => {
	const profileId = req.user._id;
	let profile = await User.findById(profileId);
	if (!profile) return next(new HttpError(`${profileId} not found`, 404));

	profile = extend(profile, req.body);
	const updatedProfile = await profile.save({ validateBeforeSave: false });

	res.status(200).json(updatedProfile);
});

// @desc 		Get a user from database
// @route 	/api/v1/users/:userId
// @access	Private
export const getUserById = asyncHandler(async (req, res, next, userId) => {
	const user = await User.findById(userId);
	if (!user)
		return next(new HttpError(`user with ID ${userId} not found`, 404));
	req.user = user;
	next();
});
