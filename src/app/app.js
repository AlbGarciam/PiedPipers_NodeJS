import { createError } from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { DBConnection } from "../database";

import { User as UsersRouter, Profile as ProfileRouter } from "../routes";

DBConnection();

const app = express();

// view engine setup
app.use(logger("dev", { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", UsersRouter);
app.use("/profile", ProfileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.code).json(err);
});

export default app;
