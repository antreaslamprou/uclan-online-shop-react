import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import db from "./connection.js";

passport.use(new LocalStrategy(
  { usernameField: "email" },
  (email, password, done) => {
    db.query("SELECT * FROM tbl_users WHERE user_email = ?", [email], async (err, results) => {
      if (err) return done(err);
      if (!results.length) return done(null, false, { message: "Incorrect email" });

      const user = results[0];
      const match = await bcrypt.compare(password, user.user_pass);
      if (!match) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((id, done) => {
  db.query("SELECT * FROM tbl_users WHERE user_id = ?", [id], (err, results) => {
    if (err) return done(err);
    return done(null, results[0]);
  });
});

export default passport;
