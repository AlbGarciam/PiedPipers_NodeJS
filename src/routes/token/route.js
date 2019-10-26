import { TokenController } from "../../controllers";
import { Error } from "../../dto";
import _ from "lodash";

export default async (req, res, next) => {
  const token = req.header("Authorization");
  try {
    const data = await TokenController.decodeToken(token);
    // If this function does not return anything it will throw an error
    if (_.isNull(data)) {
      next(
        Error.DTO(
          Error.CODE_SERVER_ERROR,
          Error.ECODE_UNKNOWN_ERROR,
          Error.MSG_UNKNOWN_ERROR
        )
      );
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
