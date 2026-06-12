const mongoose = require("mongoose");

const availabilitySchema =
new mongoose.Schema({

trainer:{
type:mongoose.Schema.Types.ObjectId,
ref:"Trainer"
},

day:String,

startTime:String,

endTime:String

});

module.exports =
mongoose.model(
"TrainerAvailability",
availabilitySchema
);