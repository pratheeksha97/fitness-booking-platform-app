const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:[
            "user",
            "trainer",
            "admin"
        ],
        default:"user"
    },

    phone:{
        type:String,
        default:""
    },

    profileImage:{
        type:String,
        default:""
    },

    fitnessGoal:{
    type:String,
    enum:[
        "Weight Loss",
        "Muscle Gain",
        "Flexibility",
        "General Fitness"
    ],
    default:"General Fitness"
   },

    preferredClassTypes:{
        type:String,
        required:false
    },
    
},
{
    timestamps:true
}
);

module.exports =
mongoose.model(
    "User",
    userSchema
);