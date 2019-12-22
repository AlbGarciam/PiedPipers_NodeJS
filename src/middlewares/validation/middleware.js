import _ from 'lodash';
import { validationResult } from 'express-validator';
import { Error } from '../../dto';
import { ERROR_MSG } from '../../constants';

export default () => async (req, res, next) => {
  if (!_.isEmpty(!validationResult(req))) {
    next(Error.VALIDATION(ERROR_MSG.MSG_VALIDATION_ERROR));
  } else {
    next();
  }
};
