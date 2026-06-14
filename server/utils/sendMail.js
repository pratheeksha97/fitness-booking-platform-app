const nodemailer = require("nodemailer");
console.log("sendMail.js loaded");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, // aea08d001@smtp-brevo.com
        pass: process.env.EMAIL_PASS  // Brevo SMTP Key
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.error("SMTP Verify Error:", error);
    } else {
        console.log("SMTP Server is ready");
    }
});

const sendMail = async (options) => {

    console.log("===== sendMail called =====");
    console.log("Recipient:", options.email);
    console.log("Subject:", options.subject);
    
    try {
        const info = await transporter.sendMail({
            from: `"Fitness Booking Platform" <pratheekshaka@gmail.com>`,
            to: options.email,
            subject: options.subject,
            html: options.html,
            attachments: options.attachments || []
        });

        console.log("Email sent successfully:", info.messageId);
        console.log(info);

        return info;
    } catch (error) {
        console.error("Email Error:", error);
        throw error;
    }
};

module.exports = sendMail;