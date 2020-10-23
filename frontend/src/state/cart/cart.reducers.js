import * as cartConst from "./cart.constants";

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case cartConst.CART_ADD_ITEM:
			const item = action.payload;
			const existItem = state.cartItems.find((x) => x._id === item._id);
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) => {
						return x._id === existItem._id ? item : x;
					}),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case cartConst.CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(item) => item._id !== action.payload
				),
			};
		default:
			return state;
	}
};
