/*
 * Bootstrapping services with necessary logging and Joi support
 */

global.Promise = require('bluebird');
const config = require('config');
const fs = require('fs');
const joi = require('joi');
const path = require('path');
const logger = require('./common/logger');

// Joi Custom definitions
joi.pageNumber = () => joi.number().integer().min(1).default(1);
joi.pageSize = () => joi.number().integer().min(1).default(config.QUERY_MAX_LIMIT);
joi.id = () => joi.number().integer().min(1);

/**
 * Add logger and joi support to each service
 * @param dir
 */
const buildServices = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const curPath = path.join(dir, file);
    fs.stat(curPath, (err, stats) => {
      if (err) return;
      if (stats.isDirectory()) {
        buildServices(curPath);
      } else if (path.extname(file) === '.js') {
        logger.buildService(require(curPath)); // eslint-disable-line
      }
    });
  });
};

buildServices(path.join(__dirname, 'services'));
