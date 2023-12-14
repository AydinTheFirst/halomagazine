import express from "express";
import { categoryModel } from "../helpers/schemas/category";
import { magazieModel } from "../helpers/schemas/magazine";

// Routers
const router = express.Router();
export const CategoriesRouter = router;

router.get("/", async (req, res) => {
  const models = await categoryModel.find().lean();

  for (const model of models) {
    model.magazines = await magazieModel
      .find({ catId: model.id })
      .lean()
      .exec();
  }

  res.send(models);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const model = await magazieModel.findById({ id }).lean().exec();
  res.send(model);
});
