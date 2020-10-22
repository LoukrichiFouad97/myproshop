import Axios from "axios";
import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
} from "./product.constants";

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await Axios.get("/api/v1/products");
		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};
