import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [3, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [4, "Password should be atleast 4 characters"],
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// GENERATE TOKEN
userSchema.methods.genToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
    expiresIn: "3d",
  });
};

// RESET PASSWORD TOKEN
userSchema.methods.getResetPasswordToken = function () {
  // generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256") //sha -> secure hashing algorithm
    .update(resetToken)
    .digest("hex");

  // token expiration will be for 10 min
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("USER", userSchema);
export default User;
