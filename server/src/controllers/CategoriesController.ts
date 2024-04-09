import { CategoryModel } from "@/database/CategorySchema";
import { MagazieModel } from "@/database/MagazineSchema";
import { uuid } from "@/helpers/utils";
import { APIError, ZodError } from "@/lib/http";
import { Request, Response } from "express";
import { z } from "zod";

const NewCategorySchema = z.object({
  title: z.string(),
  description: z.string(),
});

class CategoriesController {
  async getAll(req: Request, res: Response) {
    const models = await CategoryModel.find().lean();

    for (const model of models) {
      model.magazines = await MagazieModel.find({
        categoryId: model.id,
      }).lean();
    }

    res.send(models);
  }

  async getOneById(req: Request, res: Response) {
    const id = req.params.id;
    const model = await CategoryModel.findOne({ id });
    res.send(model);
  }

  async create(req: Request, res: Response) {
    const parse = NewCategorySchema.safeParse(req.body);
    if (!parse.success) return ZodError(res, parse.error);

    const { title, description } = parse.data;

    const model = await CategoryModel.create({
      id: uuid(),
      title,
      description,
      magazines: [],
    });

    res.send(model);
  }

  async updateOne(req: Request, res: Response) {
    const model = await CategoryModel.findOne({ id: req.params.id });
    if (!model) return APIError(res, "Category not found!");

    Object.assign(model, req.body);

    await model.save();

    return res.send(model);
  }

  async deleteOne(req: Request, res: Response) {
    const id = req.params.id;

    const model = await CategoryModel.findOne({ id });
    if (!model) return APIError(res, "Category not found!");

    await model.deleteOne();

    return res.send(model);
  }
}

export default new CategoriesController();
