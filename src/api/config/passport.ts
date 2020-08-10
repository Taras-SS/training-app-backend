import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/user-model";

passport.use(
  new Strategy({ usernameField: "email" }, async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) return done(null, false, { message: "Incorrect email" });
      if (!user.validatePassword(password))
        return done(null, false, { message: "Incorrect password" });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
