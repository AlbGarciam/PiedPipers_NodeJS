import { createError } from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { DBConnection } from '../database';

import {
  User as UsersRouter,
  Profile as ProfileRouter,
  Search as SearchRouter,
  Local as LocalRouter
} from '../routes';

DBConnection();

const app = express();

// view engine setup
app.use(logger('dev', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', UsersRouter);
app.use('/profile', ProfileRouter);
app.use('/search', SearchRouter);
app.use('/local', LocalRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.code).json(err);
});

export default app;
