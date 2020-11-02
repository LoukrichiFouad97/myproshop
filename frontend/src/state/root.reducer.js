import { combineReducers } from "redux";

import * as productReducer from "./product/product.reducers";
import * as userReducer from "./user/user.reducer";
import { cartReducer } from "./cart/cart.reducers";
import { orderCreateReducer } from "./order/order.reducers";

export const rootReducer = combineReducers({
	productList: productReducer.productListReducer,
	productDetails: productReducer.productDetailsReducer,
	cart: cartReducer,
	userLogin: userReducer.userLoginReducer,
	userRegister: userReducer.userRegisterReducer,
	userDetails: userReducer.userDetailsReducer,
	userUpdateProfile: userReducer.userUpdateProfileReducer,
	orderCreate: orderCreateReducer,
});
