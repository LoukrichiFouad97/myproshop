import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FormContainer } from "../../components/FormContainer/FormContainer";
import { Message } from "../../components/Message/Message";
import { Loader } from "../../components/Loader/Loader";
import { login } from "../../state/user/user.actions";

export const Login = ({ location, history }) => {
	// Local state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Global State
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			<h1>Log in</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Button variant="dark" type="submit">
						Login
					</Button>
				</Form.Group>
			</Form>
			<Row className="py-3">
				<Col>
					New Customer?{" "}
					<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};
