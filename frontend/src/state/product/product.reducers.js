import * as productConst from "./product.constants";

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case productConst.PRODUCT_LIST_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case productConst.PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			};
		case productConst.PRODUCT_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const productDetailsReducer = (
	state = { product: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case productConst.PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				...state,
			};
		case productConst.PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			};
		case productConst.PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
