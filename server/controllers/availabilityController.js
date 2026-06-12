const Availability =
require("../models/Availability");

const createAvailability =
async(req,res)=>{

    try{

        const availability =
        await Availability.create(
            req.body
        );

        res.status(201).json(
            availability
        );

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const getAvailability =
async(req,res)=>{

    try{

        const availability =
        await Availability.find({

            trainer:
            req.params.trainerId

        });

        res.json(
            availability
        );

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports = {

    createAvailability,

    getAvailability

};