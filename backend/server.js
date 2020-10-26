import express from "express";
import { loaders } from "./loaders";
import { config } from "./config";
import { errorHandler, notFound } from "./middlewares/error.middleware";
import dotenv from "dotenv";
import expressStatus from 'express-status-monitor'

const app = express();
dotenv.config();

app.use(expressStatus())

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Start up packages and modules
loaders(app);

// error handeling middlewares
app.use(notFound);
app.use(errorHandler);

const port = config.port;
app.listen(port, () => {
	console.log(`Server started at: ${port}`.yellow.bold);
});
