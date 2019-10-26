import { Router } from "express";
import { UserController, TokenController } from "../../controllers";
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
      return;
    }
    const token = TokenController.encodeToken(result);
    res.setHeader("Authorization", token);
    res.status(200).json(result);
  } catch (err) {
    next(err);
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
      return;
    }
    const token = TokenController.encodeToken(result);
    res.setHeader("Authorization", token);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
