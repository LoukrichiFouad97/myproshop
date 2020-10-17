import express from "express";
import cookiePerser from "cookie-parser";
import colors from "colors";
import dotenv from "dotenv";

export const expressLoader = (app) => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookiePerser());
	dotenv.config();
};
