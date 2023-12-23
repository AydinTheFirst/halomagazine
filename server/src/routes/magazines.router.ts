import express from "express";
import { magazieModel } from "../helpers/schemas/magazine";
import { isLoggedIn } from "../helpers/passport";
import { APIError } from "../helpers/utils";
import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import { v4 } from "uuid";

// Routers
const router = express.Router();
export const MagazinesRouter = router;

const bucketName = "haloidergisi";

router.get("/", async (req, res) => {
  const model = await magazieModel.find();
  res.send(model);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const model = await magazieModel.findById({ id });
  res.send(model);
});

router.post("/", isLoggedIn, async (req, res) => {
  const data = req.body;

  const files = req.files as Express.Multer.File[];

  const model = await magazieModel.create({
    id: v4(),
    catId: data.catId,
    title: data.title,
    description: data.description,
    timestamp: data.timestamp,
    thumbnail: "_",
    file: "_",
  });

  for (const file of files) {
    await _uploadFile(file);

    model[file.fieldname] = convertField(file.fieldname) + "/" + file.filename;
  }

  await model.save();

  res.send(model);
});

router.put("/:id", isLoggedIn, async (req, res) => {
  const id = req.params.id;

  const model = await magazieModel.findOne({ id });
  if (!model) return APIError(res, "Magazine not found!");

  Object.assign(model, req.body);

  const files = req.files as Express.Multer.File[];

  if (files.length > 0) {
    for (const file of files) {
      await _uploadFile(file);
      _deleteFile(model[file.fieldname]);

      model[file.fieldname] =
        convertField(file.fieldname) + "/" + file.filename;
    }
  }

  try {
    await model.save();
    return res.send(model);
  } catch (error) {
    return APIError(res, String(error));
  }
});

router.delete("/:id", isLoggedIn, async (req, res) => {
  const id = req.params.id;

  try {
    const mag = await magazieModel.findOne({ id });
    if (!mag) return APIError(res, "Magazine not found!");

    await _deleteFile(mag.thumbnail);
    await _deleteFile(mag.file);

    return res.send({ message: "Magazine deleted!" });
  } catch (error) {
    return APIError(res, String(error));
  }
});

const _createStorageClient = () => {
  return new S3({
    region: "auto",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    endpoint: process.env.AWS_ENDPOINT,
  });
};

const _uploadFile = async (file: Express.Multer.File) => {
  const client = _createStorageClient();

  const result = await client.putObject({
    Bucket: bucketName,
    Key: convertField(file.fieldname) + "/" + file.filename,
    Body: fs.readFileSync(file.path),
    ContentType: file.mimetype,
  });

  return result;
};

const _deleteFile = async (Key: string) => {
  const client = _createStorageClient();

  const result = await client.deleteObject({
    Bucket: bucketName,
    Key,
  });

  return result;
};

const convertField = (field: string) => {
  return field === "thumbnail" ? "thumbnails" : "dergiler";
};
