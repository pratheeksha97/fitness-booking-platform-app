const nodemailer =
require("nodemailer");

const transporter =
nodemailer.createTransport({

    service:"gmail",

    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }

});

const sendMail =
async(options)=>{

    await transporter.sendMail({

        from:process.env.EMAIL_USER,

        to:options.email,

        subject:options.subject,

        html:options.html,

        attachments:
        options.attachments

    });

};

module.exports =
sendMail;