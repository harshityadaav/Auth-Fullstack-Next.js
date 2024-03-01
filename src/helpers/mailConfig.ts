import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
     user: process.env.MAIL_USER!,
     pass: process.env.MAIL_PASSWORD!
  },
});

export { transporter };
