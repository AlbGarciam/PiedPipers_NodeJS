/** Express router providing user related routes
 * @namespace UserRouter
 * @alias UserRouter
 * @memberof module:Routes
 */
import { Router } from 'express';
import { check } from 'express-validator';
import _ from 'lodash';
import { UserController, TokenController, ProfileController } from '../../controllers';
import { TokenMiddleware, ValidationMiddleware, UserActionMiddleware } from '../../middlewares';

const router = Router();

const loginValidations = [
  check('email')
    .isEmail()
    .trim(),
  check('password')
    .isString()
    .isLength({ min: 5 })
    .trim()
];

/**
 * Route serving user's login.
 * @memberof UserRouter
 * @name Login
 * @route {POST} user/login
 * @bodyparam {string} email - User's email
 * @bodyparam {string} password - User's password. It must have 5 or more characters
 * @see Success response {@link User}
 * @see Error response {@link module:dto/error ErrorDTO}
 */
router.post('/login', loginValidations, ValidationMiddleware(), async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await UserController.login(email, password);
    if (_.isNull(result)) {
      res.status(403).json({ message: 'UNAUTHORIZED' });
      return;
    }
    const token = TokenController.encodeToken(result);
    res.setHeader('Authorization', token);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

const createValidations = [
  check('email')
    .isEmail()
    .trim(),
  check('password')
    .isString()
    .isLength({ min: 5 })
    .trim()
];

/**
 * Route serving authorization token generation process
 * @memberof UserRouter
 * @name Create user
 * @route {POST} user/create
 * @bodyparam {string} email - User's email
 * @bodyparam {string} password - User's password. It must have 5 or more characters
 * @see Success response {@link User}
 * @see Error response {@link module:dto/error ErrorDTO}
 */
router.post('/create', createValidations, ValidationMiddleware(), async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await UserController.create(email, password);
    if (_.isNull(result)) {
      res.status(500).json({ message: 'Failure' });
      return;
    }
    const token = TokenController.encodeToken(result);
    res.setHeader('Authorization', token);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

const updateValidations = [
  check('password')
    .isString()
    .trim()
    .isLength({ min: 5 })
];

/**
 * Route serving user's password change.
 * @memberof UserRouter
 * @name Update password
 * @route {PATCH} user/update
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user.
 * @bodyparam {string} password - User's password. It must have 5 or more characters
 * @see Success response {@link User}
 * @see Error response {@link module:dto/error ErrorDTO}
 */
router.patch(
  '/update',
  updateValidations,
  ValidationMiddleware(),
  TokenMiddleware(),
  UserActionMiddleware(),
  async (req, res, next) => {
    const { id } = res.locals.decodedToken;
    const { password } = req.body;
    try {
      const result = await UserController.updatePassword(id, password);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Route serving user's removal process.
 * @memberof UserRouter
 * @name Remove user
 * @route {DELETE} user/
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @bodyparam {string} password - User's password. It must have 5 or more characters
 * @see Success response: HTTP 200 OK
 * @see Error response: {@link module:dto/error ErrorDTO}
 */
router.delete('/', TokenMiddleware(), UserActionMiddleware(), async (req, res, next) => {
  const { id } = res.locals.decodedToken;
  try {
    await ProfileController.remove(id);
    await UserController.remove(id);
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
});

/**
 * Route serving user's email from a given id.
 * @memberof UserRouter
 * @name Get user from cuid
 * @route {GET} user/email
 * @routeParam {string} cuid - User's unique identifier. It must have 5 or more characters
 * @see Success response: {@link module:dto/user UserDTO}
 * @see Error response: {@link module:dto/error ErrorDTO}
 */
router.get('/email/:cuid', async (req, res, next) => {
  const { cuid } = req.params;
  try {
    const result = await ProfileController.get(cuid);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
