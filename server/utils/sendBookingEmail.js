const nodemailer =
require("nodemailer");

const transporter =
nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  requireTLS: true,

  family: 4,

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS

  }

});

const sendBookingEmail =
async(
  email,
  subject,
  message
)=>{

  return transporter.sendMail({

    from:
    process.env.EMAIL_USER,

    to:
    email,

    subject,

    html:
    message

  });

};

module.exports =
sendBookingEmail;