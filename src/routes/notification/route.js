/** Express router providing notification related routes
 * @namespace NotificationRouter
 * @alias NotificationRouter
 * @memberof module:Routes
 */
import { Router } from 'express';
import { check } from 'express-validator';
import { NotificationController, ProfileController } from '../../controllers';
import { TokenMiddleware, RedeemNotification, ValidationMiddleware } from '../../middlewares';
import { NOTIFICATION_TYPES } from '../../constants';

const router = Router();

router.use(TokenMiddleware());

/**
 * Route serving list of user notifications.
 * @memberof NotificationRouter
 * @name List notifications
 * @route {GET} /notification
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @queryparam {?number} limit - Maximun number of notifications. By default it takes 10
 * @queryparam {?number} offset - Skips notifications
 * @see Success response {@link List} of {@link Notification}
 * @see Error response {@link Error}
 */
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

/**
 * Route serving notifications removal process
 * @memberof NotificationRouter
 * @name Delete notification
 * @route {DELETE} /notification/:cuid
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @routeparam {string} cuid - Notification unique identifier
 * @see HTTP 200 OK
 * @see Error response {@link Error}
 */
router.delete('/:cuid', async (req, res, next) => {
  const { cuid } = req.params;
  try {
    const result = await NotificationController.remove(cuid);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * Route serving notifications redeem process
 * @memberof NotificationRouter
 * @name Redeem notification
 * @route {GET} /notification/redeem/:cuid
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @routeparam {string} cuid - Notification unique identifier
 * @see Success response {@link Notification}
 * @see Error response {@link Error}
 */
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

const registerUnregisterValidations = [
  check('token')
    .isString()
    .trim()
];

/**
 * Route serving push notification token registration process
 * @memberof NotificationRouter
 * @name Redeem notification
 * @route {POST} /notification/register
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @bodyparam {string} cuid - Notification token
 * @see Success response: HTTP 200 OK
 * @see Error response {@link Error}
 */
router.post(
  '/register',
  registerUnregisterValidations,
  ValidationMiddleware(),
  async (req, res, next) => {
    const { id } = res.locals.decodedToken;
    const { token } = req.body;
    try {
      const result = await NotificationController.register(token, id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Route serving push notification token unregistration process
 * @memberof NotificationRouter
 * @name Redeem notification
 * @route {DELETE} /notification/unregister
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @bodyparam {string} cuid - Notification token
 * @see Success response: HTTP 200 OK
 * @see Error response {@link Error}
 */
router.delete(
  '/unregister',
  registerUnregisterValidations,
  ValidationMiddleware(),
  async (req, res, next) => {
    const { id } = res.locals.decodedToken;
    const { token } = req.body;
    try {
      await NotificationController.unregister(token, id);
      res.status(200).json({});
    } catch (err) {
      next(err);
    }
  }
);

export default router;
