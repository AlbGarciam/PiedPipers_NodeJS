/** Express router providing search related routes
 * @namespace SearchRouter
 * @alias SearchRouter
 * @memberof module:Routes
 */
import { Router } from 'express';
import { SearchController } from '../../controllers';

const router = Router();

/**
 * Route serving profile searching process. This this API is authenticated, it won't response the current profile. If not, current profile can be added to the response
 * @memberof SearchRouter
 * @name Search profiles
 * @route {GET} serach/profile
 * @authentication OPTIONAL This route can use JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @queryparam {?string} name - Profile's name
 * @queryparam {?string} instruments - Profile's skills separated by commas
 * @queryparam {?number} lat - Profile's latitude. Must be present if long or maxDistance exists
 * @queryparam {?number} long - Profile's longitude. Must be present if lat or maxDistance exists
 * @queryparam {?number} maxDistance - Profile's search radius (in km). Must be present if long or lat exists
 * @queryparam {?string} friendlyLocation - Profile's friendly location.
 * @queryparam {?number} limit - Maximun number of profiles. By default it takes 10
 * @queryparam {?number} offset - Skips profiles
 * @see Success response {@link List} of {@link Profile}
 * @see Error response: {@link module:dto/error ErrorDTO}
 */
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

/**
 * Route serving local searching process.
 * @memberof SearchRouter
 * @name Search locals
 * @route {GET} serach/local
 * @queryparam {?string} name - Local's name
 * @queryparam {?number} price - Local's max price
 * @queryparam {?number} lat - Profile's latitude. Must be present if long or maxDistance exists
 * @queryparam {?number} long - Profile's longitude. Must be present if lat or maxDistance exists
 * @queryparam {?number} maxDistance - Profile's search radius (in km). Must be present if long or lat exists
 * @queryparam {?number} limit - Maximun number of profiles. By default it takes 10
 * @queryparam {?number} offset - Skips profiles
 * @see Success response {@link List} of {@link Local}
 * @see Error response: {@link module:dto/error ErrorDTO}
 */
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
