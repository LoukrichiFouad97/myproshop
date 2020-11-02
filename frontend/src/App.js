import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

// Pages
import { Home } from "./pages/Home/Home";
import { Product } from "./pages/Product/Product";
import { Cart } from "./pages/Cart/Cart";
import { Login } from "./pages/Signin/Signin";
import { Register } from "./pages/Signup/Signup";
import { Profile } from "./pages/Profile/Profile";
import { Shipping } from "./pages/Shipping/Shipping";
import { Payment } from "./pages/Payment/Payment";
import { Placeorder } from "./pages/Placeorder/Placeorder";

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/product/:productId" component={Product} />
						<Route exact path="/cart/:productId?" component={Cart} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/profile" component={Profile} />
						<Route exact path="/shipping" component={Shipping} />
						<Route exact path="/payment" component={Payment} />
						<Route exact path="/placeorder" component={Placeorder} />
					</Switch>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
