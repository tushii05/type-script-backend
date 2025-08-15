import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { HTTP } from "../utils/httpStatus";

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (err: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Validation error",
      errors: err.errors,
    });
  }
};
