import _ from 'lodash';
import moment from 'moment';
import { Error } from '../../dto';

export default () => async (req, res, next) => {
  const userAction = _.get(res, 'locals.decodedToken.userAction');
  if (_.isNil(userAction)) {
    const model = Error.CORRUPTED_TOKEN;
    next(model);
    return;
  }
  if (moment().isAfter(userAction)) {
    const model = Error.EXPIRED_TOKEN;
    next(model);
    return;
  }
  next();
};
