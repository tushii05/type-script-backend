import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req as any).user.role)) {
      throw new ApiError(403, "You do not have permission to access this resource");
    }
    next();
  };
};
