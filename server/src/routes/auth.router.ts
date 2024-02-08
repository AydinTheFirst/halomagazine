import { isLoggedIn } from "@/helpers/passport";
import { APIError } from "@/helpers/utils";
import express from "express";
import passport from "passport";

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
