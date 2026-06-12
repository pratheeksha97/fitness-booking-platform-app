const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
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

    bookingDate:{
        type:Date,
        default:Date.now
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Confirmed",
            "Cancelled",
            "Completed",
            "Rescheduled"
        ],
        default:"Confirmed"
    },

    originalDate:{
        type:Date
    },

    rescheduledDate:{
        type:Date
    },

    notes:{
        type:String
    }

},
{
    timestamps:true
}
);

module.exports =
mongoose.model(
    "Booking",
    bookingSchema
);