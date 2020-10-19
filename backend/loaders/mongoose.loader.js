import mongoose from "mongoose";
import { config } from "../config";

export const mongooseLoader = async () => {
	try {
		await mongoose.connect(config.db.url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log(`connected to: ${config.db.url}`.cyan.bold.underline);
	} catch (err) {
		console.error(err);
	}
};
