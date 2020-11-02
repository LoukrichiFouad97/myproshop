import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { FormContainer } from "../../components/FormContainer/FormContainer";
import { CheckoutSteps } from "../../components/CheckoutSteps/CheckoutSteps";
import { saveShippingAddress } from "../../state/cart/cart.actions";

export const Shipping = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [country, setCountry] = useState(shippingAddress.country);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, country, postalCode }));
		history.push("/payment");
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="Address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						required
						placeholder="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="City">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						required
						placeholder="city"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="Country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						required
						placeholder="Country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="PostalCode">
					<Form.Label>PostalCode</Form.Label>
					<Form.Control
						type="text"
						required
						placeholder="PostalCode"
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button variant="primary" type="submit">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};
