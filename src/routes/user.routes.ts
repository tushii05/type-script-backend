import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema, updateUserSchema } from "../validations/user.validation";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", validate(createUserSchema), userController.createUser);
router.put("/:id", validate(updateUserSchema), userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.post("/:id/avatar", upload.single("avatar"), userController.uploadAvatar);

export default router;
