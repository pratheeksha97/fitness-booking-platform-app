const axios = require("axios");

const sendMail = async (options) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
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
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Email sent successfully:", response.data);
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