// Dependancies
import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

// Models
import { User } from "./api/user/user.model";
import { Product } from "./api/products/products.model";
import { Order } from "./api/order/order.model";

// Data
import { users } from "./data/users";
import { products } from "./data/products";

dotenv.config();

const dbConnect = async () => {
	try {
		await mongoose.connect("mongodb://localhost/myproshop", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log(`db connected`.cyan.bold.underline);
	} catch (err) {
		console.error(err);
	}
};
dbConnect();

const importData = async () => {
	try {
		await Order.deleteMany();
		await User.deleteMany();
		await Product.deleteMany();

		const insertedUsers = await User.insertMany(users);
		const admin = insertedUsers[0]._id;
		const sampleProducts = products.map((product) => ({
			...product,
			user: admin,
		}));
		await Product.insertMany(sampleProducts);
		console.log("Data imported...".green.inverse);
		process.exit();
	} catch (err) {
		console.error(`${err}`.reset.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await User.deleteMany();
		await Product.deleteMany();
		console.log("Data Destroyed".red.inverse);
		process.exit();
	} catch (err) {
		console.error(`${err}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === "-d") {
	destroyData();
} else {
	importData();
}
