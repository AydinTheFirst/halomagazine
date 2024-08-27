import { MagazieModel } from "@/database/MagazineSchema";
import { APIError, ZodError } from "@/lib/http";
import { z } from "zod";
import { Request, Response } from "express";
import { uuid } from "@/helpers/utils";
import { convertField, storage } from "@/lib/aws";

const NewMagazineSchema = z.object({
  categoryId: z.string().min(3),
  title: z.string().min(3),
  description: z.string().min(3),
});

class MagazinesController {
  async getAll(req: Request, res: Response) {
    const model = await MagazieModel.find();
    res.send(model);
  }

  async getOneById(req: Request, res: Response) {
    const id = req.params.id;
    const model = await MagazieModel.findOne({ id });
    res.send(model);
  }

  async create(req: Request, res: Response) {
    const parse = NewMagazineSchema.safeParse(req.body);
    if (!parse.success) return ZodError(res, parse.error);

    const { categoryId, title, description } = parse.data;

    const files = req.files as Express.Multer.File[];

    if (files.length < 2) {
      return APIError(res, "Please upload thumbnail and file");
    }

    const model = await MagazieModel.create({
      id: uuid(),
      categoryId,
      title,
      description,
      timestamp: Date.now(),
      thumbnail: "_",
      file: "_",
    });

    for (const file of files) {
      await storage.uploadFile(file);

      (model as any)[file.fieldname] =
        convertField(file.fieldname) + "/" + file.filename;
    }

    await model.save();

    res.send(model);
  }

  async updateOne(req: Request, res: Response) {
    const id = req.params.id;

    const model = await MagazieModel.findOne({ id });
    if (!model) return APIError(res, "Magazine not found!");

    Object.assign(model, req.body);

    const files = req.files as Express.Multer.File[];
    for (const file of files) {
      await storage.uploadFile(file);

      (model as any)[file.fieldname] =
        convertField(file.fieldname) + "/" + file.filename;
    }

    await model.save();

    res.send(model);
  }

  async deleteOne(req: Request, res: Response) {
    const id = req.params.id;
    const model = await MagazieModel.findOne({ id });
    if (!model) return APIError(res, "Magazine not found!");
    await model.deleteOne();
    return res.send(model);
  }
}

export default new MagazinesController();
