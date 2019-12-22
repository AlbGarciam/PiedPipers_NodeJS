import _ from 'lodash';
import { TokenController } from '../../controllers';
import { Error } from '../../dto';
import { ERROR_MSG } from '../../constants';

export default () => async (req, res, next) => {
  const token = req.header('Authorization');
  try {
    const data = await TokenController.decodeToken(token);
    // If this function does not return anything it will throw an error
    if (_.isNull(data)) {
      next(Error.UNKNOWN(ERROR_MSG.MSG_UNKNOWN_ERROR));
    } else {
      res.locals.decodedToken = data;
      res.setHeader('Authorization', token);
      next();
    }
  } catch (err) {
    next(err);
  }
};
