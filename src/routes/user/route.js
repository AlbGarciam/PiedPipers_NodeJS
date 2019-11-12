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

export default router;
