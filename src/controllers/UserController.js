/*
 * Define User controller
 */

const UserService = require('../services/UserService');

/**
 * Login user
 * @param req the request
 * @param res the response
 */
function* login(req, res) {
  const user = yield UserService.login(req.body.email, req.body.password);
  res.json(user);
}

/**
 * User Signup
 * @param req the request
 * @param res the response
 */

function* signup(req, res) {
  const user = yield UserService.signup(req.body.email, req.body.password);
  res.json(user);
}

module.exports = {
  login,
  signup,
};
