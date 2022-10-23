const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Veuillez indiquer le titre de cette annonce"],
  },
  imageUrl: {
    type: String,
    required: [true, "Veuillez choisir une image"],
  },
  company: {
    type: String,
    required: [true, "Veuillez indiquer votre entreprise"],
  },
  location: {
    type: String,
    required: [true, "Veuillez indiquer le lieu de travail"],
  },
  description: {
    type: String,
    required: [true, "Veuillez indiquer le contenu de l'annonce"],
  },
  expirationDate: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Une annonce doit appartenir à un utilisateur"],
  },
});

const Internship = mongoose.model("Internship", internshipSchema);

module.exports = Internship;
