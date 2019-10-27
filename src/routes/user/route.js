import { Router } from "express";
import { UserController, TokenController } from "../../controllers";
import { check, validationResult } from "express-validator";
import Token from "../token";
import { Error } from "../../dto";
import _ from "lodash";

const router = Router();

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .trim(),
    check("password")
      .isString()
      .isLength({ min: 5 })
      .trim()
  ],
  async (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
      next(
        Error.DTO(
          Error.CODE_VALIDATION_ERROR,
          Error.ECODE_VALIDATION_ERROR,
          Error.MSG_VALIDATION_ERROR
        )
      );
      return;
    }
    const { email, password } = req.body;
    try {
      const result = await UserController.login(email, password);
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
  }
);

router.post(
  "/create",
  [
    check("email")
      .isEmail()
      .trim(),
    check("password")
      .isString()
      .isLength({ min: 5 })
      .trim()
  ],
  async (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
      next(
        Error.DTO(
          Error.CODE_VALIDATION_ERROR,
          Error.ECODE_VALIDATION_ERROR,
          Error.MSG_VALIDATION_ERROR
        )
      );
      return;
    }
    const { email, password } = req.body;
    try {
      const result = await UserController.create(email, password);
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
  }
);

router.patch(
  "/update",
  [
    check("password")
      .isString()
      .trim()
      .isLength({ min: 5 })
  ],
  Token(),
  async (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
      next(
        Error.DTO(
          Error.CODE_VALIDATION_ERROR,
          Error.ECODE_VALIDATION_ERROR,
          Error.MSG_VALIDATION_ERROR
        )
      );
      return;
    }
    const { userAction, id } = res.locals.decodedToken;
    const { password } = req.body;
    try {
      const result = await UserController.updatePassword(
        id,
        password,
        userAction
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
