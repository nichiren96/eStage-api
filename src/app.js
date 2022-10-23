const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const AppError = require("./utils/appError");

const app = express();

const userRouter = require("./routes/users");
const internshipsRouter = require("./routes/internships");


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/internships", internshipsRouter);


app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
