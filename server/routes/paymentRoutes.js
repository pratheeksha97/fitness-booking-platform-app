const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {

createPayment,

mockPaymentSuccess,

getPaymentHistory

}
=
require(
"../controllers/paymentController"
);

router.post(
"/create-order",
protect,
createPayment
);

router.post(
"/success/:id",
protect,
mockPaymentSuccess
);

router.get(
"/history",
protect,
getPaymentHistory
);

module.exports =
router;