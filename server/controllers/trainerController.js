const Trainer = require("../models/Trainer");

const createTrainerProfile = async (
  req,
  res
) => {

  try {

    const trainer =
    await Trainer.create({

      trainerName:
      req.body.trainerName,

      user: req.user.id,

      name: req.body.name,

      bio: req.body.bio,

      experience: req.body.experience,

      specializations:
      req.body.specializations,

      certifications:
      req.body.certifications,

      qualifications:
      req.body.qualifications,

      hourlyRate:
      req.body.hourlyRate,

      photo:
      req.body.photo,

      introVideo:
      req.body.introVideo,

      introMessage:
      req.body.introMessage

    });

    res.status(201).json(
      trainer
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getTrainerProfile = async (
  req,
  res
) => {

  try {

    const trainer =
    await Trainer.findById(
      req.params.id
    )
    .populate(
      "user",
      "name email"
    );

    if (!trainer) {

      return res.status(404)
      .json({
        message:
        "Trainer not found"
      });

    }

    res.json(
      trainer
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getAllTrainers =
async (req, res) => {

  try {

    const trainers =
    await Trainer.find()

    .populate(
      "user",
      "name email"
    );

    res.json(
      trainers
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const searchTrainer =
async (req, res) => {

  try {

    const specialization =
    req.query.specialization;

    const trainers =
    await Trainer.find({

      specializations:
      specialization

    })

    .populate(
      "user",
      "name email"
    );

    res.json(
      trainers
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const updateTrainerProfile =
async (req, res) => {

  try {

    const trainer =
    await Trainer.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true
      }

    )

    .populate(
      "user",
      "name email"
    );

    if (!trainer) {

      return res.status(404)
      .json({
        message:
        "Trainer not found"
      });

    }

    res.json(
      trainer
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {

  createTrainerProfile,

  getAllTrainers,

  getTrainerProfile,

  searchTrainer,

  updateTrainerProfile

};