import { Router } from 'express';
import { check } from 'express-validator';
import _ from 'lodash';
import { UserController, TokenController } from '../../controllers';
import { TokenMiddleware, ValidationMiddleware } from '../../middlewares';

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
  async (req, res, next) => {
    const { userAction, id } = res.locals.decodedToken;
    const { password } = req.body;
    try {
      const result = await UserController.updatePassword(id, password, userAction);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
