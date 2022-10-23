const express = require("express");
const router = express.Router();

const {
  login,
  getUserInfos,
  register,
  checkAuth,
  getAllUsers,
} = require("../controllers/users");

router.route("/login").post(login);
router.route("/register").post(register);

router.route("/").get(checkAuth, getAllUsers);
router.route("/:userId").get(checkAuth, getUserInfos);

module.exports = router;
