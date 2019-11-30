import { Router } from 'express';
import { NotificationController, ProfileController } from '../../controllers';
import { TokenMiddleware, RedeemNotification } from '../../middlewares';
import { NOTIFICATION_TYPES } from '../../constants';

const router = Router();

router.use(TokenMiddleware());

router.get('/', async (req, res, next) => {
  const { id } = res.locals.decodedToken;
  const { limit, offset } = req.query;
  try {
    const result = await NotificationController.list(
      id,
      parseInt(limit, 10) || 10,
      parseInt(offset, 10) || 0
    );
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete('/:cuid', async (req, res, next) => {
  const { cuid } = req.params;
  try {
    const result = await NotificationController.remove(cuid);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/redeem/:cuid', RedeemNotification(), async (req, res, next) => {
  const { redeemedNotification: notification } = res.locals;
  try {
    const { notificationType = '', data } = notification;
    switch (notificationType) {
      case NOTIFICATION_TYPES.FOLLOW:
        await ProfileController.finalizeFollow(data);
        break;
      default:
        break;
    }
    res.status(200).json(notification);
  } catch (err) {
    next(err);
  }
});

/**
 * PENDING WORK
 *
 * Create a router for notifications. This will be in charge of handle notifications operations
 * Create unfollow route on profile to remove followers
 * Add a method on ProfileController to register/deregister a user on followers
 */

export default router;
