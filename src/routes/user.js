import express from "express";
import { jwtVerify } from "../middlewares/jwtVerify.js";
import {
  registerUser,
  loginUser,
  updateProfile,
  updatePassword,
  forgotPassword,
  verifyOtpAndResetPassword,
} from "../controllers/user.js";
import {
  validateRegistration,
  validateLogin,
  validateUpdateProfile,
  validateUpdatePassword,
  forgotPasswordValidation,
} from "../validators/user.js";

const router = express.Router();
router.use(express.json());
router.post("/register", validateRegistration, registerUser);

router.post("/login", validateLogin, loginUser);

router.post(
  "/update/profile",
  [jwtVerify, validateUpdateProfile],
  updateProfile
);

router.post(
  "/update/password",
  [jwtVerify, validateUpdatePassword],
  updatePassword
);

router.post("/forgot-password", forgotPasswordValidation, forgotPassword);

router.post("/verify-otp-and-reset-password", verifyOtpAndResetPassword);

export default router;
