import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { store } from "./state/store";

import "./bootstrap.min.css";
import "./index.css";
import App from "./App";

render(
	<Provider store={store}>
		<App />
	</Provider>,

	document.getElementById("root")
);
