import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  console.log("Request received");
  res.status(200).send("todo OK jose luis!");
});

export default router;
