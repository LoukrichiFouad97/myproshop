import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { rootReducer } from "./root.reducer";

const middlewares = [thunk];

const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const INITIAL_STATE = {
	cart: { cartItems: cartItemsFromStorage },
	userSignin: { userInfo: userInfoFromStorage },
};

export const store = createStore(
	rootReducer,
	INITIAL_STATE,
	composeWithDevTools(applyMiddleware(...middlewares))
);
