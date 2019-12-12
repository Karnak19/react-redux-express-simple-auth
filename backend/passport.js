require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
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

      done(null, userData);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "http://localhost:8000/login/auth/github/callback"
    },
    async (accesToken, refreshToken, profile, done) => {
      let userData = {
        email: profile.emails[0].value,
        name: profile.username,
        token: accesToken
      };

      await User.findOrCreate({
        where: {
          email: userData.email
        },
        defaults: {
          isOAuth: false
        }
      });

      userData.jwt = jwt.sign({ email: userData.email }, secret, {
        expiresIn: "1h"
      });

      done(null, userData);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "http://localhost:8000/login/auth/facebook/callback",
      profileFields: ["id", "emails", "name"]
    },
    async (accesToken, refreshToken, profile, done) => {
      let userData = {
        email: profile.emails[0].value,
        name: profile.username,
        token: accesToken
      };

      await User.findOrCreate({
        where: {
          email: userData.email
        },
        defaults: {
          isOAuth: false
        }
      });

      userData.jwt = jwt.sign({ email: userData.email }, secret, {
        expiresIn: "1h"
      });

      done(null, userData);
    }
  )
);
