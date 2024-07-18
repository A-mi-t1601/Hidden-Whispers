import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

//Updated User Schema
const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username Is Required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email Is Required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please Use A Valid Email Address"],
  },
  password: {
    type: String,
    required: [true, "Password Is Required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify Code Is Required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry Is Required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
