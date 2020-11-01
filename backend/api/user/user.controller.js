import asyncHandler from "express-async-handler";
import { extend, pick } from "lodash";
import { getJwtToken } from "../../utils/getJwtToken";

import { HttpError } from "../../utils/httpError";
import { User } from "./user.model";

// @desc 		Get all the users from database
// @route 	GET /api/v1/users
// @access	Private/Admin
export const getAllUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find();
	res.status(200).json(users);
});

// @desc 		Authenticate user and get token
// @route 	POST /api/v1/users/login
// @access	Public
export const authUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	let user = await User.findOne({ email });

	if (!user && (await user.matchPassword(password))) {
		return next(new HttpError(`invalid user data`, 400));
	}

	user = pick(user, ["_id", "name", "email", "isAdmin"]);

	res.status(201).json({ ...user, token: getJwtToken(user._id) });
});

// @desc 		Inserts a new user into database
// @route 	POST /api/v1/users
// @access	Public
export const createUser = asyncHandler(async (req, res, next) => {
	const userExists = await User.findOne({ email: req.body.email });
	if (userExists) return next(new HttpError("User already exists", 400));

	let user = await User.create(req.body);
	user = pick(user, ["_id", "name", "email", "isAdmin"]);

	res.status(201).json({ ...user, token: getJwtToken(user._id) });
});

// @desc 		Get a user By its id
// @route 	GET /api/v1/users/:userId
// @access	Private/Admin
export const getUserById = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.userId);
	if (!user) return next(new HttpError("User not found", 404));

	res.status(200).json(user);
});

// @desc 		Updates a user in database
// @route 	PUT /api/v1/users/:userId
// @access	Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {
	let user = await User.findById(req.params.userId);
	if (!user) return next(new HttpError("User not found", 404));

	user = extend(user, req.body);
	await user.save();

	res.status(200).json(user);
});

// @desc 		Removes a user from database
// @route 	DELETE /api/v1/users/:userId
// @access	Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
	let user = await User.findById(req.params.userId);
	if (!user) return next(new HttpError("User not found", 404));

	user = user.remove();

	res.status(200).json({ message: "User removed!" });
});

// @desc 		Get a user profile from database
// @route 	GET /api/v1/users/profile
// @access	Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
	let user = await User.findById(req.user._id);
	if (!user) return next(new HttpError("user not found", 404));

	user = pick(user, ["_id", "name", "email", "isAdmin"]);
	res.status(200).json(user);
});

// @desc 		Updates a user profile
// @route 	PUT /api/v1/users/profile
// @access	Private
export const updateUserProfile = asyncHandler(async (req, res, next) => {
	const profileId = req.user._id;
	let user = await User.findById(profileId);
	if (!user) return next(new HttpError(`${profileId} not found`, 404));

	user.name = req.body.name || user.name;
	user.email = req.body.email || user.email;

	if (req.body.password) {
		user.password = req.body.password;
	}

	const updatedUser = await user.save();

	res.json({
		_id: updatedUser._id,
		name: updatedUser.name,
		email: updatedUser.email,
		isAdmin: updatedUser.isAdmin,
		token: getJwtToken(updatedUser._id),
	});

	// profile = extend(profile, req.body);
	// const updatedProfile = await profile.save();

	res.status(200).json(updatedProfile);
});
