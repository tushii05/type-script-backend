import rateLimit from "express-rate-limit";
// import mongoSanitize from "express-mongo-sanitize";
// import xss from "xss-clean";
import { Application } from "express";

// Apply security middlewares to an Express app
export const applySecurityMiddleware = (app: Application) => {
  // Limit repeated requests to public APIs
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  });
  app.use("/api", limiter);

  // Prevent NoSQL injection
  // app.use(mongoSanitize());

  // Prevent XSS attacks
  // app.use(xss());
};
