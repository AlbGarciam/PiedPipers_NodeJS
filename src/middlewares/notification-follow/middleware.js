import _ from 'lodash';
import { ProfileController } from '../../controllers';
import { Error } from '../../dto';

export default () => async (req, res, next) => {
  const { userId: destinationId } = req.body;
  const { id: originId } = res.locals.decodedToken;

  if (_.isNil(destinationId) || _.isNil(originId)) {
    next(Error.Builder.VALIDATION(Error.MSG_MISSING_USER_ID));
    return;
  }

  let originUser = null;
  let destinationUser = null;
  try {
    originUser = await ProfileController.provide(originId);
    destinationUser = await ProfileController.provide(destinationId);
    if (_.isNil(destinationUser) || _.isNil(originUser)) {
      next(Error.Builder.ITEM_NOT_FOUND);
      return;
    }
  } catch (err) {
    next(err);
    return;
  }

  const { invitations = [], followers = [] } = originUser;
  if (invitations.includes(destinationId) || followers.includes(destinationId)) {
    next(Error.Builder.INVITED_USER);
    return;
  }

  res.locals = {
    ...res.locals,
    destinationUser,
    originUser
  };
  next();
};
