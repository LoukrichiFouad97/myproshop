import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { rootReducer } from "./root.reducer";

const middlewares = [thunk];

const INITIAL_STATE = {};

export const store = createStore(
	rootReducer,
	INITIAL_STATE,
	composeWithDevTools(applyMiddleware(...middlewares))
);
