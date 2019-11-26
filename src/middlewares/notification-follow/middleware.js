import _ from 'lodash';
import { ProfileController } from '../../controllers';
import { Error } from '../../dto';

export default () => async (req, res, next) => {
  const { userId } = req.body;
  if (_.isNil(userId)) {
    next(Error.Builder.VALIDATION(Error.MSG_MISSING_USER_ID));
    return;
  }
  const destUser = await ProfileController.provide(userId);
  if (_.isNil(destUser)) {
    next(Error.Builder.ITEM_NOT_FOUND);
  } else {
    next();
  }
};
