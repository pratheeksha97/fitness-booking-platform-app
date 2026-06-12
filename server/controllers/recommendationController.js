const User = require("../models/User");
const Booking = require("../models/Booking");
const Class = require("../models/Class");

const getRecommendations = async (req, res) => {

  try {

    const user = await User.findById(
      req.user.id
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    let recommendations = [];

    /*
    ---------------------------------
    FITNESS GOAL BASED RECOMMENDATION
    ---------------------------------
    */

    const goal =
    user.fitnessGoal || "";

    if (goal === "Weight Loss") {

      recommendations =
      await Class.find({

        category: {
          $in: [
            "Cardio",
            "Zumba"
          ]
        }

      })
      .sort({ createdAt: -1 })
      .limit(6);

    }

    else if (
      goal === "Muscle Gain"
    ) {

      recommendations =
      await Class.find({

        category:
        "Strength Training"

      })
      .sort({ createdAt: -1 })
      .limit(6);

    }

    else if (
      goal === "Flexibility"
    ) {

      recommendations =
      await Class.find({

        category:
        "Yoga"

      })
      .sort({ createdAt: -1 })
      .limit(6);

    }

    /*
    ---------------------------------
    BOOKING HISTORY BASED
    ---------------------------------
    */

    if (
      recommendations.length === 0
    ) {

      const bookings =
      await Booking.find({

        user: user._id

      })
      .populate("class");

      let categories = [];

      bookings.forEach(
        booking => {

          if (
            booking.class &&
            booking.class.category
          ) {

            categories.push(
              booking.class.category
            );

          }

        }
      );

      categories = [
        ...new Set(categories)
      ];

      if (
        categories.length > 0
      ) {

        recommendations =
        await Class.find({

          category: {
            $in: categories
          }

        })
        .sort({
          createdAt: -1
        })
        .limit(6);

      }

    }

    /*
    ---------------------------------
    FALLBACK
    NEW USER / NO BOOKINGS
    ---------------------------------
    */

    if (
      recommendations.length === 0
    ) {

      recommendations =
      await Class.find()

      .sort({
        createdAt: -1
      })

      .limit(6);

    }

    console.log(
"Fitness Goal:",
user.fitnessGoal
);

console.log(
"Recommendations:",
recommendations
);

    res.status(200).json(
      recommendations
    );

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:
      error.message

    });

  }

};

module.exports = {

  getRecommendations

};