import axios from "axios";

import * as cartConst from "./cart.constants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${productId}`);
	const { _id, name, image, price, countInStock } = data;
	dispatch({
		type: cartConst.CART_ADD_ITEM,
		payload: { _id, name, image, price, countInStock, qty },
	});
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
	dispatch({ type: cartConst.CART_REMOVE_ITEM, payload: productId });
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({ type: cartConst.CART_SAVE_SHIPPING_ADDRESS, payload: data });
	localStorage.setItem("shippingAdress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({ type: cartConst.CART_SAVE_PAYMENT_METHOD, payload: data });
	localStorage.setItem("paymentMethod", JSON.stringify(data));
};
