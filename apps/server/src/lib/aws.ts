import { S3 } from "@aws-sdk/client-s3";
import fs from "node:fs";

const bucketName = "haloidergisi";

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

export const convertField = (field: string) => {
  return field === "thumbnail" ? "thumbnails" : "dergiler";
};

export const storage = {
  createStorageClient: _createStorageClient,
  uploadFile: _uploadFile,
  deleteFile: _deleteFile,
  convertField,
};
