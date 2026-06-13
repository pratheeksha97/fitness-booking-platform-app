const Payment =
require("../models/Payment");

const Booking =
require("../models/Booking");

const Class =
require("../models/Class");

const sendMail =
require("../utils/sendMail");

const generateInvoice =
require("../utils/generateInvoice");

const createPayment =
async(req,res)=>{

    try{

        const fitnessClass =
        await Class.findById(
            req.body.classId
        );

        if(!fitnessClass){

            return res.status(404).json({
                message:"Class not found"
            });

        }

        const payment =
        await Payment.create({

            user:req.user._id,

            class:req.body.classId,

            amount:
            fitnessClass.price

        });

        res.status(201).json({

            message:
            "Payment created",

            paymentId:
            payment._id

        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const mockPaymentSuccess =
async(req,res)=>{

    try{

        const payment =
        await Payment.findById(
            req.params.id
        );

        if(!payment){

            return res.status(404).json({
                message:
                "Payment not found"
            });

        }

        payment.status =
        "paid";

        payment.transactionId =
        "TXN" +
        Date.now();

        await payment.save();

        const booking =
        await Booking.create({

            user:payment.user,

            class:payment.class

        });

        payment.booking =
        booking._id;

        await payment.save();

        const user =
        req.user;

        const fitnessClass =
        await Class.findById(
            payment.class
        );

        const invoicePath =
        await generateInvoice({

            user:user.name,

            className:
            fitnessClass.title,

            amount:
            payment.amount,

            transactionId:
            payment.transactionId

        });

        // await sendMail({

        //     email:user.email,

        //     subject:
        //     "Booking Confirmed",

        //     html:`

        //     <h2>
        //     Booking Confirmed
        //     </h2>

        //     <p>
        //     Class:
        //     ${fitnessClass.title}
        //     </p>

        //     <p>
        //     Amount:
        //     ₹${payment.amount}
        //     </p>

        //     `,

        //     attachments:[
        //         {
        //             filename:
        //             "invoice.pdf",

        //             path:
        //             invoicePath
        //         }
        //     ]

        // });

        res.json({

            message:
            "Payment Successful",

            booking

        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const getPaymentHistory =
async(req,res)=>{

    const payments =
    await Payment.find({

        user:req.user._id

    });

    res.json(payments);

};

module.exports = {
    createPayment,
    mockPaymentSuccess,
    getPaymentHistory
};