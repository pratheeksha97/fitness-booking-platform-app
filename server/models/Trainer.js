const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
{
    trainerName:{
        type:String,
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    bio:{
        type:String,
        required:true
    },

    experience:{
        type:Number,
        required:true
    },

    specializations:[
        {
            type:String
        }
    ],

    certifications:[
        {
            type:String
        }
    ],

    hourlyRate:{
        type:Number,
        required:true
    },

    profileImage:{
        type:String,
        default:""
    },

    photo:{
        type:String,
        default:""
    },

    introVideo:{
        type:String,
        default:""
    },

    introMessage:{
        type:String,
        default:""
    },

    qualifications:[
        {
            type:String
        }
    ],

    rating:{
        type:Number,
        default:0
    },

    totalReviews:{
        type:Number,
        default:0
    },

    isAvailable:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true
}
);

module.exports =
mongoose.model(
    "Trainer",
    trainerSchema
);