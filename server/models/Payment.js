const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
        required:true
    },

    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    },

    amount:{
        type:Number,
        required:true
    },

    transactionId:{
        type:String
    },

    status:{
        type:String,
        enum:[
            "pending",
            "paid",
            "failed"
        ],
        default:"pending"
    }
},
{
    timestamps:true
}
);

module.exports =
mongoose.model(
    "Payment",
    paymentSchema
);