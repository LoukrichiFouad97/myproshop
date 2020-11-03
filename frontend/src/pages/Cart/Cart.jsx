import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Row,
	Col,
	ListGroup,
	Form,
	Button,
	Card,
	Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { addToCart, removeFromCart } from "../../state/cart/cart.actions";
import { Message } from "../../components/Message/Message";

export const Cart = ({ match, location, history }) => {
	const productId = match.params.productId;
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;

	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (productId) => {
		dispatch(removeFromCart(productId));
	};

	const checkoutHandler = () => {
		history.push("/login?redirect=shipping");
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty
						<Link to="/"> Go Back</Link>
					</Message>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item, index) => (
							<ListGroup.Item key={index}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item._id}`}>{item.name}</Link>
									</Col>
									<Col md={2}>{item.price}</Col>
									<Col md={2}>
										<Form.Control
											as="select"
											value={item.qty}
											onChange={(e) =>
												dispatch(addToCart(item._id, Number(e.target.value)))
											}
										>
											{[...Array(item.countInStock).keys()].map((item) => (
												<option key={item + 1} value={item + 1}>
													{item + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											variant="light"
											onClick={() => removeFromCartHandler(item._id)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup>
						<ListGroup.Item>
							<h2>
								Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								items
							</h2>
							$
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type="button"
								className="btn-block"
								disabled={cartItems.lenght === 0}
								onClick={checkoutHandler}
							>
								Proceed to checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};
