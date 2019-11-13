import _ from 'lodash';
import moment from 'moment';
import { Error } from '../../dto';

export default () => async (req, res, next) => {
  const userAction = _.get(res, 'locals.decodedToken.userAction');
  if (_.isNil(userAction)) {
    const model = Error.Builder.CORRUPTED_TOKEN;
    next(model);
    return;
  }
  if (moment().isAfter(userAction)) {
    const model = Error.Builder.EXPIRED_TOKEN;
    next(model);
    return;
  }
  next();
};
