import { config } from "../config";
import jwt from "jsonwebtoken";

export const getJwtToken = (id) => {
	return jwt.sign({ id }, config.jwt.secret, { expiresIn: "30d" });
};
