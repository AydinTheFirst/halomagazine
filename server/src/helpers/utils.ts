import crypto from "crypto-js";
import { Response } from "express";

export const encrypt = (data: string) => {
  return crypto.AES.encrypt(data, process.env.secret_key as string);
};

export const decrypt = (data: string) => {
  const bytes = crypto.AES.decrypt(data, process.env.secret_key as string);

  return bytes.toString(crypto.enc.Utf8);
};

export const APIError = (res: Response, message: string) => {
  return res.status(400).send({ message });
};

export const formatTime = (timeInMilliseconds: number) => {
  const seconds = Math.floor(timeInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);

  return `${minutes} minutes ${seconds % 60} seconds`;
};
