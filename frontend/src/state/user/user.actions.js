import axios from "axios";

import * as userConst from "./user.constants";

export const signin = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: userConst.USER_SIGNIN_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			"/api/v1/auth/signin",
			{
				email,
				password,
			},
			config
		);

		dispatch({ type: userConst.USER_SIGNIN_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: userConst.USER_SIGNIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const signup = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: userConst.USER_SIGNUP_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application-json",
			},
		};

		const { data } = await axios.post(
			"/api/v1/users",
			{
				name,
				email,
				password,
			},
			config
		);

		dispatch({ type: userConst.USER_SIGNUP_SUCCESS, payload: data });
		dispatch({ type: userConst.USER_SIGNIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: userConst.USER_SIGNUP_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const signout = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	localStorage.setItem("userInfo", "");
	dispatch({ type: userConst.USER_SIGNOUT });
};

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: userConst.USER_DETAILS_REQUEST });

		// Get the logged in user in order to get his token
		const {
			userSignin: { userInfo },
		} = getState();

		const options = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userInfo.token}`,
		};

		const { data } = await axios.get(`/api/v1/users/${id}`, options);

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
