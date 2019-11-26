import { Router } from 'express';
import { check } from 'express-validator';
import { ProfileController, NotificationController } from '../../controllers';
import {
  TokenMiddleware,
  ValidationMiddleware,
  UploadMiddleware,
  FollowNotificationMiddleware
} from '../../middlewares';

const router = Router();

router.use(TokenMiddleware());

router.get('/', async (req, res, next) => {
  const { id } = res.locals.decodedToken;
  try {
    const result = await ProfileController.provide(id); // It throws an error if not found
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/tags', async (req, res) => {
  const result = ProfileController.instruments();
  res.status(200).json(result);
});

router.get('/:cuid', async (req, res, next) => {
  const { cuid } = req.params;
  try {
    const result = await ProfileController.provide(cuid); // It throws an error if not found
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

const patchValidations = [
  check('name')
    .optional()
    .isString()
    .trim(),
  check('description')
    .optional()
    .isString()
    .trim()
];

router.patch('/', patchValidations, ValidationMiddleware(), async (req, res, next) => {
  const { id } = res.locals.decodedToken;
  const { name, location, contact, description, videos, instruments, friendlyLocation } = req.body;
  const model = {
    name,
    location,
    contactMe: contact,
    description,
    videos,
    instruments,
    friendlyLocation
  };
  try {
    const result = await ProfileController.update(id, model); // It throws an error if not found
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/avatar', UploadMiddleware.single('photo'), async (req, res, next) => {
  const { id } = res.locals.decodedToken;
  const { file } = req;
  try {
    const result = await ProfileController.updateAvatar(id, file);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

const followValidations = [
  check('userId')
    .isString()
    .trim()
];

router.post(
  '/follow',
  followValidations,
  ValidationMiddleware(),
  FollowNotificationMiddleware(),
  async (req, res, next) => {
    const { id } = res.locals.decodedToken;
    const { userId } = req.body;

    try {
      const result = await NotificationController.createFollow(id, userId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PENDING WORK
 *
 * Create a router for notifications. This will be in charge of handle notifications operations
 * Create unfollow route on profile to remove followers
 * Add a method on ProfileController to register/deregister a user on followers
 * Update db models to handle an array of followers
 */

export default router;
