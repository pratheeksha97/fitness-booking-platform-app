const axios = require("axios");
const fs = require("fs");

const sendMail = async (options) => {

  const payload = {

    sender: {
      name: "Fitness Booking Platform",
      email: "pratheekshaka@gmail.com"
    },

    to: [
      {
        email: options.email
      }
    ],

    subject: options.subject,

    htmlContent: options.html

  };

  if (
    options.attachments &&
    options.attachments.length > 0
  ) {
    console.log(
    "Invoice Path:",
    options.attachments[0].path
  );

  console.log(
    "Invoice Exists:",
    fs.existsSync(
      options.attachments[0].path
    )
  );


    payload.attachment =
    options.attachments.map(file => ({

      name: file.filename,

      content: fs
        .readFileSync(file.path)
        .toString("base64")

    }));

  }

  try {

    console.log(
      "Payload Sent:",
      JSON.stringify(payload, null, 2)
    );

    const response =
    await axios.post(

      "https://api.brevo.com/v3/smtp/email",

      payload,

      {
        headers: {
          "api-key":
          process.env.BREVO_API_KEY,
          "Content-Type":
          "application/json"
        }
      }

    );

    console.log(
      "Email sent successfully:",
      response.data
    );

    return response.data;

  } catch (error) {

    console.error(
      "Brevo Full Error:",
      JSON.stringify(
        error.response?.data,
        null,
        2
      )
    );

    throw error;

  }

};

module.exports = sendMail;