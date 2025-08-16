import dotenv from "dotenv";
import path from "path";

// Load env file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/testtype",
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "accesssecret",
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "refreshsecret",
    jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRY || "15m",
    jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY || "7d",
    uploadPath: process.env.UPLOAD_PATH || "uploads",
    corsOrigin: process.env.CORS_ORIGIN || "*",

};
