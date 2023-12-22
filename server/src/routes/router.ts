import express from "express";

// Routers
import { MagazinesRouter } from "./magazines.router.js";
import { CategoriesRouter } from "./category.router.js";
import { AuthRouter } from "./auth.router.js";

const app = express.Router();
export const router = app;

router.use("/auth", AuthRouter);
router.use("/magazines", MagazinesRouter);
router.use("/categories", CategoriesRouter);

router.get("/", (req, res) => {
  res.send({ message: "API is working!" });
});

router.all("*", (req, res) => {
  res.status(404).send({ message: "404 Not Found" });
});
