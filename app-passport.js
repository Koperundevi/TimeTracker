const glob = require('glob');
const path = require('path');
const passport = require('passport');

// load all passport strategies from /passports folder.
module.exports = (app) => {
  app.use(passport.initialize());
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  glob.sync(path.join(__dirname, './passports/*.js'))
    /* eslint-disable */
    .forEach(strategy => require(path.resolve(strategy))(passport));
};
