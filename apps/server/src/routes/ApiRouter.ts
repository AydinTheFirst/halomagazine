import express, { Router } from "express";
import { AuthRouter } from "./AuthRouter";
import { CategoriesRouter } from "./CategoriesRouter";
import { MagazinesRouter } from "./MagazinesRouter";
import { UsersRouter } from "./UsersRouter";
import { SquadsRouter } from "./SquadsRouter";
import { BearerAuth } from "@/lib/passport";

const router = Router();
export { router as ApiRouter };

router.use(BearerAuth);

router.use("/auth", AuthRouter);
router.use("/magazines", MagazinesRouter);
router.use("/categories", CategoriesRouter);
router.use("/users", UsersRouter);
router.use("/squads", SquadsRouter);

router.get("/", (_req, res) => {
  res.send({ message: "API is working!" });
});

router.use((_req, res) => {
  res.status(404).send({ message: "404 Not Found" });
});
