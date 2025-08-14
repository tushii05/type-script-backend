import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { HTTP } from "../utils/httpStatus";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const token = await authService.registerUser(name, email, password);
    res.status(HTTP.CREATED).json({ token });
  } catch (error: any) {
    res.status(HTTP.BAD_REQUEST).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (error: any) {
    res.status(HTTP.BAD_REQUEST).json({ message: error.message });
  }
};
