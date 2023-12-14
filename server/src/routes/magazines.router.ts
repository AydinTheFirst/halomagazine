import express from "express";
import { magazieModel } from "../helpers/schemas/magazine";

// Routers
const router = express.Router();
export const MagazinesRouter = router;

router.get("/", async (req, res) => {
  const model = magazieModel.find();
  res.send(model);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const model = magazieModel.findById({ id });
  res.send(model);
});
