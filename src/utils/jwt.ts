import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { config } from "../config/config";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, config.jwtAccessSecret as Secret, { expiresIn: config.jwtAccessExpiry as SignOptions["expiresIn"] });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, config.jwtRefreshSecret as Secret, { expiresIn: config.jwtRefreshExpiry as SignOptions["expiresIn"] });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.jwtAccessSecret as Secret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.jwtRefreshSecret as Secret);
};
