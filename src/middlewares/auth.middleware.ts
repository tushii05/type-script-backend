import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserPayload } from "../interfaces/user.interface";

export interface AuthRequest extends Request {
  user?: IUserPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set in .env");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as IUserPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
