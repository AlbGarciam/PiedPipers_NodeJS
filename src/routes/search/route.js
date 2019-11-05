import { Router } from 'express';
import { SearchController } from '../../controllers';
import { TokenMiddleware } from '../../middlewares';

const router = Router();

router.use(TokenMiddleware());

router.get('/profile', async (req, res, next) => {
  const { name, instruments, lat, long, friendlyLocation, limit, offset } = req.query;
  try {
    const result = await SearchController.searchProfile(
      name,
      instruments,
      lat,
      long,
      friendlyLocation,
      parseInt(limit, 10) || 10,
      parseInt(offset, 10) || 0
    );
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
