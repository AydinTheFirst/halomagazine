import express from "express";
import { categoryModel } from "../helpers/schemas/category";
import { magazieModel } from "../helpers/schemas/magazine";
import { v4 } from "uuid";
import { isLoggedIn } from "../helpers/passport";
import { APIError } from "../helpers/utils";

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

router.post("/", isLoggedIn, async (req, res) => {
  try {
    const model = await categoryModel.create({
      id: v4(),
      title: req.body.title,
      description: req.body.description,
      magazines: [],
    });
    res.send(model);
  } catch (error) {
    return APIError(res, String(error));
  }
});

router.put("/:id", isLoggedIn, async (req, res) => {
  const id = req.params.id;

  try {
    const model = await categoryModel.findOne({ id });
    if (!model) return APIError(res, "Category not found!");

    Object.assign(model, req.body);
    await model?.save();
    return res.send(model);
  } catch (error) {
    return APIError(res, String(error));
  }
});

router.delete("/:id", isLoggedIn, async (req, res) => {
  const id = req.params.id;

  try {
    const model = await categoryModel.findOneAndDelete({ id });
    return res.send(model);
  } catch (error) {
    return APIError(res, String(error));
  }
});
