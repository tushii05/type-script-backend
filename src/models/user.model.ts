import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/user.interface";

export interface IUserModel extends IUser, Document { }

const UserSchema: Schema = new Schema<IUserModel>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        role: { type: String, enum: ["user", "admin"], default: "user" },

    },
    { timestamps: true }
);


export default mongoose.model<IUserModel>("User", UserSchema);
