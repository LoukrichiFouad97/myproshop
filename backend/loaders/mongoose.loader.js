import mongoose from "mongoose";
import { config } from "../config";

export const mongooseLoader = async () => {
	try {
		const conn = await mongoose.connect(config.db.url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log(`connected to: ${conn.connection.host}`.cyan.bold.underline);
	} catch (err) {
		console.error(`Error: ${err.message}`.red.bold.underline);
		process.exit(1);
	}
};
