/** Express router providing profile related routes
 * @namespace ProfileRouter
 * @alias ProfileRouter
 * @memberof module:Routes
 */
import { Router } from 'express';
import { check } from 'express-validator';
import { ProfileController, NotificationController } from '../../controllers';
import {
  TokenMiddleware,
  ValidationMiddleware,
  UploadMiddleware,
  FollowNotificationMiddleware,
  ValidateImageMiddleware
} from '../../middlewares';

const router = Router();

router.use(TokenMiddleware());

/**
 * Route serving current profile
 * @memberof ProfileRouter
 * @name Get current profile
 * @route {GET} profile/
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @see Success response {@link Profile}
 * @see Error response {@link Error}
 */
router.get('/', async (req, res, next) => {
  const { id } = res.locals.decodedToken;
  try {
    const result = await ProfileController.provide(id); // It throws an error if not found
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * Route serving available profile skills
 * @memberof ProfileRouter
 * @name Get available profile skills
 * @route {GET} profile/tags
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @see Success response {@link List} of {@link Instruments}
 * @see Error response {@link Error}
 */
router.get('/tags', async (req, res) => {
  const result = ProfileController.instruments();
  res.status(200).json(result);
});

/**
 * Route serving current profile's band
 * @memberof ProfileRouter
 * @name Get current profile band
 * @route {GET} profile/my-band
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @see Success response {@link List} of {@link Profile}
 * @see Error response {@link Error}
 */
router.get('/my-band', async (req, res, next) => {
  const { id } = res.locals.decodedToken;
  try {
    const result = await ProfileController.followers(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * Route serving profile by its cuid
 * @memberof ProfileRouter
 * @name Get profile
 * @route {GET} profile/:cuid
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @routeparam {string} cuid - Profile's unique identifier
 * @see Success response {@link Profile}
 * @see Error response {@link Error}
 */
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

/**
 * Route serving profile update process
 * @memberof ProfileRouter
 * @name Update current profile
 * @route {PATCH} profile/
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @bodyparam {string} name - Profile's name
 * @bodyparam {Location} location - Profile's location
 * @bodyparam {ContactMethod} contact - Profile's contact method
 * @bodyparam {string} description - Profile's description
 * @bodyparam {Array.string} videos - Profile's videos identifiers
 * @bodyparam {Array.string} instruments - Profile's skills
 * @bodyparam {string} friendlyLocation - Profile's friendly location
 * @see Success response {@link Profile}
 * @see Error response {@link Error}
 */
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

/**
 * Route serving profile's avatar update process
 * @memberof ProfileRouter
 * @name Update avatar
 * @route {POST} profile/avatar
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @bodyparam {file} file - Image
 * @see Success response {@link Profile}
 * @see Error response {@link Error}
 */
router.post(
  '/avatar',
  UploadMiddleware.single('photo'),
  ValidateImageMiddleware(),
  async (req, res, next) => {
    const { id } = res.locals.decodedToken;
    const { file } = req;
    try {
      const result = await ProfileController.updateAvatar(id, file);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

const followValidations = [
  check('userId')
    .isString()
    .trim()
];

/**
 * Route serving profile's following process
 * @memberof ProfileRouter
 * @name Follow
 * @route {POST} profile/follow
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @bodyparam {string} userId - Profile's unique identifier to follow
 * @see Success response {@link Profile}
 * @see Error response {@link Error}
 */
router.post(
  '/follow',
  followValidations,
  ValidationMiddleware(),
  FollowNotificationMiddleware(),
  async (req, res, next) => {
    const { destinationUser, originUser } = res.locals;
    const { cuid: destinationId } = destinationUser;
    try {
      await NotificationController.follow(originUser, destinationUser);
      const profile = await ProfileController.appendInvite(originUser, destinationId);
      res.status(200).json(profile);
    } catch (err) {
      next(err);
    }
  }
);

const unfollowValidations = [
  check('cuid')
    .isString()
    .trim()
];

/**
 * Route serving profile's unfollowing process
 * @memberof ProfileRouter
 * @name Unfollow
 * @route {POST} profile/unfollow
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @bodyparam {string} userId - Profile's unique identifier to unfollow
 * @see Success response {@link Profile}
 * @see Error response {@link Error}
 */
router.post('/unfollow', unfollowValidations, ValidationMiddleware(), async (req, res, next) => {
  const { id: origin } = res.locals.decodedToken;
  const { userId: destination } = req.body;
  try {
    const profile = await ProfileController.unfollow(origin, destination);
    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
});

export default router;
