const axios = require("axios");
const fs = require("fs");

const sendMail = async (options) => {
  try {

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

    // Add attachments only if they exist
    if (
      options.attachments &&
      options.attachments.length > 0
    ) {

      payload.attachment =
        options.attachments.map(file => ({

          name: file.filename,

          content: fs
            .readFileSync(file.path)
            .toString("base64")

        }));

    }

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      payload,
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
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
      "Brevo API Error:",
      error.response?.data || error.message
    );

    throw error;

  }
};

module.exports = sendMail;