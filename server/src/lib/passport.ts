import "./AuthMethods";
import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { IUser } from "@/database/UserSchema";
import { APIError } from "./http";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "bearer",
    {
      session: false,
    },
    (err: any, user: IUser) => {
      if (err) return APIError(res, err);

      req.user = user;
      req.isAdmin = user.isAdmin;

      next();
    }
  )(req, res, next);
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAdmin) {
    return res.status(403).send("You cannot access this route!");
  }

  next();
};
