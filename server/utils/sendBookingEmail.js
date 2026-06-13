const nodemailer =
require("nodemailer");

const transporter =
nodemailer.createTransport({

    host:
    "smtp-relay.brevo.com",

    port: 587,

    secure: false,

    auth: {

        user:
        process.env.EMAIL_USER,

        pass:
        process.env.EMAIL_PASS

    }

});

const sendBookingEmail =
async(
    email,
    subject,
    message
)=>{

    return await transporter.sendMail({

        from:
        `"Fitness Booking Platform" <${process.env.EMAIL_USER}>`,

        to:
        email,

        subject,

        html:
        message

    });

};

module.exports =
sendBookingEmail;