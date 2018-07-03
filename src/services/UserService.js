const { User } = require('../models');
const errors = require('common-errors');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10; // Used for hashing password

/**
 * Login proxy
 * @param email {string} - The user email
 * @param password {string} - The user password
 */
function* login(email, password) {
  const user = yield User.findOne({ where: { email }, raw: true });
  if (user === null) {
    throw errors.ValidationError(`User with Email = ${email} does not exist.`);
  }

  const status = yield bcrypt.compare(password, user.password);

  if (!status) {
    throw errors.HttpStatusError(401, 'Invalid Credentials');
  }

  // Sign the response with JWT Secret
  const myjwt = jwt.sign(
    { uID: user.id },
    config.JSON_WEB_TOKEN_SECRET, { expiresIn: '30d' },
  );

  return { token: myjwt };
}

login.schema = {
  email: joi.string().email().required(),
  password: joi.string().required(),
};

/**
 * Register proxy
 * @param email {string} - User's email
 * @param password {string} - User's password
 */
function* signup(email, password) {
  const emailExists = yield User.findOne({ where: { email } });

  if (emailExists) {
    throw new errors.ValidationError(`Email = ${email} already exists in database!`);
  }

  const encryptedPassword = yield bcrypt.hash(password, SALT_ROUNDS);

  const entity = {
    email,
    password: encryptedPassword,
  };

  yield User.create(entity);

  return { message: 'User signed up sucessfully! Please login with your credentials' };
}

signup.schema = {
  email: joi.string().email().required(),
  password: joi.string().required(),
};

module.exports = {
  login,
  signup,
};
