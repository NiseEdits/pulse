import.mongoose, { Schema, type Document } from "mongoose";

export interface IUser extends Document {
    clerkId: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    password: string;
}

const userSchema = new Schema<IUser>({
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    avatar: { type: String, default: "" },
    password: { type: String, required: true },
},
    { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);

//users