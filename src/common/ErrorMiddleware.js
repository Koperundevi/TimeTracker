/*
 * Middleware functions to handle error
 */

const logger = require('./logger');
const errors = require('common-errors');
const httpStatus = require('http-status');

const DEFAULT_MESSAGE = 'Internal server error';

/**
 * The error middleware function
 * @param  {Object}     err       the error that is thrown in the application
 * @param  {Object}     req       the express request instance
 * @param  {Object}     res       the express response instance
 * @param  {Function}   next      the next middleware in the chain
 */
const middleware = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  logger.logFullError(err, req.method, req.url);
  if (err.isJoi) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: err.details[0].message,
    });
  } else if (err.errors) {
    res.status(httpStatus.BAD_REQUEST).json({ message: err.errors });
  } else {
    const httpError = new errors.HttpStatusError(err);
    if (err.statusCode >= httpStatus.INTERNAL_SERVER_ERROR) {
      httpError.message = DEFAULT_MESSAGE;
    }
    res.status(httpError.statusCode).json({ message: httpError.message || DEFAULT_MESSAGE });
  }
};

module.exports = function ret() {
  return middleware;
};
