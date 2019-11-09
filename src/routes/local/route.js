import { Router } from 'express';
import { LocalController } from '../../controllers';
import { TokenMiddleware } from '../../middlewares';

const router = Router();

router.use(TokenMiddleware());

router.post('/', async (req, res, next) => {
  const { name, location, price, contact, photos, description } = req.body;
  try {
    const result = await LocalController.create(
      name,
      location,
      price,
      contact,
      photos,
      description
    );
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.patch('/:cuid', async (req, res, next) => {
  const { name, location, price, contact, photos, description } = req.body;
  const { cuid } = req.params;
  console.log(cuid);
  const model = { name, location, price, contact, photos, description };
  try {
    const result = await LocalController.update(cuid, model); // It throws an error if not found
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// router.post('/photo', UploadMiddleware.single('photo'), async (req, res, next) => {
//   const { id } = res.locals.decodedToken;
//   const { file } = req;
//   try {
//     const result = await ProfileController.updateAvatar(id, file);
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// });

export default router;
