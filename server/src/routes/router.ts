import express from "express";

// Routers
import { AuthRouter } from "./auth.router";
import { MagazinesRouter } from "./magazines.router";
import { CategoriesRouter } from "./category.router";

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
