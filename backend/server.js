import express from "express";

import { loaders } from "./loaders";

const app = express();

// Start up loaders
loaders(app);

app.get("/", () => {
	console.log("test success");
});

app.listen(5000, () => {
	console.log("server started".yellow.bold);
});
