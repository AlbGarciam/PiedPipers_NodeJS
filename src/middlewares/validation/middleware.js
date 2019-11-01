import { validationResult } from "express-validator";
import { Error } from "../../dto";
import _ from "lodash";

export default () => async (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    next(
      Error.DTO(
        Error.CODE_VALIDATION_ERROR,
        Error.ECODE_VALIDATION_ERROR,
        Error.MSG_VALIDATION_ERROR
      )
    );
  } else {
    next();
  }
};
