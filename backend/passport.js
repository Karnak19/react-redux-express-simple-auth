require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
const User = require("./sequelize/models/users");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:8000/login/auth/google/callback"
    },
    async (accesToken, refreshToken, profile, done) => {
      let userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accesToken
      };

      await User.findOrCreate({
        where: {
          email: userData.email
        },
        defaults: {
          isOAuth: true
        }
      });

      userData.jwt = jwt.sign({ email: userData.email }, secret, {
        expiresIn: "1h"
      });

      console.log(userData);

      done(null, userData);
    }
  )
);
