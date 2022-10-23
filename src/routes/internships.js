const express = require("express");
const router = express.Router();

const authController = require("../controllers/users");
const {
  getOneInternship,
  getAllInternships,
  createInternship,
} = require("../controllers/internships");

router.route("/").get(getAllInternships).post(createInternship);
router.route("/:id").get(authController.checkAuth, getOneInternship);

module.exports = router;
