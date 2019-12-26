const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/auth");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");

// @route GET api/auth/test
// @desc
// @access

router.get("/test", (req, res) => res.json({ msg: "Auth Routes Works" }));

// @route GET api/auth/google
// @desc Login google
// @access Private

router.get(
  "/google",
  passport.authenticate(
    "google",
    {
      scope: ["profile", "email"]
    },
    { session: false }
  )
);

// @route GET api/auth/google/callback
// @desc Callback google
// @access Private

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const payload = { id: req.user.id, name: req.user.name };
    jwt.sign(
      payload,
      keys.secretLoginKey,
      { expiresIn: 3600 },
      (err, token) => {
        res.json({
          succes: true,
          token: "Bearer " + token
        });
      }
    );
  }
);

// @route POST api/auth/current
// @desc Show Current User
// @access Public

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route POST api/auth/test
// @desc Register User Local
// @access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => res.json(err));
      });
    });
  });
});

// @route POST api/auth/test
// @desc Login User Local
// @access Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    } else {
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name };

          jwt.sign(
            payload,
            keys.secretLoginKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                succes: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Incorrect Password";
          return res.status(400).json(errors);
        }
      });
    }
  });
});

module.exports = router;
