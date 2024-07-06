import { check, validationResult } from "express-validator";
import User from "../models/user.js";

const validateRegistration = [
  check("email").isEmail().withMessage("Please enter a valid email address"),
  check("phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits")
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be numeric and 10 digits long"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  check("email_or_phone").exists().withMessage("Email or Phone is required"),
  check("password").exists().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdateProfile = [
  check("email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check("phone")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits")
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be numeric and 10 digits long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdatePassword = [
  check("currentPassword").exists().withMessage("Current password is required"),
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const forgotPasswordValidation = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (!user) {
        throw new Error("User not found with this email address");
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const verifyOtpAndUpdatePasswordValidation = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (value, { req }) => {
      const { otp } = req.body;
      const user = await User.findOne({ email: value, otp });
      if (!user) {
        throw new Error("Invalid OTP");
      }
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export {
  validateRegistration,
  validateLogin,
  validateUpdatePassword,
  validateUpdateProfile,
  verifyOtpAndUpdatePasswordValidation,
  forgotPasswordValidation,
};
