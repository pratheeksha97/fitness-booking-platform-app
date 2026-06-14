const nodemailer =
require("nodemailer");

const transporter =
nodemailer.createTransport({

    host:
    "smtp-relay.brevo.com",

    port: 2525,

    secure: false,

    auth: {

        user:
        process.env.EMAIL_USER,

        pass:
        process.env.EMAIL_PASS

    }

});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

transporter.verify(function(error, success) {
    if (error) {
        console.error("SMTP Verify Error:", error);
    } else {
        console.log("SMTP Server is ready");
    }
});

const sendMail =
async(options)=>{

    return await transporter.sendMail({

        from:
        `"Fitness Booking Platform" <${process.env.EMAIL_USER}>`,

        to:
        options.email,

        subject:
        options.subject,

        html:
        options.html,

        attachments:
        options.attachments || []

    });

};

module.exports =
sendMail;