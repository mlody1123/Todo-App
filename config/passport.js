const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const keys = require("./keys");

const User = require("../models/auth");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretLoginKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/api/auth/google/callback",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
      },
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({
          email: profile.emails[0].value
        });
        if (existingUser) {
          if (existingUser.googleID === undefined) {
            existingUser.googleID = profile.id;
            existingUser.save();
            return done(null, existingUser);
          } else if (existingUser.googleID === profile.id) {
            return done(null, existingUser);
          }
        }
        const user = await new User({
          googleID: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName
        }).save();
        done(null, user);
      }
    )
  );
};
