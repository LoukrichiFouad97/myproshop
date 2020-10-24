import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { FormContainer } from "../../components/FormContainer/FormContainer";
import { Message } from "../../components/Message/Message";
import { signup } from "../../state/user/user.reducer";

export const Signup = () => {
	// Local state
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			<Form>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
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
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Button variant="dark" type="submit">
						Sign up
					</Button>
				</Form.Group>
			</Form>
		</FormContainer>
	);
};
