const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");
const upload =
require("../middleware/uploadMiddleware");

router.post(
  "/upload",
  protect,
  upload.single("image"),
  (req,res)=>{

    res.json({
      image:req.file.filename
    });

  }
);

const {
    createTrainerProfile,
    getTrainerProfile,
    getAllTrainers,
    searchTrainer,
    updateTrainerProfile
}
=
require("../controllers/trainerController");


router.get(
  "/search",
  searchTrainer
);

router.post(
    "/",
    protect,
    createTrainerProfile
);

router.get(
  "/",
  getAllTrainers
);

router.get(
    "/:id",
    getTrainerProfile
);

router.put(
  "/:id",
  protect,
  updateTrainerProfile
);


module.exports = router;