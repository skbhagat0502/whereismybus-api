import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async (to, subject, otpCode) => {
  try {
    const templatePath = path.resolve(
      __dirname,
      "emailTemplates/forgotPassword.html"
    );
    const htmlTemplate = fs.readFileSync(templatePath, "utf8");

    const html = htmlTemplate.replace(/{otpCode}/g, otpCode);

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

export default sendEmail;
