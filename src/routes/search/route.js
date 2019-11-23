import { Router } from 'express';
import { SearchController } from '../../controllers';
import { TokenMiddleware } from '../../middlewares';

const router = Router();

router.use(TokenMiddleware());

router.get('/profile', async (req, res, next) => {
  const { name, instruments, lat, long, maxDistance, friendlyLocation, limit, offset } = req.query;
  try {
    const result = await SearchController.searchProfile(
      name,
      instruments,
      lat,
      long,
      maxDistance,
      friendlyLocation,
      parseInt(limit, 10) || 10,
      parseInt(offset, 10) || 0
    );
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/local', async (req, res, next) => {
  const { name, lat, long, price, maxDistance, limit, offset } = req.query;
  try {
    const result = await SearchController.searchLocal(
      name,
      lat,
      long,
      maxDistance,
      price,
      parseInt(limit, 10) || 10,
      parseInt(offset, 10) || 0
    );
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
