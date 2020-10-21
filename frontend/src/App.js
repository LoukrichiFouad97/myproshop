import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

// Pages
import { Home } from "./pages/Home/Home";
import { Product } from "./pages/Product/Product";

const App = () => {
	return (
		<Router>
			<Header />
			<main>
				<Container>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/product/:productId" component={Product} />
					</Switch>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
