import express from "express";
import { AuthRouter } from "./AuthRouter";
import { CategoriesRouter } from "./CategoriesRouter";
import { MagazinesRouter } from "./MagazinesRouter";
import { UsersRouter } from "./UsersRouter";
import { SquadsRouter } from "./SquadsRouter";

const app = express.Router();
export const router = app;

router.use("/auth", AuthRouter);
router.use("/magazines", MagazinesRouter);
router.use("/categories", CategoriesRouter);
router.use("/users", UsersRouter);
router.use("/squads", SquadsRouter);

router.get("/", (req, res) => {
  res.send({ message: "API is working!" });
});

router.all("*", (req, res) => {
  res.status(404).send({ message: "404 Not Found" });
});
