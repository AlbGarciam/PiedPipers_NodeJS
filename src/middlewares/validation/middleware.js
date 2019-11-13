import _ from 'lodash';
import { validationResult } from 'express-validator';
import { Error } from '../../dto';

export default () => async (req, res, next) => {
  if (!_.isEmpty(!validationResult(req))) {
    next(Error.Builder.VALIDATION(Error.MSG_VALIDATION_ERROR));
  } else {
    next();
  }
};
