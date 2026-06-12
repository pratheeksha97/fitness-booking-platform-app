const express =
require("express");

const multer =
require("multer");

const router =
express.Router();

const storage =
multer.diskStorage({

destination:
"uploads/trainers",

filename:
(req,file,cb)=>{

cb(
null,
Date.now() +
"-" +
file.originalname
);

}

});

const upload =
multer({storage});

router.post(

"/trainer-photo",

upload.single(
"photo"
),

(req,res)=>{

res.json({

image:
req.file.path

});

}

);

module.exports =
router;