import React from "react";
import { Container, Row, Col } from "react-bootstrap";


export const Footer = () => {
	return (
		<footer className="bg-dark text-light py-3 mt-auto ">
			<Container>
				<Row>
					<Col className="text-center">Copyrights &copy; MYPROSHOP</Col>
				</Row>
			</Container>
		</footer>
	);
};
