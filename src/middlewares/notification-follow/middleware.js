import _ from 'lodash';
import { ProfileController } from '../../controllers';
import { Error } from '../../dto';
import { ERROR_MSG } from '../../constants';

export default () => async (req, res, next) => {
  const { userId: destinationId } = req.body;
  const { id: originId } = res.locals.decodedToken;

  if (_.isNil(destinationId) || _.isNil(originId)) {
    next(Error.VALIDATION(ERROR_MSG.MSG_MISSING_USER_ID));
    return;
  }

  if (originId === destinationId) {
    next(Error.VALIDATION(ERROR_MSG.MSG_NOTIFICATION_INVALID_RECIPIENT));
    return;
  }

  let originUser = null;
  let destinationUser = null;
  try {
    originUser = await ProfileController.provide(originId);
    destinationUser = await ProfileController.provide(destinationId);
    if (_.isNil(destinationUser) || _.isNil(originUser)) {
      next(Error.ITEM_NOT_FOUND);
      return;
    }
  } catch (err) {
    next(err);
    return;
  }

  const { invitations = [], followers = [] } = originUser;
  if (invitations.includes(destinationId)) {
    next(Error.INVITED_USER);
    return;
  }

  if (followers.includes(destinationId)) {
    next(Error.ALREADY_FOLLOWING);
    return;
  }

  res.locals = {
    ...res.locals,
    destinationUser,
    originUser
  };
  next();
};
