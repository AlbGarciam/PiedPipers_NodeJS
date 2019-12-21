/** Express router providing local related routes
 * @namespace LocalRouter
 * @alias LocalRouter
 * @memberof module:Routes
 */
import { Router } from 'express';
import { LocalController } from '../../controllers';
import { TokenMiddleware, UploadMiddleware } from '../../middlewares';

const router = Router();

/**
 * Route serving local's creation process.
 * @memberof LocalRouter
 * @name Create local
 * @route {POST} local
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @bodyparam {string} name - Local's name
 * @bodyparam {Location} location - Local's location
 * @bodyparam {number} price - Local's price
 * @bodyparam {ContactMethod} contact - Local's contact method
 * @bodyparam {string} description - Local's description
 * @see Success response {@link Local}
 * @see Error response {@link Error}
 */
router.post('/', TokenMiddleware(), async (req, res, next) => {
  const { name, location, price, contact, description, shortDescription } = req.body;
  try {
    const result = await LocalController.create(
      name,
      location,
      price,
      contact,
      [],
      description,
      shortDescription
    );
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * Route serving locals by their cuid.
 * @memberof LocalRouter
 * @name Get local by id
 * @route {GET} local/:cuid
 * @routeparam {string} cuid - Local's unique identifier
 * @see Success response {@link Local}
 * @see Error response {@link Error}
 */
router.get('/:cuid', async (req, res, next) => {
  const { cuid } = req.params;
  try {
    const result = await LocalController.provide(cuid);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * Route serving local's update process.
 * @memberof LocalRouter
 * @name Update local
 * @route {PATCH} /local/:cuid
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @routeparam {string} cuid - Local's cuid
 * @bodyparam {string} name - Local's name
 * @bodyparam {Location} location - Local's location
 * @bodyparam {number} price - Local's price
 * @bodyparam {ContactMethod} contact - Local's contact method
 * @bodyparam {string} description - Local's description
 * @see Success response {@link Local}
 * @see Error response {@link Error}
 */
router.patch('/:cuid', TokenMiddleware(), async (req, res, next) => {
  const { name, location, price, contact, photos, description, shortDescription } = req.body;
  const { cuid } = req.params;
  const model = { name, location, price, contact, photos, description, shortDescription };
  try {
    const result = await LocalController.update(cuid, model); // It throws an error if not found
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * Route serving local's removal process.
 * @memberof LocalRouter
 * @name Delete local
 * @route {DELETE} local/:cuid
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @routeparam {string} cuid - Local's unique identifier
 * @see Success response: HTTP 200
 * @see Error response {@link Error}
 */
router.delete('/:cuid', TokenMiddleware(), async (req, res, next) => {
  const { cuid } = req.params;
  try {
    const result = await LocalController.remove(cuid); // It throws an error if not found
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * Route serving local's image removal process.
 * @memberof LocalRouter
 * @name Delete local image
 * @route {DELETE} local/photo/:cuid
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @routeparam {string} cuid - Local's unique identifier
 * @bodyparam {string} image - Image unique identifier
 * @see Success response {@link Local}
 * @see Error response {@link Error}
 */
router.delete('/photo/:cuid', TokenMiddleware(), async (req, res, next) => {
  const { cuid } = req.params;
  const { image } = req.body;
  try {
    const result = await LocalController.removeImage(cuid, image);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * Route serving local's image removal process.
 * @memberof LocalRouter
 * @name Add local image
 * @route {POST} local/photo/:cuid
 * @authentication This route uses JWT verification. If you don't have the JWT you need to sign in with a valid user
 * @routeparam {string} cuid - Local's unique identifier
 * @bodyparam {file} image - Image
 * @see Success response {@link Local}
 * @see Error response {@link Error}
 */
router.post(
  '/photo/:cuid',
  TokenMiddleware(),
  UploadMiddleware.single('photo'),
  async (req, res, next) => {
    const { cuid } = req.params;
    const { file } = req;
    try {
      const result = await LocalController.insertImage(cuid, file);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
