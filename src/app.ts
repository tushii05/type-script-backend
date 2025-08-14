import express, { Application } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/config";
import connectDB from "./config/database";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { authMiddleware } from "./middlewares/auth.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import { applySecurityMiddleware } from "./middlewares/security.middleware";

dotenv.config();
connectDB();

const app: Application = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(helmet());
applySecurityMiddleware(app);

if (config.env === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);

app.use("/api/users", authMiddleware, userRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send(`API is running in ${config.env} mode`);
});

export default app;
