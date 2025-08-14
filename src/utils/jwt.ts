import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, config.jwtAccessSecret, { expiresIn: config.jwtAccessExpiry });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: config.jwtRefreshExpiry });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.jwtAccessSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.jwtRefreshSecret);
};
