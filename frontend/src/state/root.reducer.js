import { combineReducers } from "redux";

import {
	productListReducer,
	productDetailsReducer,
} from "./product/product.reducers";

export const rootReducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
});
