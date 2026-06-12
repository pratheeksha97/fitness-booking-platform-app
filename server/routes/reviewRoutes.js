const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {

createReview,

getTrainerReviews,

respondToReview,

getReviewAnalytics

}
=
require(
"../controllers/reviewController"
);

router.post(
"/",
protect,
createReview
);

router.get(
"/:trainerId",
getTrainerReviews
);

router.put(
"/respond/:reviewId",
protect,
respondToReview
);

router.get(
"/analytics/:trainerId",
getReviewAnalytics
);

module.exports =
router;