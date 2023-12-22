import express from "express";
import passport from "passport";
import { isLoggedIn } from "../helpers/passport.js";
import { APIError } from "../helpers/utils.js";

const router = express.Router();
export const AuthRouter = router;

// Kullanıcı bilgilerini getir
router.get("/@me", isLoggedIn, (req, res) => {
  res.send(req.user);
});

router.post("/login", (req, res) => {
  passport.authenticate(
    "local",
    async (err: any, user: any, message: string) => {
      if (err) return APIError(res, err);
      if (!user) return APIError(res, message);

      return res.send({ token: "Bearer " + user.token });
    }
  )(req, res);
});
