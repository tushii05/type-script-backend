import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import { HTTP } from "../utils/httpStatus";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const { page, limit, sort, search } = req.query;

        const result = await userService.getAllUsers({
            page: Number(page),
            limit: Number(limit),
            sort: sort as string,
            search: search as string,
        });

        res.json(result);
    } catch (error) {
        res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: "Error fetching users" });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(HTTP.NOT_FOUND).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: "Error fetching user" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(HTTP.CREATED).json(user);
    } catch (error) {
        res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: "Error creating user" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) return res.status(HTTP.NOT_FOUND).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: "Error updating user" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        if (!user) return res.status(HTTP.NOT_FOUND).json({ message: "User not found" });
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: "Error deleting user" });
    }
};

export const uploadAvatar = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(HTTP.BAD_REQUEST).json({ message: "No file uploaded" });
        }

        const userId = req.params.id;
        const updatedUser = await userService.updateUser(userId, {
            avatar: req.file.filename,
        });

        if (!updatedUser) return res.status(HTTP.NOT_FOUND).json({ message: "User not found" });

        res.json({
            message: "Avatar uploaded successfully",
            avatarUrl: `/uploads/${req.file.filename}`,
        });
    } catch (error) {
        res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: "Error uploading avatar" });
    }
};