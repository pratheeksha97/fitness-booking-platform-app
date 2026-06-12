const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Fitness Booking API Running");
});

const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const protect = require("./middleware/authMiddleware");
app.get(
  "/api/profile",
  protect,
  (req, res) => {

    res.json({
      message: "Protected Route Accessed",
      user: req.user
    });

  }
);
const trainerRoutes =require("./routes/trainerRoutes");
app.use(
    "/api/trainers",
    trainerRoutes
);

const path =
require("path");

app.use(

"/uploads",

express.static(

path.join(
__dirname,
"uploads"
)

)

);
const availabilityRoutes = require("./routes/availabilityRoutes");
app.use("/api/availability", availabilityRoutes);

const reviewRoutes =require("./routes/reviewRoutes");
app.use(
  "/api/reviews",
  reviewRoutes
);

const classRoutes =require("./routes/classRoutes");
app.use(
    "/api/classes",
    classRoutes
);
const recommendationRoutes =require("./routes/recommendationRoutes");
app.use(
"/api/recommendations",
recommendationRoutes
);

const bookingRoutes =require("./routes/bookingRoutes");
app.use(
    "/api/bookings",
    bookingRoutes
);

const userRoutes =require("./routes/userRoutes");

app.use(
    "/api/users",
    userRoutes
);

const paymentRoutes =require("./routes/paymentRoutes");
app.use(
    "/api/payments",
    paymentRoutes
);

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});