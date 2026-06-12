const Class = require("../models/Class");
const Trainer = require("../models/Trainer");

const createClass = async (req,res)=>{

    try{

        const trainer =
        await Trainer.findOne({
            user:req.user.id
        });

        if(!trainer){

            return res.status(404).json({
                message:"Trainer profile not found"
            });

        }

        const fitnessClass =
        await Class.create({

            trainer:trainer._id,

            title:req.body.title,

            description:req.body.description,

            category:req.body.category,

            duration:req.body.duration,

            price:req.body.price,

            capacity:req.body.capacity,

            availableSeats:req.body.capacity,

            date:req.body.date,

            startTime:req.body.startTime,

            endTime:req.body.endTime

        });

        res.status(201).json(
            fitnessClass
        );

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const getAllClasses =
async(req,res)=>{

    try{

        const classes =
        await Class.find()
        .populate({
            path:"trainer",
            populate:{
                path:"user"
            }
        });

        res.json(classes);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const getClassById =
async(req,res)=>{

    try{

        const fitnessClass =
        await Class.findById(
            req.params.id
        )
        .populate({
            path:"trainer",
            populate:{
                path:"user"
            }
        });

        if(!fitnessClass){

            return res.status(404).json({
                message:"Class not found"
            });

        }

        res.json(
            fitnessClass
        );

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const updateClass =
async(req,res)=>{

    try{

        const updatedClass =
        await Class.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );

        res.json(
            updatedClass
        );

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const filterClasses =
async(req,res)=>{

    try{

        let query = {};

        if(
            req.query.classType
        ){

            query.classType =
            req.query.classType;

        }

        if(
            req.query.duration
        ){

            query.duration =
            Number(
                req.query.duration
            );

        }

        const classes =
        await Class.find(
            query
        );

        res.json(
            classes
        );

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const deleteClass =
async(req,res)=>{

    try{

        await Class.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:"Class deleted successfully"
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports = {
    createClass,
    getAllClasses,
    getClassById,
    updateClass,
    filterClasses,
    deleteClass
};