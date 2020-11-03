import axios from "axios";

import * as orderConst from "./order.constants";

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: orderConst.ORDER_CREATE_REQUEST });

		// Get a token from the logged in user
		const {
			userLogin: { userInfo },
		} = getState();

		const options = {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post("/api/orders", order, options);
		
		console.log(data);

		dispatch({ type: orderConst.ORDER_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: orderConst.ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
