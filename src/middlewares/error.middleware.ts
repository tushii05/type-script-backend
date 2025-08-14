import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { errorResponse } from "../utils/apiResponse";

export const errorHandler = (
    err: ApiError | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("❌ Error:", err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json(
            errorResponse(err.message, err.statusCode, err.errors)
        );
    }

    return res.status(500).json(
        errorResponse("Internal server error", 500)
    );
};
