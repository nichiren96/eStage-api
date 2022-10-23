const catchAsync = require("../utils/catchAsync");
const Internship = require("../models/internship");

exports.getAllInternships = catchAsync(async (req, res) => {
  const internships = await Internship.find({});
  res.status(200).json({
    internships,
  });
});

exports.getOneInternship = catchAsync(async (req, res) => {
  const internshipId = req.params.id;
  const internship = await Internship.findById(internshipId);
  res.status(200).json({
    status: "success",
    internship,
  });
});

exports.createInternship = catchAsync(async (req, res) => {
  const newInternship = await Internship.create(req.body);
  res.status(201).json({
    status: "success",
    newInternship,
  });
});
