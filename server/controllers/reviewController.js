const Review =
require("../models/Review");

const Trainer =
require("../models/Trainer");

/*
-----------------------------------
Create Review
-----------------------------------
*/

const createReview =
async(req,res)=>{

try{

const review =
await Review.create({

trainer:
req.body.trainerId,

user:
req.user.id,

rating:
req.body.rating,

comment:
req.body.comment

});

/*
Update Trainer Rating
*/

const reviews =
await Review.find({

trainer:
req.body.trainerId

});

const totalReviews =
reviews.length;

const averageRating =

reviews.reduce(

(sum,item)=>

sum + item.rating,

0

)

/

totalReviews;

await Trainer.findByIdAndUpdate(

req.body.trainerId,

{

rating:
averageRating.toFixed(1),

totalReviews

}

);

res.status(201).json(
review
);

}catch(error){

res.status(500).json({
message:error.message
});

}

};

/*
-----------------------------------
Get Trainer Reviews
-----------------------------------
*/

const getTrainerReviews =
async(req,res)=>{

try{

const reviews =
await Review.find({

trainer:
req.params.trainerId

})

.populate(
"user",
"name"
)

.sort({
createdAt:-1
});

res.json(
reviews
);

}catch(error){

res.status(500).json({
message:error.message
});

}

};

/*
-----------------------------------
Trainer Reply
-----------------------------------
*/

const respondToReview =
async(req,res)=>{

try{

const review =
await Review.findById(
req.params.reviewId
);

if(!review){

return res.status(404)
.json({

message:
"Review not found"

});

}

review.trainerResponse =
req.body.response;

review.responseDate =
new Date();

await review.save();

res.json({

message:
"Response added successfully",

review

});

}catch(error){

res.status(500).json({
message:error.message
});

}

};

/*
-----------------------------------
Review Analytics
-----------------------------------
*/

const getReviewAnalytics =
async(req,res)=>{

try{

const reviews =
await Review.find({

trainer:
req.params.trainerId

});

const totalReviews =
reviews.length;

const averageRating =

totalReviews > 0

?

reviews.reduce(

(sum,item)=>

sum + item.rating,

0

)

/

totalReviews

:

0;

/*
Star Breakdown
*/

const fiveStar =
reviews.filter(
item=>item.rating===5
).length;

const fourStar =
reviews.filter(
item=>item.rating===4
).length;

const threeStar =
reviews.filter(
item=>item.rating===3
).length;

const twoStar =
reviews.filter(
item=>item.rating===2
).length;

const oneStar =
reviews.filter(
item=>item.rating===1
).length;

res.json({

totalReviews,

averageRating:
averageRating.toFixed(1),

fiveStar,

fourStar,

threeStar,

twoStar,

oneStar

});

}catch(error){

res.status(500).json({
message:error.message
});

}

};

module.exports = {

createReview,

getTrainerReviews,

respondToReview,

getReviewAnalytics

};