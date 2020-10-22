import { HttpError } from "../utils/httpError";

// @desc      Handle a 404 not found errors
export const notFound = (req, res, next) => {
	return next(new HttpError(`Not Found - ${req.originalUrl}`, 404));
};

// @desc      Overrides builtin error handler middleware
export const errorHandler = (err, req, res, next) => {
	// even if it is an error sometimes it returns a 200 status code
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};
