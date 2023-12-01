import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "digiorderbusiness@gmail.com" };

  await sgMail.send(email);

  return true;
};

export default sendEmail;
