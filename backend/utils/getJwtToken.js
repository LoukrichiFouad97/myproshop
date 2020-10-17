import { config } from "../config";
import jwt from "jsonwebtoken";

export const getJwtToken = (user) => {
	return jwt.sign({ id: user._id }, config.jwt.secret, { expiresIn: "30d" });
};
