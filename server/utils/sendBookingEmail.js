const nodemailer =
require("nodemailer");

const transporter =
nodemailer.createTransport({

    host:
    "smtp.gmail.com",

    port: 587,

    secure: false,

    auth: {

        user:
        process.env.EMAIL_USER,

        pass:
        process.env.EMAIL_PASS

    }

});

transporter.verify(

    (error, success) => {

        if(error){

            console.log(
                "SMTP Error:",
                error
            );

        }else{

            console.log(
                "SMTP Ready"
            );

        }

    }

);

const sendBookingEmail =
async(
    email,
    subject,
    message
)=>{

    return await transporter.sendMail({

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