import { Router } from "express";
import { ProfileController } from "../../controllers";
import Token from "../token";

const router = Router();

router.use(Token());

router.get("/", async (req, res, next) => {
  const { id } = res.locals.decodedToken;
  try {
    const result = await ProfileController.get(id); // It throws an error if not found
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:cuid", async (req, res, next) => {
  const { cuid } = req.params;
  try {
    const result = await ProfileController.get(cuid); // It throws an error if not found
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
