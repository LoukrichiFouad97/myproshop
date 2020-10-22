import { combineReducers } from "redux";

import { productListReducer } from "./product/product.reducers";

export const rootReducer = combineReducers({
	productList: productListReducer,
});
