import { extend } from "lodash";

import { User } from "./user.model";

export const getAllUsersService = () => {
	return User.find();
};

export const createUserService = (user) => {
	return User.create(user);
};

export const updateUserService = (user, newUser) => {
	const _updatedUser = extend(user, newUser);
	_updatedUser.save();
	return _updatedUser;
};

export const deleteUserService = (user) => {
	return user.remove();
};

export const getUserByIdService = (userId) => {
	return User.findById(userId);
};
