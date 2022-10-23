const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email: email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

exports.register = catchAsync(async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    //role: req.body.role
  });

  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    token,
    user,
  });
});

exports.checkAuth = catchAsync(async (req, res, next) => {
  let token;
  // 1) Getting token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
exports.getAllUsers = catchAsync(async (req, res) => {});

exports.getUserInfos = catchAsync(async (req, res) => {
  res.status(200).json({
    name: "Lionel messi",
    club: "PSG",
  });
});
