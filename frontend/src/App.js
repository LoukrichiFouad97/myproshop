import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

// Pages
import { Home } from "./pages/Home/Home";

const App = () => {
	return (
		<>
			<Header />
			<main>
				<Container>
					<Router>
						<Route to="/" component={Home} />
					</Router>
				</Container>
			</main>
			<Footer />
		</>
	);
};

export default App;
