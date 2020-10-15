import express from "express";

const app = express();

app.get("/", () => {
	console.log("test success");
});

app.listen(5000, () => {
	console.log("server started");
});
