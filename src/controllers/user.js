import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    let user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User already exists with this email or phone" });
    }

    user = new User({
      email,
      phone,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
      },
    };

    const token = jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: process.env.expiresIn,
    });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email_or_phone, password } = req.body;

  try {
    let user = await User.findOne({
      $or: [{ email: email_or_phone }, { phone: email_or_phone }],
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
      },
    };

    const token = jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: process.env.expiresIn,
    });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const updateProfile = async (req, res) => {
  const { email, phone } = req.body;
  const userId = req.user.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save();

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid current password" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return res.json({ status: true, message: "Password updated successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found with this email address",
      });
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000);

    const subject = "Forgot Password OTP";
    const html = htmlTemplate.replace(/{otpCode}/g, otpCode);
    await sendEmail(email, subject, html);

    return res.json({
      status: true,
      message: "OTP sent to your email for password reset",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const verifyOtpAndResetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email, otp: req.body.otp });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "User not found with this email and OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.otp = null;

    await user.save();

    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export {
  registerUser,
  loginUser,
  updateProfile,
  updatePassword,
  forgotPassword,
  verifyOtpAndResetPassword,
};
