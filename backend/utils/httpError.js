export class HttpError extends Error {
	constructor(message, statusCode) {
		this.message = message;
		this.statusCode = statusCode;
	}
}
