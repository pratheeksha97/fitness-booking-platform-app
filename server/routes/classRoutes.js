const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {
    createClass,
    getAllClasses,
    filterClasses,
    getClassById,
    updateClass,
    deleteClass
}
=
require("../controllers/classController");

router.post(
    "/",
    protect,
    createClass
);

router.get(
    "/",
    getAllClasses
);

router.get(
"/filter",
filterClasses
);

router.get(
    "/:id",
    getClassById
);

router.put(
    "/:id",
    protect,
    updateClass
);


router.delete(
    "/:id",
    protect,
    deleteClass
);

module.exports =
router;