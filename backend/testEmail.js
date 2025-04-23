// testEmail.js
require("dotenv").config();
const nodemailer = require("nodemailer");

async function testEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"KARA Test" <${process.env.EMAIL_USER}>`,
    to: "phonemask000@gmail.com", // Replace with a valid recipient email
    subject: "Test Email from KARA",
    text: "This is a test email to verify Gmail SMTP.",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Test email sent:", info.messageId);
  } catch (error) {
    console.error("Test email error:", error.message);
  }
}

testEmail();
