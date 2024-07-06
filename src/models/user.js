import mongoose from "mongoose";
import { Schema } from "mongoose";
const validateEmail = function (email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePhone = function (phone) {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: [validatePhone, "Please enter a valid 10-digit phone number"],
  },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
