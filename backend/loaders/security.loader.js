import helmet from "helmet";
import mongoSanitizer from "express-mongo-sanitize";
import limiter from "express-rate-limit";
import xss from "xss-clean";
import hpp from "hpp";

export const securityLoader = (app) => {
	app.use(helmet());
	app.use(xss());
	app.use(hpp());
	app.use(mongoSanitizer());
	app.use(
		limiter({
			windowMs: 10 * 60 * 1000, // 10 min
			max: 100, // Allow 100 req per 10 min
			message: "Max Number of requests exceeded, Please try again later",
		})
	);

	console.log("hello in security loader in prod env");
};
