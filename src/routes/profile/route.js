import { Router } from 'express';
import { check } from 'express-validator';
import { ProfileController } from '../../controllers';
import { TokenMiddleware, ValidationMiddleware } from '../../middlewares';

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
  const { name, location, contact, description, videos, instruments } = req.body;
  const model = {
    name,
    location,
    contactMe: contact,
    description,
    videos,
    instruments
  };
  try {
    const result = await ProfileController.update(id, model); // It throws an error if not found
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
