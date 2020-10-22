import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loader.css";
export const Loader = () => {
	return (
		<div className="Loader">
			<Spinner
				animation="border"
				role="status"
				style={{
					width: "100px",
					height: "100px",
					margin: "auto",
					display: "block",
				}}
			>
				<span className="sr-only">Loading...</span>
			</Spinner>
		</div>
	);
};
