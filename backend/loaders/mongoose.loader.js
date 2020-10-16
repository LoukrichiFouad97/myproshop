import mongoose from "mongoose";

export const mongooseLoader = () => {
	mongoose.connect("mongodb://localhost/myproshop", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	}).then(() => {
    console.log('connected to mongodb successfully'.cyan.bold.underline)
  })
	console.log("express loader works well");
};
