import express from "express";
import cookiePerser from "cookie-parser";
import colors from "colors";

export const expressLoader = (app) => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookiePerser());
};
