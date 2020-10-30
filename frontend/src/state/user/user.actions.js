import axios from "axios";

import * as userConst from "./user.constants";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: userConst.USER_LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			"/api/users/login",
			{
				email,
				password,
			},
			config
		);

		dispatch({ type: userConst.USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: userConst.USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: userConst.USER_REGISTER_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application-json",
			},
		};

		const { data } = await axios.post(
			"/api/users",
			{
				name,
				email,
				password,
			},
			config
		);

		dispatch({ type: userConst.USER_REGISTER_SUCCESS, payload: data });
		dispatch({ type: userConst.USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: userConst.USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	// localStorage.setItem("userInfo", "");
	dispatch({ type: userConst.USER_LOGOUT });
};

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: userConst.USER_DETAILS_REQUEST });

		// Get the logged in user in order to get his token
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/users/${id}`, config);

		dispatch({ type: userConst.USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: userConst.USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
