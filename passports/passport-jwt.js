/*
 * Bearer Strategy for JWT Authentication
 */

const config = require('config');
const jwt = require('jsonwebtoken');
const constants = require('../app-constants');
const BearerStrategy = require('passport-http-bearer');

// jwt strategy
module.exports = (passport) => {
// TODO :: Fix this to better catch errors
  passport.use(constants.Passports.jwt, new BearerStrategy((token, done) => {
    jwt.verify(token, config.JSON_WEB_TOKEN_SECRET, (error, payload) => {
      if (error) {
        done(error, false);
      }
      done(null, payload);
    });
  }));
};
