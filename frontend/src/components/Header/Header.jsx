import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { signout } from "../../state/user/user.actions";

export const Header = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userSignin);

	const signoutHandler = () => {
		dispatch(signout());
		console.log("logout");
	};

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<LinkContainer to="/">
					<Navbar.Brand>MYPROSHOP</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<LinkContainer to="/cart">
							<Nav.Link>
								<i className="fas fa-shopping-cart"></i> Cart
							</Nav.Link>
						</LinkContainer>
						{userInfo ? (
							<NavDropdown title={userInfo.name}>
								<LinkContainer to="/profile">
									<NavDropdown.Item>profile</NavDropdown.Item>
								</LinkContainer>
								<NavDropdown.Item onClick={signoutHandler}>
									Signout
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<LinkContainer to="signin">
								<Nav.Link>
									<i className="fas fa-user"></i> Sign in
								</Nav.Link>
							</LinkContainer>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
