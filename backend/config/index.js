import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV;

export const config = require(`./${env}.js`);
