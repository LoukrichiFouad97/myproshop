import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

import { rootReducer } from "./root.reducer";

const middlewares = [thunk];

const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const userInfoFromCookie = Cookie.get("user") || null;

const INITIAL_STATE = {
	cart: { cartItems: cartItemsFromStorage },
	userSignin: { userInfo: userInfoFromCookie },
};

export const store = createStore(
	rootReducer,
	INITIAL_STATE,
	composeWithDevTools(applyMiddleware(...middlewares))
);
