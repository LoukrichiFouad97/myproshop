import mongoose from "mongoose";
import { config } from "../config";
import asyncHabndler from "express-async-handler";

export const mongooseLoader = asyncHabndler(async (next) => {
	const dbConnect = await mongoose.connect(config.db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
	console.log(`connected to: ${config.db.url}`.cyan.bold.underline);

	if (!dbConnect) return next(new Error());
});
