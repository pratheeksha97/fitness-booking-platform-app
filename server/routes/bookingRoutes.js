const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {

    createBooking,

    getMyBookings,

    getBookingById,

    cancelBooking,

    rescheduleBooking,

    getTrainerBookings

}
=
require("../controllers/bookingController");


// ======================
// Create Booking
// POST /api/bookings
// ======================

router.post(
    "/",
    protect,
    createBooking
);


// ======================
// My Bookings
// GET /api/bookings/my-bookings
// ======================

router.get(
    "/my-bookings",
    protect,
    getMyBookings
);


// ======================
// Trainer Schedule
// GET /api/bookings/trainer/:trainerId
// ======================

router.get(
    "/trainer/:trainerId",
    protect,
    getTrainerBookings
);


// ======================
// Booking Details
// GET /api/bookings/:id
// ======================

router.get(
    "/:id",
    protect,
    getBookingById
);


// ======================
// Reschedule Booking
// PUT /api/bookings/reschedule/:id
// ======================

router.put(
    "/reschedule/:id",
    protect,
    rescheduleBooking
);


// ======================
// Cancel Booking
// DELETE /api/bookings/:id
// ======================

router.delete(
    "/:id",
    protect,
    cancelBooking
);

module.exports =
router;