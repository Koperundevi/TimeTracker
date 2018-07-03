/*
 * Helper functions
 */

const _ = require('lodash');
const co = require('co');

/**
 * Wrap generator function to standard express function
 * @param {Function} fn the generator function
 * @returns {Function} the wrapped function
 */
const wrapExpress = fn => function wrapGenerator(req, res, next) {
  co(fn(req, res, next)).catch(next);
};

/**
 * Wrap all generators from object
 * @param obj the object (controller exports)
 * @returns {Object|Array} the wrapped object
 */
const autoWrapExpress = (obj) => {
  if (_.isArray(obj)) {
    return obj.map(autoWrapExpress);
  }
  if (_.isFunction(obj)) {
    if (obj.constructor.name === 'GeneratorFunction') {
      return wrapExpress(obj);
    }
    return obj;
  }
  _.each(obj, (value, key) => {
    obj[key] = autoWrapExpress(value); // eslint-disable-line
  });
  return obj;
};

module.exports = {
  wrapExpress,
  autoWrapExpress,
};
