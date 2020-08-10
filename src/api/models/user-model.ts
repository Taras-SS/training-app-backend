import mongoose, { Schema, model, Document } from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";

interface SavedUser extends Document {
  email: string;
  name: string;
  surName: string;
  imageUrl: string;
  salt: string;
  hash: string;
  setPassword(password: string): void;
  validatePassword(password: string): boolean;
  generateJwt(): string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  surName: String,
  imageUrl: {
    type: String,
  },
  salt: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
});

UserSchema.methods.setPassword = function (password: string): void {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.generateJwt = function (): string {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      surName: this.surName,
      exp: parseInt(String(expiry.getTime() / 1000), 10),
    },
    process.env.JWT_KEY || ""
  );
};

UserSchema.methods.validatePassword = function (password: string): boolean {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

const User = model<SavedUser>("User", UserSchema);

export default User;
