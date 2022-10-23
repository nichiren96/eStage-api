const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Veuillez indiquer votre nom"],
  },
  email: {
    type: String,
    required: [true, "Veuillez fournir une addresse email"],
  },
  password: {
    type: String,
    required: [true, "Veuillez fournir un mot de passe"],
    minlength: 8,
  },
  avatar: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "recruiter", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
