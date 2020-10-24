import { combineReducers } from "redux";

import {
	productListReducer,
	productDetailsReducer,
} from "./product/product.reducers";

import { cartReducer } from "./cart/cart.reducers";

import { userSigninReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userSignin: userSigninReducer,
});
