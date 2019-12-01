/* eslint-disable no-console */
import { createError } from 'http-errors';
import _ from 'lodash';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { DBConnection } from '../database';
import { Error } from '../dto';

import {
  User as UsersRouter,
  Profile as ProfileRouter,
  Search as SearchRouter,
  Local as LocalRouter,
  Notification as NotificationRouter
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
app.use('/notification', NotificationRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (!_.isNil(err) && !_.isNil(err.code)) {
    res.status(err.code).json(err);
  } else {
    console.error(Date());
    console.error(req);
    console.error(err.stack);
    const dto = Error.Builder.UNKNOWN(err.message);
    res.status(500).json(dto);
  }
});

export default app;
