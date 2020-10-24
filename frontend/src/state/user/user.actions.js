import axios from "axios";
import Cookie from "js-cookie";

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

		Cookie.set("user", JSON.stringify(data));
		dispatch({ type: userConst.USER_SIGNIN_SUCCESS, payload: data });
		// localStorage.setItem("userInfo", JSON.stringify(data));
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
