import { extend } from "lodash";

import { User } from "./user.model";

export const getAllUsersService = () => {
	return User.find();
};

export const createUserService = (user) => {
	const _createdUser = User.create(user);
	return _createdUser;
};

export const updateUserService = (user, newUser) => {
	const _updatedUser = extend(user, newUser);
	_updatedUser.save();
	return _updatedUser;
};

export const deleteUserService = (user) => {
	const _deletedUser = user.remove();
	return _deletedUser;
};

export const getUserByIdService = (userId) => {
	const _userById = User.findById(userId);
	return _userById;
};
