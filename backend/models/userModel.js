import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter Your Name."],
    maxLength: [30, "Name cannot exceed 30 characters."],
    minLength: [4, "Name Should have more then 4 characters."],
  },
  email: {
    type: String,
    require: [true, "Please Enter Your Email."],
    unique: true,
    validate: [validator.isEmail, "Please Enter a Valid Email."],
  },
  password: {
    type: String,
    minLength: [8, "Password should be greaten then 8 characters."],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// GENERATING RESETPASSWORD TOKEN
userSchema.methods.getResetPasswordToken = function () {
  // GENERATING TOKEN
  const resetToken = crypto.randomBytes(20).toString("hex");
  // HASHING AND ADDING RESETPASSWORDTOKEN TO SCHEMA
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
