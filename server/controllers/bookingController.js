const Booking =require("../models/Booking");
const Class =require("../models/Class");
const User =
require("../models/User");
const sendBookingEmail =
require("../utils/sendBookingEmail");

const createBooking =
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

        if(
            fitnessClass.availableSeats <= 0
        ){

            return res.status(400).json({
                message:"No seats available"
            });

        }

        const existingBooking =
        await Booking.findOne({

            user:req.user.id,

            class:req.body.classId

        });

        if(existingBooking){

            return res.status(400).json({
                message:
                "Already booked"
            });

        }

        const booking =
        await Booking.create({

            user:req.user.id,

            class:req.body.classId

        });

        fitnessClass.availableSeats -= 1;

        await fitnessClass.save();

        const user =
        await User.findById(
            req.user.id
        );

        if(user){

    try{

        await sendBookingEmail(

            user.email,

            "Fitness Class Booking Confirmed",

            `
            <h2>Booking Confirmed</h2>

            <p>
                Hello ${user.name},
            </p>

            <p>
                Your booking has been confirmed.
            </p>

            <hr>

            <p>
                <strong>Class:</strong>
                ${fitnessClass.title}
            </p>

            <p>
                <strong>Category:</strong>
                ${fitnessClass.category}
            </p>

            <p>
                <strong>Date:</strong>
                ${new Date(
                    fitnessClass.date
                ).toLocaleDateString()}
            </p>

            <p>
                <strong>Time:</strong>
                ${fitnessClass.startTime}
                -
                ${fitnessClass.endTime}
            </p>

            <p>
                <strong>Duration:</strong>
                ${fitnessClass.duration}
                Minutes
            </p>

            <p>
                <strong>Price:</strong>
                ₹${fitnessClass.price}
            </p>
            `
        );

    }catch(error){

        console.log(
            "Booking Email Error:",
            error.message
        );

    }

}

        res.status(201).json({

            message:
            "Booking created successfully",

            booking

        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const getMyBookings =
async(req,res)=>{

    try{

        const bookings =
        await Booking.find({

            user:req.user.id

        })
        .populate("class");

        res.json(bookings);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const getBookingById =
async(req,res)=>{

    try{

        const booking =
        await Booking.findById(
            req.params.id
        )

        .populate("class")

        .populate(
            "user",
            "name email"
        );

        if(!booking){

            return res.status(404)
            .json({
                message:
                "Booking not found"
            });

        }

        res.json(booking);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const cancelBooking =
async(req,res)=>{

    try{

        const booking =
        await Booking.findById(
            req.params.id
        )

        .populate("user")

        .populate("class");

        if(!booking){

            return res.status(404)
            .json({
                message:
                "Booking not found"
            });

        }

        booking.status =
        "Cancelled";

        await booking.save();

        booking.class.availableSeats += 1;

        await booking.class.save();

        try{

    await sendBookingEmail(

        booking.user.email,

        "Booking Cancelled",

        `
        <h2>Booking Cancelled</h2>

        <p>
        Class:
        ${booking.class.title}
        </p>
        `
    );

}catch(error){

    console.log(
        "Cancellation Email Error:",
        error.message
    );

}
        res.json({

            message:
            "Booking cancelled successfully"

        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const rescheduleBooking =
async(req,res)=>{

    try{

        const booking =
        await Booking.findById(
            req.params.id
        )

        .populate("user")

        .populate("class");

        if(!booking){

            return res.status(404)
            .json({
                message:
                "Booking not found"
            });

        }

        booking.originalDate =
        booking.class.date;

        booking.rescheduledDate =
        req.body.newDate;

        booking.status =
        "Rescheduled";

        await booking.save();

        try{

    await sendBookingEmail(

        booking.user.email,

        "Booking Rescheduled",

        `
        <h2>Booking Updated</h2>

        <p>
        New Date:
        ${req.body.newDate}
        </p>
        `
    );

}catch(error){

    console.log(
        "Reschedule Email Error:",
        error.message
    );

}

        res.json({

            message:
            "Booking rescheduled",

            booking

        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const getTrainerBookings =
async(req,res)=>{

    try{

        const classes =
        await Class.find({

            trainer:
            req.params.trainerId

        });

        const classIds =
        classes.map(

            item=>item._id

        );

        const bookings =
        await Booking.find({

            class:{
                $in:classIds
            }

        })

        .populate(
            "user",
            "name email"
        )

        .populate("class");

        res.json(
            bookings
        );

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports = {

    createBooking,

    getMyBookings,

    getBookingById,

    cancelBooking,

    rescheduleBooking,

    getTrainerBookings

};
