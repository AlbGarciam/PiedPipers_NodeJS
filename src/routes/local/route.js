import { Router } from 'express';
import { LocalController } from '../../controllers';
import { TokenMiddleware, UploadMiddleware } from '../../middlewares';

const router = Router();

router.use(TokenMiddleware());

router.post('/', async (req, res, next) => {
  const { name, location, price, contact, description } = req.body;
  try {
    const result = await LocalController.create(name, location, price, contact, [], description);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.patch('/:cuid', async (req, res, next) => {
  const { name, location, price, contact, photos, description } = req.body;
  const { cuid } = req.params;
  const model = { name, location, price, contact, photos, description };
  try {
    const result = await LocalController.update(cuid, model); // It throws an error if not found
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete('/:cuid', async (req, res, next) => {
  const { cuid } = req.params;
  try {
    const result = await LocalController.remove(cuid); // It throws an error if not found
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete('/photo/:cuid', async (req, res, next) => {
  const { cuid } = req.params;
  const { image } = req.body;
  try {
    const result = await LocalController.insertImage(cuid, image);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/photo/:cuid', UploadMiddleware.single('photo'), async (req, res, next) => {
  const { cuid } = req.params;
  const { file } = req;
  try {
    const result = await LocalController.insertImage(cuid, file);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
