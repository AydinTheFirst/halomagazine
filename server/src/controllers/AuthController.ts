import { IUser } from "@/database/UserSchema";
import { generateToken } from "@/helpers/utils";
import { APIError } from "@/lib/http";
import { Request, Response } from "express";
import passport from "passport";

class AuthController {
  login(req: Request, res: Response) {
    passport.authenticate(
      "local",
      async (err: any, user: IUser, message: string) => {
        if (err) return APIError(res, err);
        if (!user) return APIError(res, message);

        user.token = generateToken();
        await user.save();

        return res.send({ token: user.token });
      }
    )(req, res);
  }
}

export default new AuthController();
