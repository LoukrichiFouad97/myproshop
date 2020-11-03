import * as orderConst from "./order.constants";

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case orderConst.ORDER_CREATE_REQUEST:
			return { loading: true };
		case orderConst.ORDER_CREATE_SUCCESS:
			return { loading: false, success: true, order: action.payload };
		case orderConst.ORDER_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
