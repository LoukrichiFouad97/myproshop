import { HttpError } from "../utils/httpError";

export const notFound = (req, res, next) => {
	return next(new HttpError(`Not Found - ${req.originalUrl}`, 404));
};

export const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};
