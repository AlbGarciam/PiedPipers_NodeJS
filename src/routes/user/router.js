import { Router } from "express";
import { UserController } from "../../controllers";
import _ from "lodash";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const result = await UserController.login(
      req.body.email,
      req.body.password
    );
    if (_.isNull(result)) {
      res.status(403).json({ message: "UNAUTHORIZED" });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
    return;
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const result = await UserController.create(
      req.body.email,
      String(req.body.password)
    );
    if (_.isNull(result)) {
      res.status(500).json({ message: "Failure" });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
    return;
  }
});

export default router;
