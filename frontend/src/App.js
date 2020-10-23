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
					</Switch>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
