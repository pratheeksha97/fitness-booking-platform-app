const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
{
    trainer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Trainer",
        required:true
    },

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    // NEW FIELD
    classType:{
        type:String,
        enum:[
            "Yoga",
            "Strength Training",
            "Cardio",
            "Zumba",
            "HIIT",
            "Pilates"
        ]
    },

    duration:{
        type:Number,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    capacity:{
        type:Number,
        required:true
    },

    availableSeats:{
        type:Number,
        required:true
    },

    // NEW FIELD
    bookedSeats:{
        type:Number,
        default:0
    },

    date:{
        type:Date,
        required:true
    },

    startTime:{
        type:String,
        required:true
    },

    endTime:{
        type:String,
        required:true
    },

    // NEW FIELD
    difficultyLevel:{
        type:String,
        enum:[
            "Beginner",
            "Intermediate",
            "Advanced"
        ]
    },

    // NEW FIELD
    fitnessGoals:[
        {
            type:String
        }
    ],

    // NEW FIELD
    tags:[
        {
            type:String
        }
    ],

    // NEW FIELD
    imageUrl:{
        type:String
    },

    status:{
        type:String,
        enum:[
            "active",
            "cancelled",
            "completed"
        ],
        default:"active"
    }
},
{
    timestamps:true
}
);

module.exports =
mongoose.model(
    "Class",
    classSchema
);