// Dependancies
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// State
import { listProductDetails } from "../../state/product/product.actions";

// Components
import { Rating } from "../../components/Rating/Rating";
import { Loader } from "../../components/Loader/Loader";
import { Message } from "../../components/Message/Message";

export const Product = ({ history, match }) => {
	// Component State
	const [qty, setQty] = useState(1);

	// Global State
	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	console.log(product);

	useEffect(() => {
		dispatch(listProductDetails(match.params.productId));
	}, [dispatch, match.params.productId]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.productId}?qty=${qty}`);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Link to="/" className="btn btn-light">
						Go Back
					</Link>

					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
							</ListGroup>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</Col>
						<Col md={3}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											<strong>
												{product.countInStock > 0 ? "In Stock" : "Out of Stock"}
											</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map(
														(item) => (
															<option key={item + 1} value={item + 1}>
																{item + 1}
															</option>
														)
													)}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										className="btn-block"
										type="button"
										disabled={product.countInStock === 0}
									>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};
