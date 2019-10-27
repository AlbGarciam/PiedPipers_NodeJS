import { validationResult } from "express-validator";
import { Error } from "../../dto";
import _ from "lodash";

export default () => async (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    console.error("error in validations");
    next(
      Error.DTO(
        Error.CODE_VALIDATION_ERROR,
        Error.ECODE_VALIDATION_ERROR,
        Error.MSG_VALIDATION_ERROR
      )
    );
  } else {
    console.error("success in validations");
    next();
  }
};
