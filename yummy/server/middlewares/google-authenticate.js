import passport from "passport";
import { Strategy } from "passport-google-oauth2";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user";
import dotenv from "dotenv";

dotenv.config();

const { GOOGLE_ID, GOOGLE_SECRET } = process.env;

const googleParams = {
  clientID: GOOGLE_ID,
  clientSecret: GOOGLE_SECRET,
  callbackURL: "https://soyummy-tw3y.onrender.com/api/v1/auth/google/callback",
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName } = profile;

    const user = await User.findOne({ email });

    if (user) {
      return done(null, user);
    }

    const password = await bcrypt.hash(uuidv4(), 10);

    const newUser = await User.create({ email, password, name: displayName });

    return done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

export default passport;
