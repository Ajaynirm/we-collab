import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import passport from "passport";
import { openDb } from '../config/db.js';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";


dotenv.config({debug: false});

// Local login with email/password
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const db = await openDb();
      const user = await db.get(`SELECT * FROM users WHERE email=?`, [email]);
      if (!user) return done(null,false, { message: "Email not exists" });
     
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Invalid password" });
      return done(null, user,{message: "Login success"});
    } catch (err) {
      return done(err);
    }
  })
);


// JWT verification
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const db = await openDb();
        const user = await db.get(`SELECT * FROM users WHERE id = ?`, [jwtPayload.id]);
        return done(null, user || false);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "/auth/google/callback",
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         // Find or create user
//         // const user = await User.findOneAndUpdate(
//         //   { googleId: profile.id },
//         //   { name: profile.displayName },
//         //   { upsert: true, new: true }
//         // );
//         return done(null, user);
//       }
//     )
//   );

export default passport;
