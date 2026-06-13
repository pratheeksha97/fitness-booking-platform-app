const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS

  }

});

transporter.verify((error, success) => {

  if (error) {

    console.log("SMTP Error:", error);

  } else {

    console.log("SMTP Ready");

  }

});

const sendMail = async (options) => {

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: options.email,

    subject: options.subject,

    html: options.html,

    attachments: options.attachments || []

  });

};

module.exports = sendMail;