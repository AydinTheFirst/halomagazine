import passport from "passport";
import { Strategy as Local } from "passport-local";
import { Strategy as Bearer } from "passport-http-bearer";

const user = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
  token: process.env.ADMIN_TOKEN,
};

passport.use(
  new Local(async (username: string, password: string, done: Function) => {
    const ok = user.username === username && user.password === password;

    if (!ok) {
      return done(null, false, "Invalid username or password!");
    }

    // Success
    return done(null, user);
  })
);

passport.use(
  new Bearer(async (token: string, done: Function) => {
    const ok = user.token === token;
    if (!ok) {
      return done(null, false, "Invalid token!");
    }
    return done(null, user, { scope: "all" });
  })
);

export const isLoggedIn = passport.authenticate("bearer", { session: false });
