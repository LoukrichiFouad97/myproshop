import * as userConst from "./user.constants";

export const userSigninReducer = (state = {}, action) => {
	switch (action.type) {
		case userConst.USER_SIGNIN_REQUEST:
			return { loading: true };
		case userConst.USER_SIGNIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case userConst.USER_SIGNIN_FAIL:
			return { loading: false, error: action.payload };
		case userConst.USER_SIGNOUT:
			return {};
		default:
			return state;
	}
};

export const userSignupReducer = (state = {}, action) => {
	switch (action.payload) {
		case userConst.USER_SIGNUP_REQUEST:
			return { loading: true };
		case userConst.USER_SIGNUP_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case userConst.USER_SIGNUP_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.payload) {
		case userConst.USER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case userConst.USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload };
		case userConst.USER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
