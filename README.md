# My Backend Project

## Step 1: Setup

1. Create folder structure.
2. Initialize Node.js with `npm init -y`.
3. Install dependencies:
   ```bash
   npm install express mongoose dotenv
   npm install -D typescript ts-node-dev @types/node @types/express @types/mongoose
   ```

## Step 2: User Module

1. Create `src/interfaces/user.interface.ts` for TypeScript type safety.
2. Create Mongoose schema in `src/models/user.model.ts`.
3. Create business logic in `src/services/user.service.ts`.
4. Create controllers in `src/controllers/user.controller.ts`.
5. Create routes in `src/routes/user.routes.ts`.
6. Import routes in `src/app.ts`.
7. Run and test:
   ```bash
   npm run dev
   ```

## Step 3: Authentication (JWT)

1. Install `jsonwebtoken` and `bcryptjs` for security.
2. Create `auth.middleware.ts` to protect routes.
3. Create `auth.service.ts` to handle registration & login.
4. Create `auth.controller.ts` for request handling.
5. Create `auth.routes.ts` for endpoints.
6. Add `JWT_SECRET` to `.env`.
7. Protect `/api/users` with `authMiddleware`.

## Step 4: Validation & Error Handling

1. Install `zod` for schema validation.
2. Create `validate.middleware.ts` to handle validation logic.
3. Create `auth.validation.ts` and `user.validation.ts` schemas.
4. Create `error.middleware.ts` for global error handling.
5. Update routes to use validation middleware.

## Step 5: Pagination, Filtering, Sorting, and Search

1. Update `user.service.ts` to:
   - Support `page` and `limit` for pagination.
   - Support `sort` (e.g., `name` or `-name` for descending).
   - Support `search` by name or email.
2. Update `user.controller.ts` to read query params and pass them to the service.

## Step 6: File Upload & Static Serving

1. Install `multer` for handling file uploads.
2. Create `upload.middleware.ts` with storage & file filter.
3. Add `avatar` field to `User` model.
4. Add `uploadAvatar` controller function.
5. Create `/api/users/:id/avatar` POST route with `upload.single("avatar")`.
6. Serve `uploads` folder statically via Express.

## Step 7: Environment-based Config

1. Create `.env.development` and `.env.production` for separate environments.
2. Add `config.ts` to centralize environment variables.
3. Use `config` in `database.ts`, `app.ts`, and `server.ts`.
4. Update `package.json` scripts to set `NODE_ENV`.
5. Run:
   ```bash
   npm run dev   # Development
   npm run prod  # Production
   ```

## Step 8: Security + Logging

1. Install:
   ```bash
   npm install cors helmet morgan
   npm install -D @types/cors @types/morgan
   ```

## Step 9: Rate Limiting + Sanitization

1. Install:

   ```bash
   npm install express-rate-limit express-mongo-sanitize xss-clean
   npm install -D @types/express-rate-limit

   express-rate-limit → Limits requests to prevent abuse.
   express-mongo-sanitize → Blocks NoSQL injection.
   xss-clean → Prevents XSS attacks.
   ```

```


```

```

```

## Step 10: Consistent API Responses + Error Handling

1. Created `apiResponse.ts` for `successResponse` & `errorResponse`.
2. Created `ApiError` class to throw HTTP errors with status codes.
3. Updated `error.middleware.ts` to catch all errors & format responses.
4. Controller usage:
   ```ts
   return res.json(successResponse("Users fetched successfully", users));
   throw new ApiError(404, "User not found");
   ```

## Step 11: Auth Refresh Tokens + Role-based Access

1. Added:
   - `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` in `.env`
   - Access token expires in 15m, refresh token in 7d.
2. Updated user model to include `role` (user/admin).
3. Created:
   - `jwt.ts` → Token generation & verification.
   - `role.middleware.ts` → Restricts access based on roles.
4. Auth flow:
   - User logs in → gets access + refresh tokens.
   - Access token is used for normal requests.
   - Refresh token can get new access token without re-login.
5. Example:
   - `authorizeRoles("admin")` allows only admins to access a route.
