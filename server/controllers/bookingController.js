const Booking =require("../models/Booking");
const Class =require("../models/Class");
const User =
require("../models/User");
const sendMail =
require("../utils/sendMail");

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

        await sendMail({

    email: user.email,

    subject: "Fitness Class Booking Confirmed",

    html: `
    <h2>Booking Confirmed</h2>

    <p>Hello ${user.name},</p>

    <p>Your booking has been confirmed.</p>

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
});

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

    await sendMail({

    email: booking.user.email,

    subject: "Booking Cancelled",

    html: `
    <h2>Booking Cancelled</h2>

    <p>Hello ${booking.user.name},</p>

    <p>Your booking has been cancelled successfully.</p>

    <hr>

    <p>
        <strong>Class:</strong>
        ${booking.class.title}
    </p>

    <p>
        <strong>Date:</strong>
        ${new Date(
            booking.class.date
        ).toLocaleDateString()}
    </p>

    <p>
        <strong>Status:</strong>
        Cancelled
    </p>
    `
});

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

    await sendMail({

    email: booking.user.email,

    subject: "Booking Rescheduled",

    html: `
    <h2>Booking Rescheduled</h2>

    <p>Hello ${booking.user.name},</p>

    <p>Your booking has been rescheduled successfully.</p>

    <hr>

    <p>
        <strong>Class:</strong>
        ${booking.class.title}
    </p>

    <p>
        <strong>Old Date:</strong>
        ${new Date(
            booking.originalDate
        ).toLocaleDateString()}
    </p>

    <p>
        <strong>New Date:</strong>
        ${new Date(
            req.body.newDate
        ).toLocaleDateString()}
    </p>

    <p>
        <strong>Status:</strong>
        Rescheduled
    </p>
    `
});

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
