const User =
require("../models/User");

const getProfile =
async(req,res)=>{

    try{

        const user =
        await User.findById(
            req.user.id
        ).select("-password");

        res.json(user);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const updateProfile =
async(req,res)=>{

    try{

        const user =
        await User.findById(
            req.user.id
        );

        if(!user){

            return res.status(404)
            .json({
                message:"User not found"
            });

        }

        user.name =
        req.body.name ||
        user.name;

        user.phone =
        req.body.phone ||
        user.phone;

        user.profileImage =
        req.body.profileImage ||
        user.profileImage;

        user.fitnessGoal =
        req.body.fitnessGoal ||
        user.fitnessGoal;

        user.preferences =
        req.body.preferences ||
        user.preferences;

        await user.save();

        res.json(user);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const Booking =
require("../models/Booking");

const getDashboard =
async(req,res)=>{

    try{

        const upcomingBookings =
        await Booking.find({

            user:req.user.id,

            status:{
                $ne:"Cancelled"
            }

        })

        .populate("class")

        .sort({
            createdAt:-1
        })

        .limit(5);

        const bookingHistory =
        await Booking.find({

            user:req.user.id

        })

        .populate("class");

        res.json({

            upcomingBookings,

            bookingHistory

        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports = {

    getProfile,

    updateProfile,

    getDashboard

};