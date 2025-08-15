import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserPayload } from "../interfaces/user.interface";
import { HTTP } from "../utils/httpStatus";

export interface AuthRequest extends Request {
  user?: IUserPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(HTTP.UNAUTHORIZED).json({ message: "No token, authorization denied" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set in .env");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as IUserPayload;
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(HTTP.UNAUTHORIZED).json({ message: "Token is not valid" });
  }
};
