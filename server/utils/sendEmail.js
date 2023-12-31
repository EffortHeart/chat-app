const nodeMailer = require("nodemailer");
const {
  SMPT_HOST,
  SMPT_PORT,
  SMPT_SERVICES,
  SMPT_MAIL,
  SMPT_PASSWORD,
} = require("../config/keys");
const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: SMPT_HOST,
    port: SMPT_PORT,
    service: SMPT_SERVICES,
    auth: {
      user: SMPT_MAIL,
      pass: SMPT_PASSWORD,
    },
  });
  const mailOptions = {
    from: SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: options.message_Content,
  };
  const mailInfo = await transporter.sendMail(mailOptions, (error, result) => {
    if (error) {
      // console.log(error);
    }
  });

  // console.log(mailInfo);
};

module.exports = sendEmail;
