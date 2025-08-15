import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUserModel } from "../models/user.model";

export const registerUser = async (
    name: string,
    email: string,
    password: string,
    role: string = "user"
): Promise<string> => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    if (role === "admin") {
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) throw new Error("Admin user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });

    await user.save();
    return generateToken(user._id.toString(), user.role);
};


export const loginUser = async (email: string, password: string): Promise<string> => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return generateToken(user._id.toString(), user.role);
};


const generateToken = (id: string, role: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not set in .env");
    }

    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
