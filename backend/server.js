import express from "express";
import { loaders } from "./loaders";
import { config } from "./config";

const app = express();

// Start up loaders
loaders(app);

const port = config.port;
app.listen(port, () => {
	console.log(`Server started at: ${port}`.yellow.bold);
});
