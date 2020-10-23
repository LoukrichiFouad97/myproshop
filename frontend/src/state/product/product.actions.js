import Axios from "axios";
import * as productConst from "./product.constants";

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: productConst.PRODUCT_LIST_REQUEST });
		const { data } = await Axios.get("/api/v1/products");
		dispatch({ type: productConst.PRODUCT_LIST_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: productConst.PRODUCT_LIST_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const productDetails = (productId) => async (dispatch) => {
	try {
		dispatch({ type: productConst.PRODUCT_DETAILS_REQUEST });
		const { data } = await Axios.get(`/api/v1/products/${productId}`);
		dispatch({ type: productConst.PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: productConst.PRODUCT_DETAILS_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};
